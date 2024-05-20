# Dockerfile
FROM node:latest-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./package.json .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose the port the app runs in
EXPOSE 8000

# The command to run our app
CMD [ "npm", "start" ]