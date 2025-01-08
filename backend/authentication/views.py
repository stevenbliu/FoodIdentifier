from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from authentication.models import CustomUser  # Import your custom user model
from rest_framework.permissions import IsAuthenticated

class RegisterView(APIView):
    def post(self, request):
        # Extract username and password from request data
        username = request.data.get('username')
        password = request.data.get('password')

        # Validate that both username and password are provided
        if not username or not password:
            return Response({"error": "Username and password must be provided."}, status=400)

        # Check if the username already exists
        if CustomUser.objects.filter(username=username).exists():
            return Response({"error": "User already exists"}, status=400)

        # Create the user using CustomUser
        user = CustomUser.objects.create_user(username=username, password=password)

        return Response({"message": "User created successfully"}, status=201)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if not user:
            return Response({"error": "Invalid credentials"}, status=400)

        # Generate the tokens
        refresh = RefreshToken.for_user(user)
        
        # Return both tokens and user info (e.g., username) in the response
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "username": user.username,  # Include user data like username
                # You can add more user-related data if needed
            }
        })

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({"username": user.username})
