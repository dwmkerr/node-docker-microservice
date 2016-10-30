# Use Node v4 as the base image.
FROM node:4

# Add our user and group first to make sure their IDs get assigned consistently
RUN groupadd -r app && useradd -r -g app app 

# To reduce the build time during development we ensure non-changing layers comes first
#Creating a workdirectory
WORKDIR /app

# Expose our server port.
EXPOSE 8123

# Set the default command to run when a container starts
CMD ["npm", "start"]

# Install app dependencies
COPY package.json /app
RUN npm install --production

# Using the recommended COPY command instead of ADD. COPY everything
# in the current directory to our image, in the 'app' folder.
COPY . /app