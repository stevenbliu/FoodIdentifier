from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from . import views
from django.views.generic.base import RedirectView

from django.shortcuts import redirect

def redirect_to_api_test(request):
    return redirect('/api/test/')


dev_prefix = 'api/'
urlpatterns = [
    path('', RedirectView.as_view(url='https://www.g321oogle.com', permanent=False), name='home'), 

    path('admin/', admin.site.urls),

    path(dev_prefix + 'photos/', include('photo_handler.urls'), name='photo_api'),  # Include the photo_handler app's urls
    path(dev_prefix + 'food/', include('photo_identifier.urls'), name='food_api'),  # Include the food_identifier app's urls
    path(dev_prefix + 'auth/', include('authentication.urls'), name='auth_api'),
    path(dev_prefix + 'test/', views.TestAPI.as_view(), name='test_api'),
    path(dev_prefix, RedirectView.as_view(url=dev_prefix  + 'test/', permanent=False), name='api'),  # Temporary redirect
    path('auth/', include('allauth.urls')),  # Django-allauth URLs 
    path(dev_prefix, include('nutrition_service.urls'), name='nutrition_api'),
 

    # path('', include('food_identifier.urls')),  # Include food_identifier app's URLs (for generate-presigned-url)
]

