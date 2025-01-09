from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import RefreshTokenModel  # Replace with your token model

class CustomTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        # Get token from header
        token = request.headers.get('Authorization', None)
        
        if token is None:
            return None  # No token provided (could also raise AuthenticationFailed)
        
        # Extract token from 'Bearer <token>'
        token = token.split(' ')[1]
        
        try:
            # Look up the token in the database
            auth_token = RefreshTokenModel.objects.get(token=token)
        except RefreshTokenModel.DoesNotExist:
            raise AuthenticationFailed('Invalid token or token not found.')

        # Optionally, check if the token is expired, revoked, etc.
        if auth_token.is_expired():
            raise AuthenticationFailed('Token has expired.')

        return (auth_token.user, None)  # Return the user associated with the token
