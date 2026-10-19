"""
MongoDB connection singleton for Dekho Bharat Django backend.
Uses pymongo to connect to the same MongoDB instance as Node.js server.
"""

from pymongo import MongoClient
from django.conf import settings
import threading

_client = None
_db = None
_lock = threading.Lock()
_booking_schema_ready = False
_booking_schema_lock = threading.Lock()

_BOOKING_VALIDATOR = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "userName", "userPhone", "city", "activity", "price",
            "priceAmount", "voucherId", "bookingDate", "status",
        ],
        "properties": {
            "userName": {"bsonType": "string", "minLength": 1, "maxLength": 100},
            "userPhone": {"bsonType": "string", "minLength": 7, "maxLength": 20},
            "userEmail": {"bsonType": "string", "maxLength": 254},
            "city": {"bsonType": "string", "minLength": 1, "maxLength": 120},
            "activity": {"bsonType": "string", "minLength": 1, "maxLength": 160},
            "price": {"bsonType": "string", "maxLength": 40},
            "priceAmount": {"bsonType": ["double", "int", "long", "decimal"], "minimum": 0},
            "guideName": {"bsonType": "string", "maxLength": 120},
            "voucherId": {"bsonType": "string", "minLength": 1, "maxLength": 40},
            "bookingDate": {"bsonType": "date"},
            "status": {"enum": ["confirmed", "cancelled"]},
        },
    }
}


def get_db():
    """
    Returns a pymongo Database instance (singleton).
    Thread-safe initialization using a lock.
    """
    global _client, _db
    if _db is None:
        with _lock:
            if _db is None:
                _client = MongoClient(settings.MONGODB_URI)
                _db = _client[settings.MONGODB_DB]
    return _db


def get_collection(name: str):
    """
    Convenience helper to get a named collection from the database.
    """
    global _booking_schema_ready
    db = get_db()
    if name == "bookings" and not _booking_schema_ready:
        with _booking_schema_lock:
            if not _booking_schema_ready:
                if name not in db.list_collection_names():
                    db.create_collection(name, validator=_BOOKING_VALIDATOR)
                else:
                    db.command({
                        "collMod": name,
                        "validator": _BOOKING_VALIDATOR,
                        "validationLevel": "moderate",
                        "validationAction": "error",
                    })
                    indexes = db[name].index_information()
                    voucher_index_exists = any(
                        index.get("key") == [("voucherId", 1)] and index.get("unique")
                        for index in indexes.values()
                    )
                    if not voucher_index_exists:
                        db[name].create_index("voucherId", unique=True)
                    if "booking_user_date" not in indexes:
                        db[name].create_index([("userEmail", 1), ("bookingDate", -1)], name="booking_user_date")
                _booking_schema_ready = True
    return db[name]
