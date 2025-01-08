from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .serializers import PhotoSerializer

class InjectTestDataViewTestCase(APITestCase):
    def setUp(self):
        self.url = reverse('inject-test-data')  # Adjust with your actual URL pattern name

    def test_inject_test_data_success(self):
        response = self.client.post(self.url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], "Test data injected successfully!")

    def test_inject_test_data_failure(self):
        # Simulate failure case (e.g., serializer validation failure)
        response = self.client.post(self.url, {"filename": ""}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('filename', response.data)
