from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
import logging

logger = logging.getLogger(__name__)

# use 'from django.contrib.auth.mixins import LoginRequiredMixin' to authenticate
# it will class TestAPI(LoginRequiredMixin, APIView):
class TestAPI(APIView):
    """Optional view for tracking uploads (if not handled in frontend)."""
    permission_classes = [AllowAny]  # Allow any user to access this API
    
    def get(self, request):
        # logger.info(f"Tracking upload for photo ID: {id}")
        # Placeholder for upload tracking logic, if needed
        return Response({'message': 'API is running!'}, status=status.HTTP_200_OK)


# food_identifier/views.py

from django.http import JsonResponse
from .tasks import long_running_task
from celery.result import AsyncResult

def start_processing(request):
    # food_data = request.GET.get('food_data', 'default_food')
    logging.info(f"Received celery POST request with data: {'exmaple data'}")
    food_data='example food data'
    task = long_running_task.apply_async(args=[food_data])  # Trigger Celery task
    return JsonResponse({"task_id": task.id, "status": "Task started"})

# Check task status
def task_status(request, task_id):
    result = AsyncResult(task_id)  # Get task result
    return JsonResponse({
        "task_id": task_id,
        "status": result.status,
        "result": result.result if result.ready() else None
    })
