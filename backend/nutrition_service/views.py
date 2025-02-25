from django.shortcuts import render

# Create your views here.
import requests
from django.http import JsonResponse
from django.views import View
from rest_framework.permissions import AllowAny

class NutritionView(View):
    permission_classes = [AllowAny]  # Allow any user to access this API
    
    def get(self, request, food_name):
        # Assuming the Gin service is running at this URL
        # url = f'http://localhost:8080/nutrition/{food_name}' # local
        url = f'http://nutrition-service:8080/nutrition/{food_name}' # docker

        try:
            response = requests.get(url)
            response.raise_for_status()  # Will raise an exception for 4xx/5xx errors
            data = response.json()
            
            # Return the nutrition data to the frontend
            return JsonResponse(data)
        
        except requests.exceptions.RequestException as e:
            return JsonResponse({'error': str(e)}, status=500)
