#!/bin/bash
# entrypoint.sh


python manage.py makemigrations

# Run migrations
python manage.py migrate --noinput

# Start the Django application
exec "$@"
