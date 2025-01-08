from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
import os
from dotenv import load_dotenv
load_dotenv()

TEST_PASSWORD = os.getenv("TEST_PASSWORD")
TEST_USERNAME = os.getenv("TEST_USERNAME")

class AuthenticationViewsTestCase(APITestCase):
    
    def setUp(self):
        self.user_data = {
            'username': TEST_USERNAME,
            'password': TEST_PASSWORD
        }
        self.user = get_user_model().objects.create_user(**self.user_data)

    def test_register_user(self):
        url = reverse('register')  # Assuming your RegisterView is named 'register'
        data = {
            'username': 'new' + TEST_USERNAME,
            'password': TEST_PASSWORD,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'User created successfully')

    def test_register_user_with_missing_fields(self):
        url = reverse('register')
        response = self.client.post(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Username and password must be provided.", response.data['error'])

    def test_register_existing_user(self):
        url = reverse('register')
        data = {
            'username': self.user_data['username'],
            'password': self.user_data['password']
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'User already exists')

    def test_login_user(self):
        url = reverse('login')  # Assuming your LoginView is named 'login'
        data = {
            'username': self.user_data['username'],
            'password': self.user_data['password'],
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('refresh', response.data)
        self.assertIn('access', response.data)
        self.assertEqual(response.data['user']['username'], self.user_data['username'])

    def test_login_user_with_invalid_credentials(self):
        url = reverse('login')


        data = {
            'username': 'wrong' + TEST_USERNAME,
            'password': 'wrong' + TEST_PASSWORD # pragma: allowlist secret

        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Invalid credentials')

    def test_user_profile_authenticated(self):
        url = reverse('profile')  # Assuming your UserProfileView is named 'profile'
        # First, we need to log in and get a token
        data = {
            'username': self.user_data['username'],
            'password': self.user_data['password'],
        }
        login_response = self.client.post(reverse('login'), data, format='json')
        access_token = login_response.data['access']
        
        # Now, we request the user profile with the access token
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], self.user_data['username'])

    def test_user_profile_unauthenticated(self):
        url = reverse('profile')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
