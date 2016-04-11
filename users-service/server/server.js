//  server.js

var express = require('express');
var morgan = require('morgan');

var app = express();
app.use(morgan('dev'));

module.exports.start = (options) => {

  return new Promise((resolve, reject) => {

    //  Make sure we have a repository and port provided.
    if(!options.repository) throw new Error("A server must be started with a connected repository.");
    if(!options.port) throw new Error("A server must be started with a port.");

    //  Add the APIs to the app.
    require('../api/users')(app, options);

    //  Add some logging for errors.
    app.use(function(err, req, res, next) {
      console.error('An error has occured: ' + err.stack);
      res.send(500);
    });

    //  Start the app, creating a running server which we can return.
    var server = app.listen(options.port, () => {
      resolve(server);
    });

  });
};