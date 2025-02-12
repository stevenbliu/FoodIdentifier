import os
# import django
import psycopg2
# from django.conf import settings

# # Set up Django settings (if not done already)
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
# django.setup()

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Get environment variables
db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_name = os.getenv('DB_NAME')

# Connect to your PostgreSQL database with superuser privileges
connection = psycopg2.connect(
    dbname='postgres',  # Default database to connect for operations
    user='postgres',    # Or your DB superuser
    password=os.getenv('POSTGRES_PASSWORD')  # Superuser password (if needed)
)

# Create a cursor object to execute SQL commands
cursor = connection.cursor()

# Define the SQL script with environment variables
sql_script = f"""
-- Create the user if it doesn't exist
DO
$$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = '{db_user}') THEN
      CREATE USER "{db_user}" WITH PASSWORD '{db_password}';
   END IF;
END
$$;

-- Create the database if it doesn't exist
DO
$$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = '{db_name}') THEN
      CREATE DATABASE {db_name};
   END IF;
END
$$;

-- Grant privileges to the user on the database
GRANT ALL PRIVILEGES ON DATABASE {db_name} TO "{db_user}";
"""

# Execute the SQL script
cursor.execute(sql_script)
connection.commit()

# Close the cursor and the connection
cursor.close()
connection.close()
