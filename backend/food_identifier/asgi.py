"""
ASGI config for food_identifier project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from food_identifier.routing import websocket_urlpatterns

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "food_identifier.settings")

application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # Handles HTTP requests
    "websocket": URLRouter(websocket_urlpatterns),  # Handles WebSockets
})

