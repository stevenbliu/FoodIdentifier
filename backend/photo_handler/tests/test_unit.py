# from unittest.mock import patch
# from django.test import TestCase
# from django.urls import reverse
# import boto3
# from django.conf import settings
# import logging
# import requests

# logger = logging.getLogger(__name__)

# class GeneratePresignedURLTestCase(TestCase):

#     @patch('boto3.client')  # Mocking boto3 client to avoid actual S3 calls
#     def test_generate_presigned_url_success(self, mock_boto_client):
#         # Set up mock return value for the presigned URL
#         mock_s3_client = mock_boto_client.return_value
#         mock_s3_client.generate_presigned_url.return_value = "https://fake-presigned-url.com"
        
#         filename = "test_image.jpg"
#         file_size = 1024
        
#         # Use the correct URL pattern and arguments
#         url = reverse('generate_presigned_url', args=[filename, file_size])
        
#         # Simulate a GET request to the view
#         response = self.client.get(url)
        
#         # Check if the response contains the expected URL
#         self.assertEqual(response.status_code, 200)
#         self.assertJSONEqual(str(response.content, encoding='utf8'), '{"url": "https://fake-presigned-url.com"}')

#     @patch('boto3.client')  # Mocking boto3 client to avoid actual S3 calls
#     def test_generate_presigned_url_fail(self, mock_boto_client):
#         # Set up mock return value for the presigned URL
#         mock_s3_client = mock_boto_client.return_value
#         mock_s3_client.generate_presigned_url.return_value = "https://fake-presigned-url.com"
        
#         filename = "test_image.jpg"
#         file_size = 1024
        
#         # Use the correct URL pattern and arguments
#         url = reverse('generate_presigned_url')
        
#         # Simulate a GET request to the view
#         response = self.client.get(url)
        
#         # logger.debug('123fas21:', response)

#         # Check if the response contains the expected URL
#         self.assertEqual(response.status_code, 200)
#         self.assertJSONEqual(str(response.content, encoding='utf8'), '{"url": "https://fake-presigned-url.com"}')


# from rest_framework.test import APITestCase
# from rest_framework import status
# from django.urls import reverse

# class MyApiTests(APITestCase):

#     def test_generate_presigned_url(self):
#         filename = "test_image.jpg"
#         file_size = 1024
#         url = reverse('generate_presigned_url')
        
#         response = self.client.get(url)
        
#         logger.debug(f"'12321:', {url}")
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         # self.assertIn('url', response.data)
#         # self.assertTrue(response.data['url'].startswith("https://"))
