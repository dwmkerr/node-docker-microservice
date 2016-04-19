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

describe('users-service', () => {

  var api = supertest('http://localhost:8123');

  it('returns a 200 for a known user', (done) => {

    api.get('/search?email=homer@thesimpsons.com')
      .expect(200, done);
  });

});