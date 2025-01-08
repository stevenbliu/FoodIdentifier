from django.test import TestCase
from .models import Photo

class PhotoModelTestCase(TestCase):

    def test_create_photo(self):
        photo = Photo.objects.create(
            filename="test_image.jpg",
            file_size=1024,
            upload_time="2025-01-01 00:00:00",
        )
        self.assertEqual(photo.filename, "test_image.jpg")
        self.assertEqual(photo.file_size, 1024)

    def test_s3_url(self):
        photo = Photo.objects.create(
            filename="test_image.jpg",
            file_size=1024,
        )
        expected_url = f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.{settings.AWS_REGION}.amazonaws.com/{photo.filename}"
        self.assertEqual(photo.s3_url(), expected_url)
