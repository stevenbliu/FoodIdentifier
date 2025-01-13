#!/bin/bash
# entrypoint.sh

echo "REACT_APP_NGROK_PUBLIC_URL: $REACT_APP_NGROK_PUBLIC_URL"

# python manage.py makemigrations

# Run migrations
# python manage.py migrate --noinput

# Start the Django application
exec "$@"
