"""
WSGI config for Dekho Bharat Django backend.
"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dekhobharat.settings')

application = get_wsgi_application()
