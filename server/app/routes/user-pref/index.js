'use strict';

const db = require('../../../db');
const User = db.model('user');
const UserPref = db.model('userPref');
const router = require('express').Router();

// Mounted on /api/preferences

// Create new preferences
router.post('/:userId', (req, res, next) => {
	
});

// Get a particular user's preferences
router.get('/:userId', (req, res, next) => {
	User.findById(req.params.userId, {
		include: [UserPref]
	})
	// .then(foundUser => {
	// 	UserPref.findById(foundUser.userPrefId)
	// 	.then(prefs => {
	// 		res.json(prefs);
	// 	})
	// })
	.catch(next);
});

// Edit preferences (POST or PUT???)
router.put('/:userId', (req, res, next) => {

});


module.exports = router;
