# Dockerfile
# Use an official Node runtime as the base image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install
RUN npm install -g serve
RUN ls -la ./*
# Bundle app source by copying the "web" directory contents into the container at /app
COPY . .

RUN npm run build
# Make port 3000 available to the world outside this container (change this to your application's usual port)
EXPOSE 3000


# Run the app when the container launches
CMD [ "npm", "run", "serve" ]