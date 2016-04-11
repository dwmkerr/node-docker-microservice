# node-docker-mircroservice

Learn Docker by building a Microservice!

This is a companion project to my article on [dwmkerr.com](dwmkerr.com) demonstrating key concepts of Docker using a Node.js microservice as an example.

# Pre-requisites

You must have Docker installed for this code to work! Check the [Installation Guide](https://docs.docker.com/engine/installation/) if you haven't got it installed.

# Coding

To start or stop the test database, just use the commands below:

```bash
./test-database/start.sh  # starts the test database
./test-database/stop.sh   # stops the test database
```

Some commands for working with the test server:

```bash
cd ./users-service
npm install         # setup everything
npm test 			# unit test - no need for a test database running
npm start           # run the server - you must have a test database running
npm run debug       # run the server in debug mode, opens a browser with the inspector
npm run lint        # check to see if the code is beautiful
```