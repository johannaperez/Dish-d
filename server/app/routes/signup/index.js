'use strict';
var db = require('../../../db');
var User = db.model('user');
var router = require('express').Router();

router.post('/', function(req, res, next){
  console.log('                \n            \n         \n', req.body);
  User.create(req.body)
  .then(function(user){
    res.status(201).send({user: user.sanitize()})
  })
  .catch(next);
});

module.exports = router;
