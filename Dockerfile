# Use an official Node.js runtime as a parent image
FROM node:current-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY /app /app

# Install any needed packages
RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the command to start the app
CMD ["npm", "start"]