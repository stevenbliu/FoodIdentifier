from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Photo

class CreatePhotoViewTestCase(APITestCase):
    def setUp(self):
        self.url = reverse('create-photo')  # Adjust with your actual URL pattern name
        self.valid_data = {
            "filename": "test_image.jpg",
            "file_size": 1024,
        }

    def test_create_photo_success(self):
        response = self.client.post(self.url, self.valid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('id', response.data)
        self.assertIn('url', response.data)

    def test_create_photo_missing_filename(self):
        invalid_data = self.valid_data.copy()
        invalid_data["filename"] = None
        response = self.client.post(self.url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)

    def test_create_photo_missing_file_size(self):
        invalid_data = self.valid_data.copy()
        invalid_data["file_size"] = None
        response = self.client.post(self.url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
