from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import BaseAuthentication

import jwt
import logging
from django.conf import settings
from django.contrib.auth import get_user_model

logger = logging.getLogger(__name__)

class JWTAuthenticationFromCookie(BaseAuthentication):
    def authenticate(self, request):
        logger.info('Authenticating Custom -asd')
        logger.info(f'Cookies: {request.COOKIES}')
        
        access_token = request.COOKIES.get("access_token")  # ✅ Read JWT from HTTP-only cookies
        if not access_token:
            logger.info('No access token found in cookies.')
            return None  # No token → continue to next authentication method

        try:
            payload = jwt.decode(access_token, settings.SECRET_KEY, algorithms=["HS256"])
            logger.info(f'Payload: {payload}')

        except jwt.ExpiredSignatureError:
            logger.info('Access token has expired.')
            refresh_token = request.COOKIES.get("refresh_token")  # ✅ Read refresh token from cookies
            if refresh_token:
                logger.info('Refreshing access token...')
                self.refresh_access_token(refresh_token)
                return None  # Refreshed → continue to next authentication method
            raise AuthenticationFailed("Access token has expired and no refresh token provided.")
        except jwt.InvalidTokenError:
            logger.info('Invalid access token.')
            raise AuthenticationFailed("Invalid access token.")

        # Use get_user_model() to get the appropriate user model (CustomUser or default User)
        User = get_user_model()
        user = User.objects.get(id=payload["user_id"])  # Adjust based on JWT payload
        return (user, None)  # DRF requires returning (user, auth)

    def refresh_access_token(self, refresh_token):
        try:
            # Decode the refresh token (validate it)
            payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=["HS256"])
            
            User = get_user_model()  # Use get_user_model here
            user = User.objects.get(id=payload["user_id"])

            # Create a new access token for the user
            refresh = RefreshToken.for_user(user)
            new_access_token = str(refresh.access_token)

            # Create and return the response
            response = Response({"access_token": new_access_token})
            response.set_cookie("access_token", new_access_token, httponly=True)

            logger.info('Access Token refreshed')
            return response  # Return response with the new token

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Refresh token has expired.")
        except jwt.InvalidTokenError:
            raise AuthenticationFailed("Invalid refresh token.")
