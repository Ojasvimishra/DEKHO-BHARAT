"""
Dekho Bharat – Django REST API Views
======================================
Endpoints:
  POST /api/signup          – Register a new user (MongoDB)
  POST /api/login           – Authenticate user, return JWT tokens
  POST /api/token/refresh   – Refresh JWT access token
  GET  /api/health          – Health check
  GET  /api/tree            – Full N-ary tree
  GET  /api/node/<id>       – Find node by ID (DFS)
  GET  /api/path/<id>       – Breadcrumb path to node (DFS)
  GET  /api/search?q=...    – Trie prefix search for cities
  GET  /api/destinations    – All leaf destinations (cities)
  POST /api/bookings        – Create a booking (MongoDB)
  GET  /api/bookings        – List all bookings (optionally filter by user)
  DELETE /api/bookings/<voucherId> – Cancel a booking
  GET  /api/stats           – Aggregate stats (dashboard data)
"""

import hashlib
import random
import string
from datetime import datetime
from pymongo.errors import DuplicateKeyError, PyMongoError

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .db import get_collection
from .serializers import BookingSerializer
from .dsa_engine import (
    TREE_DATA,
    GLOBAL_TRIE,
    find_node_by_id,
    get_path_to_node,
    get_all_destinations,
    is_leaf,
)


# ---------------------------------------------------------------------------
# HELPERS
# ---------------------------------------------------------------------------

def _hash_password(password: str) -> str:
    """SHA-256 hash of the password (use bcrypt in production)."""
    return hashlib.sha256(password.encode()).hexdigest()


def _generate_voucher() -> str:
    return "DB-EXPLORE-" + "".join(random.choices(string.digits, k=4))


def _strip_mongo_id(doc: dict) -> dict:
    """Remove MongoDB ObjectId from a document dict."""
    if doc and "_id" in doc:
        doc = {k: v for k, v in doc.items() if k != "_id"}
    return doc


# ---------------------------------------------------------------------------
# HEALTH CHECK
# ---------------------------------------------------------------------------

@api_view(["GET"])
@permission_classes([AllowAny])
def health_check(request):
    return Response({
        "status": "ok",
        "message": "Dekho Bharat Python/Django Backend Running 🐍",
        "engine": "Django REST Framework",
        "dsa": "N-ary Tree + Trie"
    })


# ---------------------------------------------------------------------------
# AUTH – SIGNUP
# ---------------------------------------------------------------------------

@api_view(["POST"])
@permission_classes([AllowAny])
def signup(request):
    """
    Register a new user.
    Body: { name, email, password }
    """
    name = request.data.get("name", "").strip()
    email = request.data.get("email", "").strip().lower()
    password = request.data.get("password", "")

    if not email or not password:
        return Response(
            {"success": False, "message": "Email and password are required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    users = get_collection("users")
    if users.find_one({"email": email}):
        return Response(
            {"success": False, "message": "User already exists."},
            status=status.HTTP_400_BAD_REQUEST
        )

    new_user = {
        "name": name,
        "email": email,
        "password": _hash_password(password),
        "createdAt": datetime.utcnow().isoformat(),
        "source": "django"
    }
    users.insert_one(new_user)

    return Response(
        {"success": True, "user": {"name": name, "email": email}},
        status=status.HTTP_201_CREATED
    )


# ---------------------------------------------------------------------------
# AUTH – LOGIN  (returns JWT)
# ---------------------------------------------------------------------------

@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    """
    Authenticate user and return JWT access + refresh tokens.
    Body: { email, password }
    """
    email = request.data.get("email", "").strip().lower()
    password = request.data.get("password", "")

    if not email or not password:
        return Response(
            {"success": False, "message": "Email and password are required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    users = get_collection("users")

    # Support both hashed (Django) and plain (Node.js legacy) passwords
    user = users.find_one({"email": email, "password": _hash_password(password)})
    if not user:
        # Try plain text for Node.js legacy users
        user = users.find_one({"email": email, "password": password})

    if not user:
        return Response(
            {"success": False, "message": "Invalid credentials."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    # Generate JWT tokens (using a fake user id based on email)
    class FakeUser:
        """Minimal user-like object for simplejwt token generation."""
        def __init__(self, email):
            self.pk = email  # simplejwt uses .pk to build the token
            self.is_active = True

    fake_user = FakeUser(email)
    refresh = RefreshToken.for_user(fake_user)

    return Response({
        "success": True,
        "user": {"name": user.get("name", ""), "email": email},
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    })


# ---------------------------------------------------------------------------
# DSA – TREE ENDPOINTS
# ---------------------------------------------------------------------------

@api_view(["GET"])
@permission_classes([AllowAny])
def get_tree(request):
    """Return the full N-ary decision tree."""
    return Response(TREE_DATA)


@api_view(["GET"])
@permission_classes([AllowAny])
def get_node(request, node_id: str):
    """
    DFS: Find and return a single node by its ID.
    Complexity: O(N) where N = total nodes in tree.
    """
    node = find_node_by_id(TREE_DATA, node_id)
    if not node:
        return Response(
            {"error": f'Node with id "{node_id}" not found.'},
            status=status.HTTP_404_NOT_FOUND
        )
    return Response(node)


@api_view(["GET"])
@permission_classes([AllowAny])
def get_path(request, node_id: str):
    """
    DFS: Return the breadcrumb path from root to a target node.
    Each element contains { id, label/city }.
    """
    path = get_path_to_node(TREE_DATA, node_id)
    if not path:
        return Response(
            {"error": f'Path to node "{node_id}" not found.'},
            status=status.HTTP_404_NOT_FOUND
        )
    # Return lightweight breadcrumb nodes (avoid sending full subtree)
    crumbs = [
        {"id": n.get("id"), "label": n.get("label") or n.get("city"), "city": n.get("city")}
        for n in path
    ]
    return Response(crumbs)


@api_view(["GET"])
@permission_classes([AllowAny])
def search_cities(request):
    """
    Trie prefix search for city names.
    Query param: q (prefix string)
    Complexity: O(L + K) where L = prefix length, K = number of results.
    """
    q = request.query_params.get("q", "").strip()
    if not q:
        return Response(
            {"error": 'Query parameter "q" is required.'},
            status=status.HTTP_400_BAD_REQUEST
        )
    results = GLOBAL_TRIE.search(q)
    # Return only minimal card data to keep response lean
    return Response([
        {
            "id": r.get("id"),
            "city": r.get("city"),
            "state": r.get("state"),
            "image": r.get("image"),
            "tags": r.get("tags", []),
            "rating": r.get("details", {}).get("rating"),
        }
        for r in results
    ])


@api_view(["GET"])
@permission_classes([AllowAny])
def get_all_cities(request):
    """Return all leaf destination nodes (full data)."""
    destinations = get_all_destinations(TREE_DATA)
    return Response(destinations)


# ---------------------------------------------------------------------------
# BOOKINGS CRUD
# ---------------------------------------------------------------------------

@api_view(["POST"])
@permission_classes([AllowAny])
def create_booking(request):
    """
    Save a new booking to MongoDB.
    Body: { userName, userPhone, city, activity, price, guideName, voucherId? }
    """
    serializer = BookingSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    data = serializer.validated_data
    booking = {
        **data,
        "userEmail": data.get("userEmail", "").lower(),
        "priceAmount": BookingSerializer.price_amount(data["price"]),
        "guideName": data.get("guideName") or "Standard Guide",
        "voucherId": request.data.get("voucherId") or _generate_voucher(),
        "bookingDate": datetime.utcnow(),
        "source": "django",
        "status": "confirmed",
    }

    try:
        get_collection("bookings").insert_one(booking)
    except DuplicateKeyError:
        return Response(
            {"success": False, "message": "Voucher ID already exists."},
            status=status.HTTP_409_CONFLICT
        )
    except PyMongoError:
        return Response({"success": False, "message": "MongoDB is unavailable."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

    return Response(
        {"success": True, "message": "Booking saved via Django + MongoDB", "booking": _strip_mongo_id(booking)},
        status=status.HTTP_201_CREATED
    )


@api_view(["GET"])
@permission_classes([AllowAny])
def list_bookings(request):
    """
    List all bookings, with optional user filter.
    Query param: email (filter by user email)
    """
    query = {}
    email = request.query_params.get("email")
    if email:
        query["userEmail"] = email.lower()

    try:
        bookings_col = get_collection("bookings")
        docs = list(bookings_col.find(query).sort("bookingDate", -1).limit(100))
    except PyMongoError:
        return Response({"success": False, "message": "MongoDB is unavailable."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
    return Response([_strip_mongo_id(d) for d in docs])


def _update_booking(request, voucher_id: str):
    """Update validated, editable booking fields by voucher ID."""
    serializer = BookingSerializer(data=request.data, partial=True)
    if not serializer.is_valid():
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    if not serializer.validated_data:
        return Response({"success": False, "message": "Provide at least one field to update."}, status=status.HTTP_400_BAD_REQUEST)

    updates = serializer.validated_data
    if "userEmail" in updates:
        updates["userEmail"] = updates["userEmail"].lower()
    if "price" in updates:
        updates["priceAmount"] = BookingSerializer.price_amount(updates["price"])
    updates["updatedAt"] = datetime.utcnow()

    try:
        booking = get_collection("bookings").find_one_and_update(
            {"voucherId": voucher_id}, {"$set": updates}, return_document=True
        )
    except PyMongoError:
        return Response({"success": False, "message": "MongoDB is unavailable."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
    if not booking:
        return Response({"success": False, "message": "Voucher not found."}, status=status.HTTP_404_NOT_FOUND)
    return Response({"success": True, "booking": _strip_mongo_id(booking)})


@api_view(["PATCH", "DELETE"])
@permission_classes([AllowAny])
def delete_booking(request, voucher_id: str):
    """
    Update or delete a booking by its voucher ID.
    """
    if request.method == "PATCH":
        return _update_booking(request, voucher_id)

    try:
        bookings = get_collection("bookings")
        result = bookings.find_one_and_delete({"voucherId": voucher_id})
    except PyMongoError:
        return Response({"success": False, "message": "MongoDB is unavailable."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
    if result:
        return Response({"success": True, "message": f"Booking {voucher_id} cancelled."})
    return Response(
        {"success": False, "message": "Voucher not found."},
        status=status.HTTP_404_NOT_FOUND
    )


# ---------------------------------------------------------------------------
# STATS / ANALYTICS DASHBOARD
# ---------------------------------------------------------------------------

@api_view(["GET"])
@permission_classes([AllowAny])
def get_stats(request):
    """
    Aggregate stats for dashboard display.
    Returns booking counts, top destinations, top activities.
    """
    try:
        bookings_col = get_collection("bookings")
        users_col = get_collection("users")
        total_bookings = bookings_col.count_documents({})
        total_users = users_col.count_documents({})
        top_cities = list(bookings_col.aggregate([
            {"$match": {"city": {"$type": "string", "$ne": ""}}},
            {"$group": {"_id": "$city", "count": {"$sum": 1}, "revenue": {"$sum": {"$ifNull": ["$priceAmount", 0]}}}},
            {"$sort": {"count": -1, "_id": 1}},
            {"$limit": 5},
        ]))
        top_activities = list(bookings_col.aggregate([
            {"$match": {"activity": {"$type": "string", "$ne": ""}}},
            {"$group": {"_id": "$activity", "count": {"$sum": 1}, "revenue": {"$sum": {"$ifNull": ["$priceAmount", 0]}}}},
            {"$sort": {"count": -1, "_id": 1}},
            {"$limit": 5},
        ]))
        revenue = list(bookings_col.aggregate([
            {"$group": {"_id": None, "total": {"$sum": {"$ifNull": ["$priceAmount", 0]}}}},
        ]))
        monthly_bookings = list(bookings_col.aggregate([
            {"$set": {"_aggregationDate": {"$convert": {"input": "$bookingDate", "to": "date", "onError": None, "onNull": None}}}},
            {"$match": {"_aggregationDate": {"$ne": None}}},
            {"$group": {"_id": {"$dateToString": {"format": "%Y-%m", "date": "$_aggregationDate"}}, "count": {"$sum": 1}}},
            {"$sort": {"_id": 1}},
            {"$limit": 12},
        ]))
    except PyMongoError:
        return Response({"success": False, "message": "MongoDB is unavailable."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

    # DSA tree stats
    all_destinations = get_all_destinations(TREE_DATA)
    tree_stats = {
        "totalCategories": len(TREE_DATA.get("children", [])),
        "totalLeafDestinations": len(all_destinations),
        "trieWords": len(all_destinations),
    }

    return Response({
        "totalBookings": total_bookings,
        "totalUsers": total_users,
        "totalRevenue": revenue[0]["total"] if revenue else 0,
        "topCities": [{"city": c["_id"], "count": c["count"], "revenue": c["revenue"]} for c in top_cities],
        "topActivities": [{"activity": a["_id"], "count": a["count"], "revenue": a["revenue"]} for a in top_activities],
        "monthlyBookings": [{"month": item["_id"], "count": item["count"]} for item in monthly_bookings],
        "treeStats": tree_stats,
        "backendInfo": {
            "framework": "Django REST Framework",
            "language": "Python 3.14",
            "database": "MongoDB (pymongo)",
            "auth": "JWT (djangorestframework-simplejwt)",
        },
    })
