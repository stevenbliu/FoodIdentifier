# Use Python 3.11 as the base image
FROM python:3.11

# Set the working directory inside the container
WORKDIR /app

COPY . .
# Copy the requirements file from the backend folder to the container
# COPY backend/requirements.txt ./requirements.txt

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt
# RUN pip install --no-cache-dir -r requirements-dev.txt

# Install jq for fetching ngrok public URL (add this before copying the app code for better caching)
RUN apt-get update 
RUN apt-get install -y jq 
RUN rm -rf /var/lib/apt/lists/*

# Copy the entire backend folder into the container’s /app directory
# COPY backend/ ./

# Ensure entrypoint and ngrok fetcher script are executable
RUN sed -i 's/\r//' ngrok_url_fetcher.sh
RUN cat -v ngrok_url_fetcher.sh
RUN chmod +x ./ngrok_url_fetcher.sh ./entrypoint.sh

# Make entrypoint.sh the default command to execute
# ENTRYPOINT ["./entrypoint.sh"]

# Run the ngrok URL fetcher script and start the Django development server
# CMD ./ngrok_url_fetcher.sh && python manage.py runserver 0.0.0.0:8000