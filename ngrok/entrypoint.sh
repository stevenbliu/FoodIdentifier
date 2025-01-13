#!/bin/bash
echo "Starting ngrok server: ngrok http $BACKEND_PORT"

ngrok http http://backend:$BACKEND_PORT &

# Wait for ngrok to be ready and provide a valid public URL
echo "Waiting for ngrok to be ready..."

NGROK_PUBLIC_URL=""

while true; do
    # Fetch the ngrok public URL from the API
    NGROK_PUBLIC_URL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')

    # Check if the URL is non-empty and not null
    if [ -n "$NGROK_PUBLIC_URL" ] && [ "$NGROK_PUBLIC_URL" != "null" ]; then
        echo "Ngrok public URL found: $NGROK_PUBLIC_URL"
        break
    else
        echo "Ngrok not ready yet, retrying..."
        sleep 5
    fi
done



# Update .env with the ngrok public URL
echo "Updating .env file with ngrok public URL: $NGROK_PUBLIC_URL"
TMP_ENV_FILE=$(mktemp /tmp/.env.XXXXXX)


if grep -q "^REACT_APP_NGROK_PUBLIC_URL=" ./app/.env; then
    # If the REACT_APP_NGROK_PUBLIC_URL already exists, replace its value
    echo "Replacing REACT_APP_NGROK_PUBLIC_URL in .env"
    # sed -i "s|^REACT_APP_NGROK_PUBLIC_URL=.*|REACT_APP_NGROK_PUBLIC_URL=$NGROK_PUBLIC_URL|" ./app/.env
    sed "s|^REACT_APP_NGROK_PUBLIC_URL=.*|REACT_APP_NGROK_PUBLIC_URL=$NGROK_PUBLIC_URL|" ./app/.env > "$TMP_ENV_FILE"
else
    # If REACT_APP_NGROK_PUBLIC_URL doesn't exist, append it to the file
    echo "REACT_APP_NGROK_PUBLIC_URL=$NGROK_PUBLIC_URL" >> /app/.env
fi

cp "$TMP_ENV_FILE" ./app/.env
rm "$TMP_ENV_FILE"

# Log the contents of the .env file
# echo "The contents of the .env file are:"
# cat /app/.env

echo "NGROK ENTRYPOINT COMPLETED. SERVER UP AND RUNNING"

# Optionally, you could run additional commands here if needed, or just let ngrok run.
tail -f /dev/null