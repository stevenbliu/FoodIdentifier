from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

# use 'from django.contrib.auth.mixins import LoginRequiredMixin' to authenticate
# it will class TestAPI(LoginRequiredMixin, APIView):
class TestAPI(APIView):
    """Optional view for tracking uploads (if not handled in frontend)."""
    permission_classes = [AllowAny]  # Allow any user to access this API
    
    def get(self, request):
        # logger.info(f"Tracking upload for photo ID: {id}")
        # Placeholder for upload tracking logic, if needed
        return Response({'message': 'API is running!'}, status=status.HTTP_200_OK)
