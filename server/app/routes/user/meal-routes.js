
const db = require('../../../db');
const User = db.model('user');
const Recipe = db.model('recipe');
const Ingredient = db.model('ingredient');
const UserPref = db.model('userPrefs');
const router = require('express').Router({mergeParams: true});
const getMeals = require('./meal-generator').getMeals;


// Edit a user's meals
// todo Create router.params with user id OR merge params in router options
router.get('', (req, res, next) => {

	let id = req.params.userId;
	// todo once user has favorites, use this as starting meal
	Recipe.randomRecipes(id, 1)
	.then(function([rec]){
		return getMeals(rec, id);
	})
	.then(function(mealPlan){
		res.send(mealPlan);
	})
	.catch(next);

});

module.exports = router; 