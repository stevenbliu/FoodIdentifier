from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect


dev_prefix = 'api/'
urlpatterns = [
    path('admin/', admin.site.urls),
    # path('photo/', include('photo_handler.urls')),
    # path('data/', include('data_handler.urls')),
    # path('search/', include('search.urls')),
    path(dev_prefix + 'photos/', include('photo_handler.urls')),  # Include the photo_handler app's urls
    # path('photo-handler'),  # Include the photo_handler app's urls
    path(dev_prefix +'food/', include('photo_identifier.urls')),
    # path('', lambda request: redirect('http://localhost:3000', permanent=True)),  # Redirect to frontend container
    # path('', lambda request: redirect('api/', permanent=True)),  # Redirect to frontend container

    path(dev_prefix + 'auth/', include('authentication.urls')),

    # path('', include('food_identifier.urls')),  # Include food_identifier app's URLs (for generate-presigned-url)
]
# project_name/urls.py
from django.contrib import admin
from django.urls import path, include

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('photo-handler/', include('photo_handler.urls')),  # Correctly include the photo_handler app's URLs
# ]
