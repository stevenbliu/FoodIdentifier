# FoodLens

**FoodLens** is a web application that identifies foods in images and provides nutrition information using third-party APIs. 

## Features

- **Back-end**: Developed using Django to manage user-uploaded food images, metadata, and notifications through AWS SNS.
- **Image Metadata**: Processes and stores image data like size, S3 URL, and checksum.
- **Data Storage**: Utilizes AWS S3, PostgreSQL, and Elasticsearch for efficient storage and querying.
- **Caching**: Redis integration to cache frequently queried food items, improving performance.
- **Scalability**: Automated image processing with AWS Lambda and Docker containers for scalable deployment.

## Technologies Used
- **Back-end**: Django
- **Cloud**: AWS S3, AWS Lambda, SNS
- **Data Stores**: PostgreSQL, Elasticsearch, Redis
- **Containerization**: Docker

## How to Run
1. Clone the repository.
2. Set up Docker and AWS credentials.
3. Build and run the Docker containers using `docker-compose`.

## License
This project is licensed under the MIT License.
