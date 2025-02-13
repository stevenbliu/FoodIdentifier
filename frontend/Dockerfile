# FROM node:16
FROM node:20

# Set the working directory inside the container to /app (which will be mapped to ./frontend on your host)
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install necessary dependencies and utilities
RUN apt-get update && apt-get install -y jq

# Install npm dependencies inside /app (which corresponds to ./frontend on your host)
RUN npm install -g npm-check-updates

# Update dependencies using npm-check-updates
RUN ncu -u

# Install Tailwind CSS dependencies
# RUN npm install -D tailwindcss postcss autoprefixer
# @tailwindcss/vite

# Install bootstrap
RUN npm install bootstrap

# Install required npm packages for the frontend
RUN npm install react-router-dom @fullcalendar/react @fullcalendar/daygrid @fullcalendar/interaction 

RUN npm i @chakra-ui/react@2 @emotion/react @emotion/styled framer-motion @chakra-ui/icons   


# Ensure tailwindcss is installed and use npx to initialize the config
# RUN npx tailwindcss init

# Optional: Run build if needed (you can uncomment this if required)
# RUN npm run build
