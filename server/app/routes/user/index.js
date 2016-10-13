'use strict';

const db = require('../../../db');
const User = db.model('user');
const Recipe = db.model('recipe');
const Ingredient = db.model('ingredient');
const UserPref = db.model('userPrefs');
const router = require('express').Router();
const getMeals = require('./meal-generator').getMeals;

// Mounted on /api/users

router.use('/:userId/meals', require('./meal-routes.js'));
router.use('/:userId/favorites', require('./favorite-routes.js'));

// GET all users (ADMIN)
router.get('/', (req, res, next) => {
	User.findAll()
	.then(allUsers => {
		res.status(200).json(allUsers);
	})
	.catch(next);
});

// GET one user
router.get('/:userId', (req, res, next) => {
	User.findById(req.params.userId)
	.then(foundUser => {
		if (!foundUser) res.sendStatus(404);
		else {
			res.status(200).json(foundUser);
		}
	})
	.catch(next);
});

// Get a user's preference
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

// Edit a user's preference
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
