// const db = require('../../../db');
const Recipe = require('../../../db/models/recipe-model.js');
const router = require('express').Router();
// const Promise = require('bluebird');

// get one recipe
router.get('/:recId', (req, res, next) => {
	Recipe.findById(req.params.recId)
	.then(rec => {
		res.json(rec);
	})
	.catch(next)
});

module.exports = router;
