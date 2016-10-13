const db = require('../../../db');
const MealPlan = db.model('mealPlan');
const User = db.model('user');
const Recipe = db.model('recipe');
const router = require('express').Router({mergeParams: true});
const Promise = require('bluebird');

// get none-detail history.
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

// get details of one meal plan.
router.get('/:mealPlanId', (req, res, next) => {

	let id = req.params.userId;
	let mealPlanId = req.params.mealPlanId;

	MealPlan.findOne({
		where: {
			userId: id,
			id: mealPlanId,
			status: 'complete'
		}
	})
	.then(function(mealPlan){
		return Recipe.findAll({
			where: {
				id: mealPlan.meals
			}
		})
	})
	.then(function(meals){
		res.send(meals);
	})
	.catch(next);

});

module.exports = router;
