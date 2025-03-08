# food_identifier/tasks.py

from celery import shared_task
import time
import logging

logger = logging.getLogger(__name__)

@shared_task
def long_running_task(food_data):
    # Simulate a long-running task (e.g., food processing)
    time.sleep(10)  # Simulating a delay for demonstration
    
    # Return the result
    return f"Processed food data: {food_data}"
