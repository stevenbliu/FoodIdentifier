from unittest.mock import patch
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse

class SNSNotificationHandlerTestCase(APITestCase):
    @patch('photo_handler.views.SNSNotificationHandler.check_sns_subscription')
    def test_handle_sns_notification(self, mock_check_subscription):
        mock_check_subscription.return_value = True

        valid_sns_data = {
            "Message": '{"Records":[{"s3":{"object":{"key":"test_image.jpg"}}}]}',
            "MessageAttributes": {}
        }

        url = reverse('sns-notification-handler')  # Adjust the URL name
        response = self.client.post(url, valid_sns_data, content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], "Notification processed successfully")

    @patch('photo_handler.views.SNSNotificationHandler.check_sns_subscription')
    def test_handle_invalid_sns_subscription(self, mock_check_subscription):
        mock_check_subscription.return_value = False

        invalid_sns_data = {
            "Message": '{"Records":[{"s3":{"object":{"key":"test_image.jpg"}}}]}',
            "MessageAttributes": {}
        }

        url = reverse('sns-notification-handler')  # Adjust the URL name
        response = self.client.post(url, invalid_sns_data, content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn('error', response.data)
