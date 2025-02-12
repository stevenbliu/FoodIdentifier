# Use Python 3.11 as the base image
FROM python:3.11

# Set the working directory inside the container
WORKDIR /app

# Install jq for fetching ngrok public URL (add this before copying the app code for better caching)
RUN apt-get update 
RUN apt-get install -y jq 
RUN apt-get install -y iputils-ping

RUN rm -rf /var/lib/apt/lists/*



# Copy the requirements file from the backend folder to the container
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt
