#!/bin/sh


# Strip the protocol from the environment variable
export REACT_APP_NGROK_PUBLIC_URL_STRIPPED=$(echo $REACT_APP_NGROK_PUBLIC_URL | sed 's|https://||')

# Replace variables in the Nginx template
envsubst '$REACT_APP_NGROK_PUBLIC_URL_STRIPPED $REACT_APP_NGROK_PUBLIC_URL' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf


echo "Starting nginx server at port 80 with the following environment variables: REACT_APP_NGROK_PUBLIC_URL: $REACT_APP_NGROK_PUBLIC_URL"

# Start Nginx
nginx -g "daemon off;"

