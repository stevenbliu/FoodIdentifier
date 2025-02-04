"""
Django settings for food_identifier project.

Generated by 'django-admin startproject' using Django 5.1.3.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from pathlib import Path
import os
import logging

logger = logging.getLogger(__name__)

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DEVELOPER_ENV') == '1'

# Now you can use these variables
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_REGION = os.getenv('AWS_REGION')
AWS_STORAGE_BUCKET_NAME = os.getenv('AWS_STORAGE_BUCKET_NAME')
AWS_SNS_S3_OBJECT_PUT_NOTIFS = os.getenv('AWS_SNS_S3_OBJECT_PUT_NOTIFS')

if DEBUG: # DEBUG ENV
    DB_PASSWORD = os.getenv('DB_PASSWORD')
    DB_USER = os.getenv('DB_USER')
    DB_NAME = os.getenv('DB_NAME')
    SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')
    DB_HOST = os.getenv('DB_HOST')
    DB_PORT = os.getenv('DB_PORT')

    # STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    # DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

    PUBLIC_URL = os.getenv('REACT_APP_NGROK_PUBLIC_URL')
    PUBLIC_URL = PUBLIC_URL.split("//")[1]
    
    BACKEND_URL = os.getenv('PROD_BACKEND_URL')
    FRONTEND_URL = os.getenv('PROD_FRONTEND_URL')
else: # PRODUCTION ENV
    DB_PASSWORD = os.getenv('RDS_PASSWORD')
    DB_USER = os.getenv('RDS_USER')
    DB_NAME = os.getenv('RDS_DB_NAME')
    SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')
    DB_HOST = os.getenv('RDS_HOST')
    DB_PORT = os.getenv('RDS_PORT')

    STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

    PUBLIC_URL = os.getenv('BEANSTALK_PUBLIC_URL')
    
    BACKEND_URL = os.getenv('PROD_BACKEND_URL')
    FRONTEND_URL = os.getenv('PROD_FRONTEND_URL')


logger.info(f"NGROK_PUBLIC_URL: {PUBLIC_URL}")
logger.info(f"DEVELOPER_ENV: {DEBUG}")

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!





# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    'corsheaders',
    'photo_handler',
    'photo_identifier',
    'rest_framework',
    'rest_framework_simplejwt',
    'authentication',
    # 'storages'
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',  # Add JWT Authentication
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',  # Optional: Define default permission class
    ],
    'DEFAULT_THROTTLE_CLASSES': [
    'rest_framework.throttling.UserRateThrottle',  # Per user rate limit
    'rest_framework.throttling.AnonRateThrottle',  # Correct name
    ],
    # 'DEFAULT_THROTTLE_RATES': {
    #     'user': '5/hour',  # 5 requests per hour for authenticated users
    #     'anon': '2/hour',  # 2 requests per hour for anonymous users
    # },
}

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',  # make sure this is below CorsMiddleware
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React dev server
    "https://" + PUBLIC_URL,
    "http://backend:8000",
    "http://host.docker.internal:3000",  # Your frontend URL

]

CORS_ALLOW_METHODS = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'OPTIONS',
]

CORS_ORIGIN_WHITELIST = [
    'https://example.com',
]

from corsheaders.defaults import default_headers

CORS_ALLOW_HEADERS = default_headers + (
    'ngrok-skip-browser-warning',  # Allow the ngrok specific header if needed
)

ROOT_URLCONF = "food_identifier.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            # os.path.join(BASE_DIR, 'food_photo_service\photo\templates'),
            os.path.join(BASE_DIR, 'photo_handler'),
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "food_identifier.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': DB_NAME,
        'USER': DB_USER,
        'PASSWORD': DB_PASSWORD,
        'HOST': DB_HOST,
        'PORT': DB_PORT,
    }
}



# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",},
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# from django.conf import settings
# print("TEMPLATE LOADERS:", settings.TEMPLATES[0]['DIRS'])


# NGROK_PUBLIC_URL.split("//")[1]

ALLOWED_HOSTS = [PUBLIC_URL, 'localhost', '127.0.0.1', "backend", '.elasticbeanstalk.com']
AUTH_USER_MODEL = 'authentication.CustomUser'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
        },
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'django_debug.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': True,
        },
        'django.db.backend': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': True,
        },
        'photo_handler': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}


from datetime import timedelta
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),  # Access token expiry time
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),  # Refresh token expiry time
    'ROTATE_REFRESH_TOKENS': False,  # Whether to rotate refresh tokens after each use
    'BLACKLIST_AFTER_ROTATION': False,  # Optionally, blacklist tokens after rotation
    'ALGORITHM': 'HS256',  # You can change this to another algorithm if needed
    'SIGNING_KEY': SECRET_KEY,  # Replace with your actual secret key
    'AUDIENCE': None,
    'ISSUER': None,
}

