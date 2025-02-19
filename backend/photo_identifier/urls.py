from django.urls import path
from .views import PredictFoodView

urlpatterns = [
    path('predict/<int:photo_id>/', PredictFoodView.as_view(), name='predict_food'),
    path('predict/', PredictFoodView.as_view(), name='predict_food'),

]
