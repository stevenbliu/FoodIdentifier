# sns_service.py
import boto3
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import boto3
import logging

logger = logging.getLogger(__name__)

# @csrf_exempt
# def send_sns_notification(request, topic_arn):
#     print('send')
#     sns = boto3.client('sns', region_name='us-east-1')
#     try:
#         response = sns.publish(
#             topic_arn = topic_arn
#             Message="Test notification from Django!",
#             Subject="Test Subject"
#         )
#         return JsonResponse({"message": "Notification sent!", "response": response})
#     except Exception as e:
#         return JsonResponse({"error": str(e)}, status=500)

import boto3
from botocore.exceptions import ClientError

# Initialize SNS client
sns_client = boto3.client('sns', region_name='us-east-1')

def subscribe_to_sns(topic_arn: str, endpoint: str):
    try:
        response = sns_client.subscribe(
            TopicArn=topic_arn,
            Protocol='https',  # or 'http' if not using https
            Endpoint=endpoint  # The endpoint of your Django backend that handles SNS notifications
        )
        return response
    except ClientError as e:
        print(f"Error subscribing to SNS: {e}")
        return None


def parse_s3_notification(notification):
    try:
        # Parse the notification if it's in string format
        data = json.loads(notification)
        
        # Extract relevant information
        event_name = data['Records'][0]['eventName']
        bucket_name = data['Records'][0]['s3']['bucket']['name']
        object_key = data['Records'][0]['s3']['object']['key']
        object_size = data['Records'][0]['s3']['object']['size']
        event_time = data['Records'][0]['eventTime']
        
        # Format the output
        return {
            "event_name": event_name,
            "bucket_name": bucket_name,
            "object_key": object_key,
            "object_size": object_size,
            "event_time": event_time,
            "s3_url": f"https://{bucket_name}.s3.amazonaws.com/{object_key}"

        }
    except:
        return notification
