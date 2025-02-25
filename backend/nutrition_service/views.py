from django.shortcuts import render

# Create your views here.
import requests
from django.http import HttpResponse
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
            response.raise_for_status()  # Raise an exception for 4xx/5xx errors
            
            # Pass the HTML from Gin as context to the Django template
            context = {"nutrition_html": response.text}
            return render(request, "nutrition.html", context)

        except requests.exceptions.RequestException as e:
            return HttpResponse(f"<h1>Error:</h1><p>{str(e)}</p>", status=500)
