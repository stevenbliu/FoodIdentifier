# Use a lightweight base image
FROM alpine:latest
# FROM ngrok/ngrok:latest

# Install dependencies (bash, curl, and jq for parsing ngrok API response)
USER root
# RUN apt-get update && apt-get install -y bash curl jq

# RUN apk add --no-cache bash curl jq

# Download and install the latest ngrok version directly
# RUN curl -s https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip -o /tmp/ngrok.zip && \
#     unzip /tmp/ngrok.zip -d /usr/local/bin && \
#     rm /tmp/ngrok.zip

# # Set ngrok authtoken
ARG NGROK_AUTH_TOKEN
RUN ngrok authtoken $NGROK_AUTH_TOKEN

# # Expose the ngrok port
EXPOSE 4040

# # # Copy the run_ngrok.sh script into the container
COPY run_ngrok.sh /usr/local/bin/run_ngrok.sh

# # # Make the script executable
RUN chmod +x /usr/local/bin/run_ngrok.sh

# CMD ["http", "8000", "--log", "/tmp/ngrok.log"]

# CMD ["ngrok", "http", "8000"]

# Set the default command to run ngrok
CMD ["/bin/bash", "-c", "/usr/local/bin/run_ngrok.sh && bash ngrok_url_fetcher.sh"]

# CMD []k