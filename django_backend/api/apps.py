"""
Django app config for the Dekho Bharat API app.
"""

from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api"
    verbose_name = "Dekho Bharat API"
