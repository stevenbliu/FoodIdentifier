#!/bin/bash

# Start ngrok on port 8000 (or whatever port your backend uses)
echo "Starting ngrok on port 8000..."
ngrok http 8000 --log=stdout
echo "Ngrok started"

# Wait a few seconds for ngrok to initialize
sleep 5

# Get the public URL from ngrok
NGROK_URL=$(curl --silent http://localhost:4040/api/tunnels | jq -r .tunnels[0].public_url)

# Replace the API URL in the .env file
echo "REACT_APP_API_URL=${NGROK_URL}" > ../.env

# Run the other services (backend, frontend, etc.)
# This will assume that your other services (like backend) are running or need to be started
# Depending on your setup, you may need to trigger a script to restart other containers that depend on the URL

# Optionally, you could send a signal to restart your frontend or backend containers, if necessary
# docker-compose restart frontend
# docker-compose restart backend

# Keep the script running to allow ngrok to stay active
tail -f /dev/null
