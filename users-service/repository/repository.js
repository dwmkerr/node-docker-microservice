//  repository.js
//
//  Exposes a single function - 'connect', which returns
//  a connected repository. Call 'disconnect' on this object when you're done.
'use strict';

var mysql = require('mysql');

//  Class which holds an open connection to a repository
//  and exposes some simple functions for accessing data.
class Repository {
  constructor(connectionSettings) {
    this.connectionSettings = connectionSettings;
    this.connection = mysql.createConnection(this.connectionSettings);
  }

  getUsers() {
    return new Promise((resolve, reject) => {

      this.connection.query('SELECT email, phone_number FROM directory', (err, results) => {
        if(err) {
          this.connection = mysql.createConnection(this.connectionSettings);
          return reject(new Error('An error occured getting the users: ' + err));
        }

        resolve((results || []).map((user) => {
          return {
            email: user.email,
            phone_number: user.phone_number
          };
        }));
      });

    });
  }

  getUserByEmail(email) {

    return new Promise((resolve, reject) => {

      //  Fetch the customer.
      this.connection.query('SELECT email, phone_number FROM directory WHERE email = ?', [email], (err, results) => {

        if(err) {
          return reject(new Error('An error occured getting the user: ' + err));
        }

        if(results.length === 0) {
          resolve(undefined);
        } else {
          resolve({
            email: results[0].email,
            phone_number: results[0].phone_number
          });
        }

      });

    });
  }

  disconnect() {
    this.connection.end();
  }
}

//  One and only exported function, returns a connected repo.
module.exports.connect = (connectionSettings) => {
  return new Promise((resolve, reject) => {
    if(!connectionSettings.host) throw new Error("A host must be specified.");
    if(!connectionSettings.user) throw new Error("A user must be specified.");
    if(!connectionSettings.password) throw new Error("A password must be specified.");
    if(!connectionSettings.port) throw new Error("A port must be specified.");

    resolve(new Repository(connectionSettings));
  });
};
