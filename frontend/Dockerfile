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

# calender
RUN npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/interaction

RUN npm outdated
# RUN npm update
RUN npm dedupe
# This generates the build directory
# RUN npm run build  