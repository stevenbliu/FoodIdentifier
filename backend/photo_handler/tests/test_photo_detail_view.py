from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Photo

class PhotoDetailViewTestCase(APITestCase):
    def setUp(self):
        self.photo = Photo.objects.create(filename="test_image.jpg", file_size=1024)

    def test_get_photo_details(self):
        url = reverse('photo-detail', args=[self.photo.id])  # Adjust URL name and args
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.photo.id)

    def test_get_photo_not_found(self):
        url = reverse('photo-detail', args=[999])  # Non-existing ID
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('error', response.data)
