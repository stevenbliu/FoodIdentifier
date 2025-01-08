from locust import HttpUser, task, between

# Load environment variables from .env file
import os
from dotenv import load_dotenv
load_dotenv()

TEST_PASSWORD = os.getenv("TEST_PASSWORD")
TEST_USERNAME = os.getenv("TEST_USERNAME")

class FoodLensUser(HttpUser):
    host = "http://localhost:8000"
    wait_time = between(1, 5)

    def on_start(self):
            self.client.post("/api/auth/login", json={"username": TEST_USERNAME, "password": TEST_PASSWORD})


    @task
    def visit_homepage(self):
        self.client.get("http://frontend:3000")
    @task
    def upload_image(self):
        # Simulate image upload request
        url = f"{self.host}/photos/create/"
        data = {
            "filename": "image.png",
            "file_size": 123456
        }
        # Simulate the creation request
        response = self.client.post(url, json=data)

        if response.ok:
            upload_url = response.json().get("url")
            # Upload the image to the returned URL
            with open("image.png", "rb") as file:
                upload_response = self.client.put(upload_url, data=file)
                if upload_response.ok:
                    print("Image uploaded successfully")
                else:
                    print("Image upload failed")
        else:
            print("Failed to create upload URL")

    @task
    def fetch_photo_details(self):
        # Simulate fetching photo details
        photo_id = "12345"
        url = f"{self.host}/photos/{photo_id}/"
        response = self.client.get(url)
        if response.ok:
            print(f"Fetched photo details: {response.json()}")
        else:
            print("Failed to fetch photo details")

    @task
    def subscribe_to_notifications(self):
        # Simulate subscribing to notifications
        url = f"{self.host}/photos/subscribe/"
        response = self.client.get(url)
        if response.ok:
            print("Subscribed to notifications")
        else:
            print("Failed to subscribe to notifications")

    @task
    def send_test_request(self):
        # Simulate sending a test request to inject test data
        url = f"{self.host}/photos/inject-test-data/"
        response = self.client.post(url)
        if response.ok:
            print("Test data injected successfully")
        else:
            print("Failed to send test data")
            
    

