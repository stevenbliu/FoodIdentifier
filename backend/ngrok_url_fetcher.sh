#!/bin/bash

# Wait for ngrok to start and provide a valid public URL
echo "Waiting for ngrok to be ready..."

NGROK_PUBLIC_URL=""

while true; do
    # Fetch the ngrok public URL from the API
    NGROK_PUBLIC_URL=$(curl -s http://ngrok:4040/api/tunnels | jq -r '.tunnels[0].public_url')

    # Check if the URL is non-empty and not null
    if [ -n "$NGROK_PUBLIC_URL" ] && [ "$NGROK_PUBLIC_URL" != "null" ]; then
        echo "Ngrok public URL found: $NGROK_PUBLIC_URL"
        break
    else
        echo "Ngrok not ready yet, retrying..."
        sleep 1
    fi
done

# Remove the https:// prefix from the public URL
# NGROK_PUBLIC_URL=$(echo "$NGROK_PUBLIC_URL" | sed 's|^https://||')
# NGROK_PUBLIC_URL="${NGROK_PUBLIC_URL#https://}"

# Overwrite the .env file with the new public URL
echo "Updating .env file with ngrok public URL..."
echo "REACT_APP_NGROK_PUBLIC_URL=$NGROK_PUBLIC_URL" > .env

# Log the contents of the .env file
echo "The contents of the .env file are:"
cat .env

# Start the application (backend or frontend)
exec "$@"
