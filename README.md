# FoodLens

**FoodLens** is a web application that identifies foods in images and provides nutrition information.

## Features

- **Back-end**: Developed using Django to manage user-uploaded food images, metadata, and notifications through AWS SNS.
- **Image Metadata**: Processes and stores image data like size, S3 URL, and checksum.
- **Data Storage**: Utilizes AWS S3, PostgreSQL, and Elasticsearch for efficient storage and querying.
- **Caching**: Redis integration to cache frequently queried food items, improving performance.
- **Scalability**: Automated image processing with AWS Lambda and Docker containers for scalable deployment.

## Technologies Used

- **Front-end**: React
- **Back-end**: Django
- **Cloud**: AWS S3, AWS Lambda, SNS
- **Data Stores**: PostgreSQL, Elasticsearch, Redis
- **Containerization**: Docker
- **Monitoring**: Prometheus, Grafana
- **Other Tools**: Locust, Ngrok, Clarifai, Ggshield

## How to Run

### Prerequisites

Before running the application, ensure you have the following:

- **Docker**: Installed and configured. [Docker installation guide](https://docs.docker.com/get-docker/)
- **AWS credentials**: Make sure you have valid AWS credentials set up. You can use [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-aws.html) for setup.

### 1. Clone the Repository 
git clone https://github.com/yourusername/foodlens.git
cd foodlens

### 2. Build and Run Containers
docker-compose build
docker-compose up

### 3. Access Application
Frontend: Once the containers are running, you can access the React app by visiting http://localhost:3000.
Backend: The Django backend will be available at http://localhost:8000.
Pgadmin: http://localhost:5050.

## License
This project is licensed under the MIT License. See the LICENSE file for more information.
