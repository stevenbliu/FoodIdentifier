from django.urls import path
from . import views

# urlpatterns = [
#     path('get-presigned-url/', views.GeneratePresignedURLView.as_view(), name='generate_presigned_url'),
#     path('store-image-data/', views.StoreImageDataView.as_view(), name='store_image_data'),
#     path('upload-notification/', views.SNSNotificationHandlerView.as_view(), name='upload_notification'),
#     path('sns-endpoint/', views.SNSNotificationHandlerView.as_view(), name='sns_endpoint'),  # Use for SNS notifications
#     path('subscribe-view/', views.SNSSubscribeView.as_view(), name='subscribe_view'),
#     path('inject-test-view/', views.InjectTestDataView.as_view(), name='inject_test_view'),
# ]

# ideal implementation
urlpatterns = [
    # path('', views.PhotoListView.as_view(), name='photo_list'),

    # Endpoint for creating a photo and generating a presigned URL
    path('create/', views.CreatePhotoView.as_view(), name='create_photo'),

    # Endpoint for accessing a photo's metadata (GET)
    path('<int:id>/', views.PhotoDetailView.as_view(), name='photo_detail'),

    # Endpoint for uploading the photo to S3
    # (handled in the frontend using the presigned URL)
    path('<int:id>/upload/', views.UploadPhotoView.as_view(), name='upload_photo'),

    # Endpoint for handling SNS notifications (image uploaded to S3)
    # path('<int:id>/upload-notification/', views.SNSNotificationHandlerView.as_view(), name='upload_notification'),
    path('notifications/', views.SNSNotificationHandler.as_view(), name='notifications'),

    # Endpoint for subscribing to SNS notifications
    path('subscribe/', views.SNSSubscribeView.as_view(), name='subscribe_view'),
    # path('subscribe/', views.SNSSubscribeView, name='subscribe_view'),

    # Endpoint for injecting test data (optional)
    path('inject-test-data/', views.InjectTestDataView.as_view(), name='inject_test_data'),

    # path('s3-notification/', views.S3NotificationView.as_view(), name='s3-notification'),

]