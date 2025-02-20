from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from authentication.models import CustomUser
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from jwt.exceptions import ExpiredSignatureError

# from .models import RefreshTokenModel  # A custom model to store refresh tokens securely
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

from rest_framework.permissions import AllowAny  # Allow unauthenticated access

from datetime import timedelta
from django.utils import timezone
from django.db import IntegrityError

from django.middleware.csrf import get_token

import logging

from food_identifier.throttling import (
    BurstRateThrottle,
    SustainedRateThrottle,
)  # Import from core

from .utils import create_jwt_for_user

from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings

logger = logging.getLogger(__name__)


class RegisterView(APIView):
    permission_classes = [AllowAny]  # Allow unauthenticated users
    throttle_classes = [BurstRateThrottle, SustainedRateThrottle]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {"error": "Username and password must be provided."}, status=400
            )

        if CustomUser.objects.filter(username=username).exists():
            return Response({"error": "User already exists"}, status=400)

        user = CustomUser.objects.create_user(username=username, password=password)

        return Response({"message": "User created successfully"}, status=201)


class LoginView(APIView):
    permission_classes = [AllowAny]  # Allow unauthenticated users
    throttle_classes = [BurstRateThrottle, SustainedRateThrottle]

    def post(self, request):

        logger.info(f"Login attemspt for user {request.data.get('username')}")

        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if not user:
            return Response({"error": "Invalid credentials"}, status=400)

        jwt_token = create_jwt_for_user(user)

        try:
            logger.info(f"Attempting to save refresh token for user {user.username}")

            refresh = RefreshToken.for_user(user)
            refresh_token = str(refresh)
            access_token = str(refresh.access_token)
            csrf_token = get_token(request)
            logger.info(f"User {username} logged in.")

            # if created:
            logger.info(f"New refresh token created for user {user.username}")

            response = Response(
                {
                    "refresh": refresh_token,
                    "access": access_token,
                    "csrf_token": csrf_token,
                    'user': {
                        'id': user.id,
                        'email': user.email
                    }
                },
                status=status.HTTP_200_OK,
            )

            # Set HTTP-only cookies for tokens
            response.set_cookie(
                "access_token",
                jwt_token,
                httponly=True,  # Prevents JavaScript access
                secure=True,  # Only send over HTTPS
                samesite="Strict",
                max_age=3600,  # 1-hour expiry
            )

            response.set_cookie(
                "refresh_token",
                refresh_token,
                httponly=True,
                secure=True,
                samesite="Lax",
            )

            return response
            # else:
            # logger.info(f"Refresh token updated for user {user.username}")
        except IntegrityError as e:
            logger.error(f"Error during token save: {str(e)}")

        # return Response({
        #     "refresh": str(refresh),
        #     "access": str(refresh.access_token),
        #     "user": {
        #         "username": user.username,
        #     }
        # }, status=200)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({"username": user.username})


class TokenRefreshView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh")
        logger.info(f"Refresh token received: {request.data}")

        if not refresh_token:
            logger.error("Refresh token is required")
            return Response({"error": "Refresh token is required"}, status=400)

        try:
            # Query the refresh token from the database
            stored_token = RefreshTokenModel.objects.get(refresh_token=refresh_token)

            # Check if the refresh token has expired (using 30 days expiration for example)
            if stored_token.created_at < timezone.now() - timedelta(days=30):
                logger.error(
                    f"Refresh token has expired for user {request.user.username}"
                )
                return Response({"error": "Refresh token has expired"}, status=401)

            # Check if the token is revoked (if you have this field in your model)
            if stored_token.revoked:
                logger.error(
                    f"Refresh token has been revoked for user {request.user.username}"
                )
                return Response({"error": "Refresh token has been revoked"}, status=401)

            # Generate new access token using the stored refresh token
            token = RefreshToken(stored_token.refresh_token)
            new_access_token = token.access_token

            logger.info(f"Token refreshed for user {request.user.username}")
            return Response(
                {
                    "access": str(new_access_token),  # New access token
                }
            )

        except RefreshTokenModel.DoesNotExist:
            logger.error(
                f"Invalid or expired refresh token for user {request.user.username}"
            )
            return Response({"error": "Invalid or expired refresh token."}, status=401)
        except ExpiredSignatureError:
            logger.error(f"Refresh token has expired for user {request.user.username}")
            return Response({"error": "Refresh token has expired"}, status=401)
        except Exception as e:
            logger.error(
                f"Error refreshing token for user {request.user.username}: {str(e)}"
            )
            raise AuthenticationFailed("Invalid refresh token") from e


class RefreshTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh_token")
        if not refresh_token:
            return JsonResponse({"detail": "No refresh token provided"}, status=400)

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            return JsonResponse({"access_token": access_token})
        except Exception as e:
            return JsonResponse({"detail": str(e)}, status=400)


class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]  # Allow unauthenticated users

    
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        # Get tokens from response
        access_token = response.data.get("access")
        refresh_token = response.data.get("refresh")

        # Set tokens as HTTP-only cookies
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=settings.USE_HTTPS,  # Set True in production
            samesite="Lax",
        )
        response.set_cookie(
            key="refresh_token", 
            value=refresh_token,
            httponly=True,
            secure=settings.USE_HTTPS,  # Set True in production
            samesite="Lax",
        )

        # Remove tokens from JSON response (optional)
        response.data.pop("access", None)
        response.data.pop("refresh", None)

        return response


class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = [AllowAny]  # Allow unauthenticated users

    
    def post(self, request, *args, **kwargs):
        logger.info("Refreshing token view")
        # Get refresh token from the cookie
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response({"error": "No refresh token provided"}, status=400)

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)

            response = Response()
            response.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=False,  # Set True in production
                samesite="Lax",
            )
            logger.info("Token refreshed")
            return response
        except Exception as e:
            logger.error("Invalid refresh token")
            return Response({"error": f"Invalid refresh token: {e}"}, status=400)
