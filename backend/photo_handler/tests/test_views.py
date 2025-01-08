from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Photo

class PhotoViewTestCase(APITestCase):

    def setUp(self):
        """Setup any necessary data for the tests."""
        # Create a test photo in the database
        self.photo = Photo.objects.create(
            filename="test_image.jpg",
            file_size=1024
        )
        self.photo_url = reverse('photo-detail', kwargs={'id': self.photo.id})
        self.create_photo_url = reverse('photo-create')  # Update with your actual URL name

    def test_create_photo(self):
        """Test creating a photo using the API (POST request)."""
        data = {
            'filename': 'new_image.jpg',
            'file_size': 2048
        }
        
        response = self.client.post(self.create_photo_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('id', response.data)  # Ensure the response includes an ID
        self.assertEqual(response.data['filename'], 'new_image.jpg')

    def test_get_photo(self):
        """Test retrieving the metadata of an existing photo (GET request)."""
        response = self.client.get(self.photo_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['filename'], 'test_image.jpg')
        self.assertEqual(response.data['file_size'], 1024)

    def test_get_nonexistent_photo(self):
        """Test retrieving metadata for a non-existent photo (GET request)."""
        nonexistent_photo_url = reverse('photo-detail', kwargs={'id': 99999})
        response = self.client.get(nonexistent_photo_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'Photo not found')

    def test_create_photo_missing_fields(self):
        """Test creating a photo with missing fields (should return a 400 error)."""
        data = {'filename': ''}  # Missing file size
        response = self.client.post(self.create_photo_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('file_size', response.data)  # Ensure the missing field is in the error response

    def test_sns_subscription_check(self):
        """Test if the SNS subscription check works (Custom logic for SNS subscription)."""
        # Call the endpoint that checks for the SNS subscription
        sns_check_url = reverse('sns-subscribe')  # Update with your actual URL name
        response = self.client.get(sns_check_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], 'Successfully subscribed!')

    def test_s3_presigned_url_generation(self):
        """Test that the presigned URL generation works."""
        response = self.client.get(self.photo_url)  # Presigned URL should be returned here
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('url', response.data)
        # Additional checks can be added to ensure the URL structure is correct (e.g., checking expiration time)

