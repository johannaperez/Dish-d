// Instantiate all models
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');
var Recipe = db.model('recipe'); 

var supertest = require('supertest');

describe('Meal Plan Route', function () {

    var app, User;

    beforeEach('Sync DB', function () {
        return db.sync();
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        User = db.model('user');
    });

  describe('get meal plan route', function () {

    var guestAgent;

    beforeEach('Create guest agent', function () {
      guestAgent = supertest.agent(app);
    });

    it('should get an array of 10 recipes as a response', function (done) {
      guestAgent.get('/api/users/1/meals')
        .expect(200)
        .end(function (err, response) {
        if (err) return done(err);
          expect(response.body).to.be.an('array');
          expect(response.body).to.have.length(10);
          done();
      });
    });

  });
});
