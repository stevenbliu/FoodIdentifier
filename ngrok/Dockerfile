# # Use a lightweight base image
# FROM alpine:latest
FROM ngrok/ngrok:latest

# # Install dependencies (bash, curl, and jq for parsing ngrok API response)
USER root
RUN apt-get update && apt-get install -y bash curl jq
