from django.urls import path
from .views import NutritionView

urlpatterns = [
    path('nutrition/<str:food_name>/', NutritionView.as_view(), name='nutrition'),
]
