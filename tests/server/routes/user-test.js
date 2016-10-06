// Instantiate all models
var expect = require('chai').expect;
var Sequelize = require('sequelize');
var db = require('../../../server/db');
var supertest = require('supertest');


describe('User Route', function () {
  var app, User;

  var fakeUser = {
      email: 'tubular@tube.noob',
      password: 'n00b',
      firstName: 'Bob',
      lastName: 'HeartThrob',
  };

  // var fakeUserPref = {
  //     vegetarian: true,
  //     dislikes: ['eggs', 'soup'],
  //     userId: 1
  // };

  beforeEach('Sync DB', function () {
      return db.sync({ force: true })
  });

  beforeEach('Create app, seed User', function () {
      app = require('../../../server/app')(db);
      User = db.model('user');
  });

  describe('User preferences routes', function () {

    var guestAgent;

    beforeEach('Create fake user', function() {
      return User.create(fakeUser);
    })

    beforeEach('Create guest agent', function () {
      guestAgent = supertest.agent(app);
    });

    it('should get a 200 response with the updated preference as the body', function (done) {
      guestAgent.put('/api/users/1/preferences')
      .send({
        vegetarian: true,
        dislikes: [{name: 'eggs'}, {name: 'soup'}],
      })
      .expect(200)
      .end(function (err, response) {
        if (err) return done(err);
        expect(response.body.vegetarian).to.be.equal(true);
        expect(response.body.userId).to.be.equal(1);
        done();
      });

      // it('should get user pref information', function(done) {
      //   guestAgent.get('/api/users/1/preferences')
      //   .expect(201)
      //   .end(function(err, response) {
      //     if (err) return done(err);
      //     expect(response.body.vegetarian).to.be.equal(true);
      //     expect(response.body.dislikes).to.be.an('array');
      //   })
      // })
    });

  });
});

