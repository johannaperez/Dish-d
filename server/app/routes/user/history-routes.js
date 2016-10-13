const db = require('../../../db');
const MealPlan = db.model('mealPlan');
const User = db.model('user');
const router = require('express').Router({mergeParams: true});
const Promise = require('bluebird');


router.get('', (req, res, next) => {

	let id = req.params.userId;

	MealPlan.findAll({
		where: {
			userId: id,
			status: 'complete'
		}
	})
	.then(function(mealPlans){
		res.send(mealPlans);
	})
	.catch(next);

});

module.exports = router;
