FROM node:16

# Set the working directory inside the container to /app (which will be mapped to ./frontend on your host)
WORKDIR /app

COPY . .

# Install necessary dependencies and utilities
RUN apt-get update
RUN apt-get install -y jq

# Install npm dependencies inside /app (which corresponds to ./frontend on your host)
RUN npm install -g npm-check-updates
RUN ncu -u
RUN npm install react-router-dom

RUN npm outdated
# RUN npm update
RUN npm dedupe
# This generates the build directory
# RUN npm run build  

# Copy the build files from the build-stage to a shared volume
# Nginx will serve the app
# COPY --from=build-stage /app/build /usr/share/nginx/html  

# Expose port 80 for Nginx to serve the app
# EXPOSE 80

#--prefix ./frontend
# RUN sed -i 's/\r//' ngrok_url_fetcher.sh
# RUN cat -v ngrok_url_fetcher.sh

# Make scripts executable
# RUN chmod +x ./ngrok_url_fetcher.sh

# Expose the necessary port
# EXPOSE 3000
# Set the command to run on container start
# CMD ["sh", "-c", "./app/ngrok_url_fetcher.sh && npm start --prefix ./app"]