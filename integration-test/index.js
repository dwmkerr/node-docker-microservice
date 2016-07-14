//  index.js
//
//  Entrypoint for the 'node-docker-microservice' integration tests.
//  Note that due to:
//
//  https://github.com/visionmedia/supertest/issues/314
//  
//  If the service isn't running, you'll get failures like:
//
//  Cannot read property 'status' of undefined
//
//  For test failures.
var supertest = require('supertest');
var should = require('should');

//  Get the host for the users service.
var usersServiceHost = process.env.USERS_SERVICE_HOST || "localhost";

describe('users-service', () => {

  var api = supertest(`http://${usersServiceHost}:8123`);

  it('returns a 200 for a known user', (done) => {

    api.get('/search?email=homer@thesimpsons.com')
      .expect(200, done);

  });
  
  it('returns a 200 for another known user', (done) => {

    api.get('/search?email=grandpa@thesimpsons.com')
      .expect(200, done);

  });

  it('returns a 404 for an unknown user', (done) => {

    api.get('/search?email=bender@futurama.com')
      .expect(404, done);

  })

});
