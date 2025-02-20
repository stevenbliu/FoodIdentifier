import jwt
import datetime
from django.conf import settings

def create_jwt_for_user(user):
    """Generate JWT for a given user"""
    payload = {
        "user_id": user.id,
        "username": user.username,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1),  # Expiry in 1 hour
        "iat": datetime.datetime.utcnow(),
    }
    
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
    return token
