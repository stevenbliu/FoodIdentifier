from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

# use 'from django.contrib.auth.mixins import LoginRequiredMixin' to authenticate
# it will class TestAPI(LoginRequiredMixin, APIView):
class TestAPI(APIView):
    """Optional view for tracking uploads (if not handled in frontend)."""
    
    def get(self, request):
        # logger.info(f"Tracking upload for photo ID: {id}")
        # Placeholder for upload tracking logic, if needed
        return Response({'message': 'API is running!'}, status=status.HTTP_200_OK)
