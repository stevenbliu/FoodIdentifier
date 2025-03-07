from django.urls import re_path
from food_identifier.consumers import FoodProcessingConsumer

websocket_urlpatterns = [
    re_path(r"ws/food_processing/(?P<task_id>\w+)/$", FoodProcessingConsumer.as_asgi()),
]
