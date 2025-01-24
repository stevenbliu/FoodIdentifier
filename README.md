# FoodLens

**FoodLens** is a web application that identifies foods in images and provides nutrition information.

## MVP (Minimal Viable Product)
- **Image Recognition of Food Items**: Users take a photo of their meal, then AI identifies food items
- **Nutritional Info**: Provides basic nutritional data from recognized items
- **Interface**: Simple UI for uploading photos and viewing results

## Current Features:
- **Back-end**: Developed using Django to manage user-uploaded food images, metadata,
- **Notifications**: Notifications of recognition status from AWS SNS.
- **Data Storage**: Utilizes AWS S3, PostgreSQL, and Elasticsearch for efficient storage and querying.
- **Scalability**: Kubernetes and Docker containers for scalable deployment.
- **Testing**: Runs unit, integration, and e2e tests with UnitTest, PyTest, GitHub Actions, Cypress, Locust
- **User System**: Features require user profile which is authenticated with JWT with Refresh Tokens
- **Read-Write Databases**: Implemented read-only replicas of primary PostgreSQL database for optimized reading 
- **Load Balacning**: With NGINX revse proxy
- **Montioring**: With Prometheus and Grafana
- **Third-Party API for Image Recognition**: Uses Clarifai API with rate-limiting implemented
- **Hooks**: Pre-commit hooks with ggshield and detect-secrets to check for sensitive data on before commits


## Enhancements
- **Caching**: Redis integration to cache frequently queried food items, improving performance.
- **Sharding**: By users or food types 
- **Indexing**: By users or food types
- **Meal Logging**: ...
- **Fault Tolerance to API**: Circuit Breaker with Hystrix
- **Retry Mechanism**: With tenacity or resilience4j
- **Message Queue**: Kafka/RabbitMQ
- **Optimistic/Pessimistic Locking**: to handle concurrency
- **Nutrition Data**: 

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
