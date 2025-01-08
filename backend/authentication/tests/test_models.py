from django.test import TestCase
from django.contrib.auth import get_user_model
from django.db import IntegrityError

from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Access the variables
test_username = os.getenv('TEST_USER_USERNAME')
test_password = os.getenv('TEST_USER_PASSWORD')
test_admin_username = os.getenv('TEST_ADMIN_USERNAME')
test_admin_password = os.getenv('TEST_ADMIN_PASSWORD')
class CustomUserTestCase(TestCase):
    
    def test_create_user_with_valid_data(self):
        # pragma: allowlist secret
        user = get_user_model().objects.create_user(username=test_username, password=test_password)

        self.assertEqual(user.username, test_username)
        self.assertTrue(user.check_password(test_password))
        self.assertIsNone(user.phone_number)
        # self.assertIsNone(user.profile_picture)

    def test_create_user_with_phone_number(self):
        user = get_user_model().objects.create_user(
            username=test_username, password=test_password, phone_number="1234567890"
        )
        self.assertEqual(user.phone_number, "1234567890")

    def test_create_user_with_profile_picture(self):
        user = get_user_model().objects.create_user(
            username=test_username, password=test_password, profile_picture=None
        )
        self.assertIsNone(user.profile_picture)

    def test_create_user_without_username(self):
        with self.assertRaises(ValueError) as context:
            get_user_model().objects.create_user(username=None, password=test_password)
        self.assertEqual(str(context.exception), "The given username must be set")

    def test_create_superuser(self):
        # pragma: allowlist secret
        superuser = get_user_model().objects.create_superuser(username=test_admin_username, password=test_admin_password) 

        self.assertEqual(superuser.username, test_admin_username)
        self.assertTrue(superuser.is_superuser)
        self.assertTrue(superuser.is_staff)
