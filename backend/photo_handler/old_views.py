import boto3
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import json
import time
import datetime
from .models import Photo
import logging
import traceback

# Set up the basic configuration for logging
logging.basicConfig(
    level=logging.DEBUG,  # Set the threshold for logging messages (DEBUG, INFO, WARNING, ERROR, CRITICAL)
    format='%(asctime)s - %(levelname)s - %(message)s',  # Format of log messages
    handlers=[
        logging.FileHandler('app.log'),  # Log to a file named 'app.log'
        logging.StreamHandler()            # Also log to console
    ]
)

# Create a logger object
logger = logging.getLogger(__name__)


@csrf_exempt  # If you want to skip CSRF validation for the API endpoint
def generate_presigned_url(request):
    if request.method == 'POST':
        try: 
            logger.info('genereat presgined url')

            # Parse the JSON data from the request body
            data = json.loads(request.body)
            filename = data.get('filename')
            file_size = data.get('file_size')
            # md5Checksum = data.get('md5Checksum')
            # print(md5Checksum)
            if not filename or not file_size:
                return JsonResponse({'error': 'Missing filename or file_size in the request body'}, status=400)

            # Initialize the S3 client
            s3_client = boto3.client('s3', region_name=settings.AWS_REGION)
            # print(md5Checksum)

            # Generate a pre-signed URL
            response = s3_client.generate_presigned_url('put_object',
                                                        Params={
                                                            'Bucket': settings.AWS_STORAGE_BUCKET_NAME,
                                                            'Key': filename,
                                                            'ContentType': 'image/png',  # Adjust as necessary
                                                            'ContentLength': file_size,
                                                            # 'Content-MD5': md5Checksum
                                                        },
                                                        ExpiresIn=3600)  # URL expires in 1 hour
            
            try:
                logger.info(f"Attempting to save {filename} in database")
                # Save data to the database
                photo_data = Photo.objects.create(
                    filename = filename,  # Filename as saved in S3
                    file_size = 10,  # File size in bytes
                )

                if photo_data.id:
                    logger.info("Save was successful!")
                else:
                    logger.info("Save failed.")
            except Exception as e:  # Catch specific exceptions
                logger.error(f"An error occurred: {str(e)}")
            

            return JsonResponse({'url': response})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

        except Exception as e:
            error_details = traceback.format_exc()  # Captures the full traceback
            logger.error(f"Error occurred: {error_details}")  # Logs the traceback
            return JsonResponse({'error': str(e), 'details': error_details}, status=500)
    else:
        return JsonResponse({'error': 'Invalid HTTP method. Use POST.'}, status=405)
    

def store_image_data(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            image_key = data.get('imageKey')
            title = data.get('title')
            description = data.get('description')

            if not image_key or not title:
                return JsonResponse({'error': 'Missing image key or title'}, status=400)

            # Save data to the database
            image_metadata = Photo.objects.create(
                image_key=image_key,
                title=title,
                description=description
            )

            return JsonResponse({'success': True, 'id': image_metadata.id})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid HTTP method. Use POST.'}, status=405)
    

from django.http import JsonResponse
from .sns_service import parse_s3_notification

def upload_notification(request):
    sns = boto3.client('sns', region_name='us-east-1')
    topic_arn = settings.AWS_SNS_S3_OBJECT_PUT_NOTIFS

    try:
        response = sns.publish(
            TopicArn=topic_arn,
            Message="Test notification from Django!",
            Subject="Test Subject"
        )
        return JsonResponse({"message": "Notification sent!", "response": response})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
from .sns_service import subscribe_to_sns

def subscribe_view(request):
    topic_arn = settings.AWS_SNS_S3_OBJECT_PUT_NOTIFS
     # Replace with your SNS topic ARN
    url_forward = f'https://{settings.ALLOWED_HOSTS[0]}'
    endpoint = f"{url_forward}/photo-handler/sns_endpoint/"  # Replace with your endpoint URL

    response = subscribe_to_sns(topic_arn, endpoint)
    print(response)
    if response:
        return JsonResponse({"message": "Successfully subscribed!"})
    else:
        return JsonResponse({"message": "Subscription failed!"})

from django.http import HttpResponse
import json
import requests


@csrf_exempt
def sns_endpoint(request):
    # print('sns_endpoint', request)
    if request.method == "POST":
        # Parse the incoming SNS notification
        body = json.loads(request.body.decode("utf-8"))
        
        sns_message_type = request.headers.get("x-amz-sns-message-type", None)
        if sns_message_type == "SubscriptionConfirmation":
            # Handle subscription confirmation
            subscribe_url = body.get("SubscribeURL")
            if subscribe_url:
                # Confirm the subscription
                response = requests.get(subscribe_url)
                if response.status_code == 200:
                    return JsonResponse({"message": "Subscription confirmed successfully!"})
                else:
                    return JsonResponse({"message": "Failed to confirm subscription!"}, status=500)
        elif sns_message_type == "Notification":
            # Handle regular notifications
            message = body.get('Message')
            if isinstance(message, str):
                parsed_message = parse_s3_notification(message)
                print("Notification received:", parsed_message)

            try:
                print('Storing message metadata')
                image_metadata = Photo.objects.create(
                    filename = parsed_message['object_key'],  # Filename as saved in S3
                    file_size = parsed_message['object_size'], # File size in bytes
                    s3_url = parsed_message['s3_url'],  # The S3 URL to access the photo
                    # upload_time = models.DateTimeField(default=timezone.now)  # Time when the photo metadata is saved
                    checksum = None,  # Optional field to store checksum (e.g., MD5)
                    food_name = None  # Information about food (optional)
                )
                print('message metadata succced', image_metadata)
            except IntegrityError as e:
                print(f"Failed to save image metadata: {e}")

            return JsonResponse({"message": "Notification processed successfully!"})

    return JsonResponse({"error": "Invalid request"}, status=400)
