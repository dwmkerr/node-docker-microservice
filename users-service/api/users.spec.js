var request = require('supertest');
var should = require('should');
var server = require('../server/server');

describe('Users API', () => {

  //  Our running app (rebuilt for each test) and our repo, which
  //  we can mock for each test.
  var app = null;
  var testUsers = [{
      email: 'homer@thesimpsons.com',
      phone_number: '+1 234 5678'
    }, {
      email: 'marge@thesimpsons.com',
      phone_number: '+1 234 5679'
    }
  ];
  var testRepo = {
    getUsers: () => { 
      return Promise.resolve(testUsers);
    },
    getUserByEmail: (email) => { 
      return Promise.resolve(testUsers.find((user) => {
        return user.email === email;
      }));
    }
  };
  
  beforeEach(() => {
    return server.start({
      port: 1234,
      repository: testRepo
    }).then(function (svr) {
      app = svr;
    });
  });

  afterEach(() => {
    app.close();
    app = null;
  });

  it('can return all users', (done) => {

    request(app)
      .get('/users')
      .expect(function(res) {
        res.body.should.containEql({
          email: 'homer@thesimpsons.com',
          phoneNumber: '+1 234 5678'
        });
      res.body.should.containEql({
          email: 'marge@thesimpsons.com',
          phoneNumber: '+1 234 5679'
        });
      })
      .expect(200, done);

  });

  it('returns a 404 for an unknown user', (done) => {

    request(app)
      .get('/search?email=barnie@thegumbles.com')
      .expect(404, done);
  });

  it('returns a 200 for a known user', (done) => {

    request(app)
      .get('/search?email=homer@thesimpsons.com')
      .expect(200, done);
  });

});