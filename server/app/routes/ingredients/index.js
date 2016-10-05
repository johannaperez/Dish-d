'use strict';

const db = require('../../../db');
const User = db.model('user');
const Ingredient = db.model('ingredient');
const router = require('express').Router();

// Mounted on /api/ingredients

// GET all API ingredients
router.get('/', (req, res, next) => {
	Ingredient.findAll()
	.then(allIng => {
		res.status(200).json(allIng);
	})
	.catch(next);
});

module.exports = router;
