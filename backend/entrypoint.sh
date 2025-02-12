#! bin/bash/
echo "Waiting for ngrok to be ready..."

# NGROK_PUBLIC_URL=""

# while true; do
#     #Fetch the ngrok public URL from the API
#     NGROK_PUBLIC_URL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')

#     echo "Trying to fetch ngrok public URL: $NGROK_PUBLIC_URL"

#     # Check if the URL is non-empty and not null
#     if [ -n "$NGROK_PUBLIC_URL" ] && [ "$NGROK_PUBLIC_URL" != "null" ]; then
#         echo "Ngrok public URL found: $NGROK_PUBLIC_URL"
#         break
#     else
#         echo "Ngrok not ready yet, retrying..."
#         sleep 5
#     fi
# done

echo "Starting DJANGO backend Servce - REACT_APP_NGROK_PUBLIC_URL: $REACT_APP_NGROK_PUBLIC_URL"
python manage.py makemigrations
python manage.py migrate

exec "$@"
