'use strict';

const db = require('../../../db');
const User = db.model('user');
const UserPref = db.model('userPrefs');
const router = require('express').Router();

// Mounted on /api/users

// GET all users (ADMIN)
router.get('/', (req, res, next) => {
	User.findAll()
	.then(allUsers => {
		res.status(200).json(allUsers);
	})
	.catch(next);
});

// Create new preferences
router.post('/:userId/preferences', (req, res, next) => {
	req.body.userId = req.params.userId;
	UserPref.create(req.body)
	.then(createdPref => {
		res.status(201).json(createdPref);
	})
	.catch(next);
});

// Get a particular user loaded with their preferences
router.get('/:userId/preferences', (req, res, next) => {
	UserPref.findOne({
		where: {
			userId: req.params.userId
		}
	})
	.then(foundPref => {
		res.status(200).json(foundPref);
	})
	.catch(next);
});

// Edit user preferences
router.put('/:userId/preferences', (req, res, next) => {
	UserPref.findOne({
		where: {
			userId: req.params.userId
		}
	})
	.then(foundPref => {
		return foundPref.update(req.body)	// will be on ctrl scope
	})
	.then(updatedPref => {
		res.status(200).json(updatedPref);
	})
	.catch(next);
});


module.exports = router;
