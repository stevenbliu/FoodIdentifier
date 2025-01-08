from rest_framework.exceptions import ValidationError
from django.test import TestCase
from .models import Photo
from .serializers import PhotoSerializer

class PhotoSerializerTestCase(TestCase):

    def test_valid_serializer(self):
        data = {
            "filename": "test_image.jpg",
            "file_size": 1024,
        }
        serializer = PhotoSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        photo = serializer.save()
        self.assertEqual(photo.filename, "test_image.jpg")
        self.assertEqual(photo.file_size, 1024)

    def test_invalid_serializer(self):
        data = {
            "filename": "",
            "file_size": -1024,  # Invalid file size
        }
        serializer = PhotoSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('filename', serializer.errors)
        self.assertIn('file_size', serializer.errors)

    def test_serializer_creation(self):
        photo = Photo.objects.create(filename="test_image.jpg", file_size=1024)
        serializer = PhotoSerializer(photo)
        self.assertEqual(serializer.data['filename'], "test_image.jpg")
        self.assertEqual(serializer.data['file_size'], 1024)
