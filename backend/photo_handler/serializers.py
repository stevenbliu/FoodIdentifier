from rest_framework import serializers
from .models import Photo

class PhotoSerializer(serializers.ModelSerializer):
    # file = serializers.FileField()  # Explicitly define the file field here

    
    class Meta:
        model = Photo
        # fields = ['id', 'filename', 'file_size', 'upload_time', 'food_name', 'file_type']
        fields = '__all__'
        
    def validate_file(self, value):
        MAX_FILE_SIZE = 10 * 1024 * 1024  # 5 MB in bytes
        # Check if the file size is within the allowed limit
        if value.size > MAX_FILE_SIZE:
            raise serializers.ValidationError('File size exceeds the maximum allowed size')
        return value