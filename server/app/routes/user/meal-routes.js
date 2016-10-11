
const db = require('../../../db');
const Recipe = db.model('recipe');
const MealPlan = db.model('mealPlan');
const router = require('express').Router({mergeParams: true});
const getMeals = require('./meal-generator').getMeals;
const Promise = require('bluebird');


//get existing active plan or a new set of random meals if none exists
router.get('', (req, res, next) => {
	let id = req.params.userId;

  MealPlan.findOne({
    where: {
      userId: id,
      status: 'active'
    }
  })
  .then(function(plan){
    if (plan) {
      let planPromises = plan.meals.map(recId => Recipe.findById(recId));
      Promise.all(planPromises)
      .then(meals => {
        res.send(meals)
      })
      .catch(next);
    } else {
      // todo once user has favorites, use this as starting meal
      Recipe.randomRecipes(id, 1)
      .then(function(rec){
        return getMeals(rec[0], id);
      })
      .then(function(mealPlan){
        res.send(mealPlan);
      })
      .catch(next);
    }
  })
});

//mark existing plan as completed and get a fresh meal plan
router.put('', (req, res, next) => {

  let id = req.params.userId;

   MealPlan.findOne({
      where: {
        userId: id,
        status: 'active'
      }
    })
    .then(function(plan){
      if (plan) {
        return plan.update({status: 'complete'})
      }
      return plan;
    })
    .then(function(){
      return Recipe.randomRecipes(id, 1)
    })
    .then(function(rec){
        return getMeals(rec[0], id);
    })
    .then(function(mealPlan){
        res.send(mealPlan);
    })
    .catch(next);
})

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

//create a new active meal plan for user
//req.body.mealPlan = array of recipe ids
router.get('/grocerylist', (req, res, next) => {
  //if the user already has a meal plan, close it
  MealPlan.findOne({
    where: {
      userId: req.params.userId,
      status: 'active'
    }
  })
  .then(function(plan){
    res.send(plan.groceryList);
  })
  .catch(next);

})

module.exports = router;
