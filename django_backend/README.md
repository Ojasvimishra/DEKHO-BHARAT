# Dekho Bharat – Python/Django Backend

A **Django REST Framework** backend that mirrors and extends the Node.js backend with proper password hashing, JWT authentication, and a Python implementation of the DSA algorithms.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | Python 3.14 |
| Framework | Django 6.1 + Django REST Framework 3.18 |
| Auth | JWT via `djangorestframework-simplejwt` |
| Database | MongoDB 4.x via `pymongo` (same DB as Node.js) |
| DSA | N-ary Tree + Trie (pure Python, in `api/dsa_engine.py`) |

## Project Structure

```
django_backend/
├── manage.py                  ← Django CLI entry point
├── requirements.txt           ← pip dependencies
├── db.sqlite3                 ← SQLite (Django internals only)
├── dekhobharat/
│   ├── __init__.py
│   ├── settings.py            ← Django settings (MongoDB URI, JWT, CORS)
│   ├── urls.py                ← Root URL dispatcher
│   └── wsgi.py
└── api/
    ├── __init__.py
    ├── apps.py
    ├── db.py                  ← Thread-safe MongoDB connection singleton
    ├── dsa_engine.py          ← Python N-ary Tree + Trie implementation
    ├── views.py               ← All API view functions
    └── urls.py                ← URL patterns
```

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| `GET` | `/api/health/` | Backend health check |
| `POST` | `/api/signup/` | Register new user (hashed password, MongoDB) |
| `POST` | `/api/login/` | Authenticate → returns JWT tokens |
| `POST` | `/api/token/refresh/` | Refresh JWT access token |
| `GET` | `/api/tree/` | Full N-ary decision tree |
| `GET` | `/api/node/<id>/` | Find node by ID (DFS) |
| `GET` | `/api/path/<id>/` | Breadcrumb path to node (DFS) |
| `GET` | `/api/search/?q=<prefix>` | Trie prefix search for cities |
| `GET` | `/api/destinations/` | All leaf destination nodes |
| `POST` | `/api/bookings/` | Validate and create booking (MongoDB) |
| `GET` | `/api/bookings/list/?email=<email>` | List bookings, optionally filtered by account |
| `PATCH` | `/api/bookings/<voucherId>/` | Update validated booking fields |
| `DELETE` | `/api/bookings/<voucherId>/` | Delete/cancel booking |
| `GET` | `/api/stats/` | Aggregated counts, booking value, top destinations/activities, and monthly counts |

## MongoDB Document and Validation

Bookings are stored in the shared `dekhoindia.bookings` collection. The document keeps the original display price and a numeric `priceAmount` for aggregation:

```json
{
    "userName": "Asha Sharma",
    "userPhone": "+91 9876543210",
    "userEmail": "asha@example.com",
    "city": "Leh",
    "activity": "Monastery Tour",
    "price": "₹1,800",
    "priceAmount": 1800,
    "guideName": "Local Guide",
    "voucherId": "DB-EXPLORE-1234",
    "bookingDate": "BSON Date",
    "status": "confirmed"
}
```

The Django API validates required names and destination/activity lengths, email format, phone digit count, and a non-negative price. MongoDB independently enforces the required document shape and field types through a collection JSON Schema validator. A unique voucher index prevents duplicate booking IDs; user/date indexes support filtered listing. The Express writer uses the same normalized document shape to remain compatible with the shared collection.

The React booking records section demonstrates listing, editing, and deleting persisted records. `/api/stats/` runs MongoDB aggregation pipelines to group booking count and total value by destination and activity, plus monthly booking counts.

## Running the Server

```bash
# From project root:
npm run django

# Or directly:
cd django_backend
python manage.py runserver 8000 --settings=dekhobharat.settings
```

## Run All Three Services Together

```bash
# React (5173) + Node.js (4000) + Django (8000) simultaneously:
npm run dev:all
```

## DSA in Python

The `api/dsa_engine.py` module contains:

- **N-ary Tree** – Same structure as `src/dekhoindia.js`, with full travel data
- **`find_node_by_id(node, id)`** – DFS node lookup: O(N)
- **`get_path_to_node(node, id)`** – DFS breadcrumb path: O(N)
- **`get_all_destinations(node)`** – Collect all leaf nodes: O(N)
- **`Trie` class** – Prefix tree for city name autocomplete: O(L) search
- **`build_trie_from_tree()`** – Builds Trie from all cities at startup

## Authentication Flow

1. **Signup** → Password is SHA-256 hashed → stored in MongoDB with `source: "django"`
2. **Login** → Django checks hashed password first, then tries Node.js legacy plaintext
3. **JWT** → Access token (24h) + Refresh token (7 days) returned to frontend
4. **Frontend** → Stores tokens in `localStorage`, sends `Authorization: Bearer <token>` header

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/` | MongoDB connection string |
| `MONGODB_DB` | `dekhoindia` | Database name |
