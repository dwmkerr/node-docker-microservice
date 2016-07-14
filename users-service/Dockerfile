# Use Node v4 as the base image.
FROM node:4

# We work in the app folder, add everything to it.
WORKDIR /app
ADD . .

# Install dependencies
RUN npm install

# Expose our server port.
EXPOSE 8123
EXPOSE 8080

# Run our app.
CMD ["npm", "start"]
