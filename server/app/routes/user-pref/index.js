'use strict';

const db = require('../../../db');
const User = db.model('user');
const UserPref = db.model('userPref');
const router = require('express').Router();

// Mounted on /api/preferences

// Create new preferences
router.post('/:userId', (req, res, next) => {
	UserPref.create(req.body)
	.then(createdPref => {
		User.setUserPref(createdPref.id)
		.then(user => {
			res.json(user)	// change this to redirect??
		})
	})
	.catch(next);
});

// Get a particular user's preferences
router.get('/:userId', (req, res, next) => {
	User.findById(req.params.userId, {
		include: [ UserPref ]
	})
	.then(pref => {
		res.status(200).json(pref);
	})
	.catch(next);
});

// Edit preferences (POST or PUT???)
// router.put('/:userId', (req, res, next) => {

// });


module.exports = router;
