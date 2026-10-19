"""
URL patterns for the Dekho Bharat API app.
"""

from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from . import views

urlpatterns = [
    # ── Health ──────────────────────────────────────────────────
    path("health/", views.health_check, name="health"),

    # ── Authentication ──────────────────────────────────────────
    path("signup/", views.signup, name="signup"),
    path("login/", views.login, name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # ── DSA Tree Traversal ──────────────────────────────────────
    path("tree/", views.get_tree, name="tree"),
    path("node/<str:node_id>/", views.get_node, name="node"),
    path("path/<str:node_id>/", views.get_path, name="path"),
    path("search/", views.search_cities, name="search"),
    path("destinations/", views.get_all_cities, name="destinations"),

    # ── Bookings CRUD ───────────────────────────────────────────
    path("bookings/", views.create_booking, name="create_booking"),
    path("bookings/list/", views.list_bookings, name="list_bookings"),
    path("bookings/<str:voucher_id>/", views.delete_booking, name="booking_detail"),

    # ── Analytics ───────────────────────────────────────────────
    path("stats/", views.get_stats, name="stats"),
]
