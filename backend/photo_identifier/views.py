from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import FoodPrediction, FoodLabel
from photo_handler.models import Photo
from .ml import run_food_model

import time
from rest_framework.exceptions import NotFound

def retry_with_exponential_backoff(func, max_retries=5, base_delay=1, max_delay=32, *args, **kwargs):
    """
    Retries a function with exponential backoff.
    
    :param func: The function to call.
    :param max_retries: The maximum number of retries.
    :param base_delay: The initial delay (in seconds).
    :param max_delay: The maximum delay (in seconds).
    :return: The result of the function call if successful.
    :raises Exception: If retries are exhausted.
    """
    for attempt in range(max_retries):
        try:
            # Attempt to call the function
            return func(*args, **kwargs)
        except Exception as e:
            # Calculate the exponential backoff delay
            delay = min(base_delay * (2 ** attempt), max_delay)
            print(f"Attempt {attempt + 1} failed: {e}. Retrying in {delay} seconds...")
            time.sleep(delay)
    
    # If max retries are exceeded, raise an exception
    raise Exception(f"Max retries exceeded for {func.__name__}")

class PredictFoodView(APIView):
    def post(self, request, photo_id):
        try:
            # Retry the photo fetch logic in case of intermittent errors
            photo = retry_with_exponential_backoff(Photo.objects.get, photo_id=photo_id)
            
            # Retry the ML model call in case of intermittent failures
            result = retry_with_exponential_backoff(run_food_model, photo.filename)

            # Get or create the food label
            label, _ = FoodLabel.objects.get_or_create(name=result['label'])

            # Save the prediction
            prediction = FoodPrediction.objects.create(
                photo=photo,
                label=label,
                confidence=result['confidence']
            )

            # Return the prediction data
            return Response({
                'photo_id': photo.id,
                'label': prediction.label.name,
                'confidence': prediction.confidence
            }, status=status.HTTP_201_CREATED)
        
        except Photo.DoesNotExist:
            return Response({'error': 'Photo not found'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            # Catch any other exceptions that occur after retry logic is exhausted
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
