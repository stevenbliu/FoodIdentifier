# from unittest.mock import patch
# from django.test import TestCase
# from django.urls import reverse
# import boto3
# from django.conf import settings
# import logging
# import requests

# logger = logging.getLogger(__name__)

# class GeneratePresignedURLTestCase(TestCase):

#     def test_generate_presigned_url_real(self):
#         # Initialize the actual boto3 S3 client
#         s3_client = boto3.client(
#             's3',
#             aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
#             aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
#             region_name=settings.AWS_REGION,
#         )

#         filename = "test_image.jpg"
#         file_size = 1024

#         # Generate the presigned URL for the file upload
#         response = s3_client.generate_presigned_url(
#             'put_object',
#             Params={'Bucket': settings.AWS_STORAGE_BUCKET_NAME,
#                     'Key': filename,
#                     'ContentType': 'image/jpeg',  # or your required content type
#                     'ContentLength': file_size},
#             ExpiresIn=3600
#         )
#         logger.debug(f"Calculation result: {response}")  # Log instead of print

#         # Check that the response is a valid URL
#         self.assertTrue(response.startswith("https://"))
#         self.assertIn("amazonaws.com", response)



# class UploadPhotoTestCase(TestCase):

#     @patch('boto3.client')  # Mocking boto3 client to avoid actual S3 calls
#     def test_upload_photo_success(self, mock_boto_client):
#         # Set up mock return value for the presigned URL
#         mock_s3_client = mock_boto_client.return_value
#         mock_s3_client.generate_presigned_url.return_value = "https://fake-presigned-url.com"
        
#         # Simulate the response for the presigned URL
#         filename = "test_image.jpg"
#         file_size = 1024
        
#         # Use the correct URL pattern and arguments
#         url = reverse('generate_presigned_url', args=[filename, file_size])
        
#         # Simulate a GET request to the view
#         response = self.client.get(url)
        
#         # Check if the response contains the expected URL
#         self.assertEqual(response.status_code, 200)
#         self.assertJSONEqual(str(response.content, encoding='utf8'), '{"url": "https://fake-presigned-url.com"}')

#         # Simulate uploading the file to the pre-signed URL using requests
#         file_content = b"fake_image_data"  # Simulated file content
        
#         # Upload the file to the pre-signed URL (mocked)
#         upload_response = requests.put(
#             "https://fake-presigned-url.com",
#             data=file_content,
#             headers={'Content-Type': 'image/jpeg'}
#         )
        
#         # Check if the file was uploaded successfully
#         self.assertEqual(upload_response.status_code, 200)

#     @patch('boto3.client')  # Mocking boto3 client for another test case
#     def test_upload_photo_real(self, mock_boto_client):
#         # Initialize the actual boto3 S3 client
#         s3_client = boto3.client(
#             's3',
#             aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
#             aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
#             region_name=settings.AWS_REGION,
#         )

#         filename = "test_image.jpg"
#         file_size = 1024

#         # Generate the pre-signed URL for the file upload
#         response = s3_client.generate_presigned_url(
#             'put_object',
#             Params={'Bucket': settings.AWS_STORAGE_BUCKET_NAME,
#                     'Key': filename,
#                     'ContentType': 'image/jpeg',  # or your required content type
#                     'ContentLength': file_size},
#             ExpiresIn=3600
#         )
#         logger.debug(f"Calculation result: {response}")  # Log instead of print

#         # Check that the response is a valid URL
#         self.assertTrue(response.startswith("https://"))
#         self.assertIn("amazonaws.com", response)

#         # Simulate uploading the file to S3
#         file_content = b"fake_image_data"  # Simulated file content

#         upload_response = requests.put(
#             response,
#             data=file_content,
#             headers={'Content-Type': 'image/jpeg'}
#         )

#         # Assert the upload response (200 indicates success)
#         self.assertEqual(upload_response.status_code, 200)
