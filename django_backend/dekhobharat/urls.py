"""
URL configuration for Dekho Bharat Django backend.
"""

from django.urls import path, include

urlpatterns = [
    path('api/', include('api.urls')),
]
