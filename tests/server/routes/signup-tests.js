// Instantiate all models
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var supertest = require('supertest');

xdescribe('Signup Route', function () {

    var app, User;

    beforeEach('Sync DB', function () {
        return db.sync();
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        User = db.model('user');
    });

  describe('Signup route', function () {

    var guestAgent;

    beforeEach('Create guest agent', function () {
      guestAgent = supertest.agent(app);
    });

    it('should get a 201 response with the new user as the body', function (done) {
      guestAgent.post('/api/signup/').send({email: 'minerva@hogwarts.com', password: '123'})
        .expect(201)
        .end(function (err, response) {
        if (err) return done(err);
          expect(response.body.user.email).to.be.equal('minerva@hogwarts.com');
          done();
      });
    });

  });
});

