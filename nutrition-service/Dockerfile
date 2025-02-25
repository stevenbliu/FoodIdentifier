# Step 1: Use the official Golang image to build the service
FROM golang:latest AS builder

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the Go files into the container
COPY . .



# Step 4: Install dependencies and build the Go binary
RUN go mod tidy
# RUN go build -o nutrition-service .
RUN GOOS=linux GOARCH=amd64 go build -o nutrition-service .

# Step 5: Use a smaller base image to reduce the final image size
FROM golang:latest

# Step 6: Set the working directory in the container
WORKDIR /root/
COPY templates/ /root/templates/

# Step 7: Copy the built Go binary from the builder stage
COPY --from=builder /app/nutrition-service .
# RUN ls -al /app

RUN chmod +x /root/nutrition-service

# Step 8: Expose the port the app will run on
EXPOSE 8080

# Step 9: Command to run the service when the container starts
CMD ["./nutrition-service"]
