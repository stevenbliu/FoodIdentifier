from django.db import models
from photo_handler.models import Photo

class FoodLabel(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class FoodPrediction(models.Model):
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE)
    label = models.ForeignKey(FoodLabel, on_delete=models.SET_NULL, null=True)
    confidence = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.label.name} ({self.confidence * 100:.2f}%)"
