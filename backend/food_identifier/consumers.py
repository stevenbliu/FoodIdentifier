import json
from channels.generic.websocket import AsyncWebsocketConsumer
from celery.result import AsyncResult
import asyncio
import logging

logger = logging.getLogger(__name__)

class FoodProcessingConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        logger.info("WebSocket connection established")
        self.task_id = self.scope["url_route"]["kwargs"]["task_id"]
        self.group_name = f"food_task_{self.task_id}"

        logger.info(f"Accepting WebSocket connection for task {self.task_id}")
        # Accept the WebSocket connection
        await self.accept()

        logger.info(f"Accepted WebSocket connection for task {self.task_id}")
        # Start sending task updates
        asyncio.create_task(self.send_task_updates())
        logger.info(f"Started sending updates for task {self.task_id}")

    async def send_task_updates(self):
        logger.info(f"Starting to send updates for task {self.task_id}")
        x = 0
        wait_time = 5
        while x<=wait_time:
            task_result = AsyncResult(self.task_id)
            logging.info(f"Task {self.task_id} status: {x}/{wait_time}")
            # if task_result.ready():
            if x >= wait_time:
                logger.info(f"Task {self.task_id} is ready")
                await self.send(json.dumps({"status": "Completed", "result": 'sample task result'}))
                logger.info(f"Sent completion message for task {self.task_id}")
                break  # Stop checking once done
            
            await self.send(json.dumps({"status": f"Processing {x}/{wait_time}"}))
            await asyncio.sleep(2)  # Check every 5 seconds
            logger.info(f"Sent processing message for task {self.task_id}")
            x+=1
