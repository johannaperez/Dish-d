
const db = require('../../../db');
const User = db.model('user');
const Recipe = db.model('recipe');
const Ingredient = db.model('ingredient');
const UserPref = db.model('userPrefs');
const MealPlan = db.model('mealPlan');
const router = require('express').Router({mergeParams: true});
const getMeals = require('./meal-generator').getMeals;


//get a new set of random meals
router.get('', (req, res, next) => {
	let id = req.params.userId;
	// todo once user has favorites, use this as starting meal
	Recipe.randomRecipes(id, 1)
	.then(function(rec){
		return getMeals(rec[0], id);
	})
	.then(function(mealPlan){
		res.send(mealPlan);
	})
	.catch(next);
});

//create a new active meal plan for user
//req.body.mealPlan = array of recipe ids
router.post('', (req, res, next) => {
  //if the user already has a meal plan, close it
  MealPlan.findOne({
    where: {
      userId: req.params.userId,
      status: 'active'
    }
  })
  .then(function(plan){
    if (plan) {
      return plan.update({status: 'complete'})
    }
    return plan;
  })
  //create a new meal plan
  .then(function(){
    return MealPlan.create({
      status: 'active',
      meals: req.body.mealPlan
    })
  })
  .then(function(createdMealPlan){
    return createdMealPlan.setUser(req.params.userId);
  })
  .then(function(){
    res.sendStatus(201);
  })
  .catch(next);

})

module.exports = router;


