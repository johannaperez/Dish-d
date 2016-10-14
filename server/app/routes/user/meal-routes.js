
const db = require('../../../db');
const Recipe = db.model('recipe');
const User = db.model('user');
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
    // the user already has a meal plan, so serve that up.
    if (plan) {
      let planPromises = plan.meals.map(recId => Recipe.findById(recId));
      Promise.all(planPromises)
      .then(meals => {
        res.send([meals, plan])
      })
      .catch(next);
    }  // the user doesn't have a meal plan currently
    else {

      User.findById(id)
      .then(function(user){
        return user.getRecipes(); // get all the user's favorite recipes
      })
      .then(function(recipes){

        // if they have favorite recipes potentionally use those to seed.
        if (recipes.length && Math.random() > 0.5){
          let length = recipes.length;
          let random = Math.floor(Math.random() * length);
          return recipes[random];
        }
        else { // seed with a random recipe, not a favorite
          return Recipe.randomRecipes(id, 1);
        }

      })
      .then(function(rec){
        if (Array.isArray(rec)) rec = rec[0];
        return getMeals(rec, id);
      })
      .then(function(mealPlan){
        res.send(mealPlan);
      })
      .catch(next);
    }
  })
});

// add price for a particular meal plan
router.put('/:mealPlanId', (req, res, next) => {
  MealPlan.findById(req.params.mealPlanId)
  .then(mealPlan => {
    return mealPlan.update({
      price: req.body.price
    })
    .then(updatedPlan => {
      res.json(updatedPlan);
    })
  })
  .catch(next);
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
      return User.findById(id)
      .then(function(user){
        return user.getRecipes();
      })
      .then(function(recipes){

        if (recipes.length && Math.random() > 0.5){
          let length = recipes.length;
          let random = Math.floor(Math.random() * length);
          return recipes[random];
        }
        else {
          return Recipe.randomRecipes(id, 1);
        }
      })
    })
    .then(function(rec){
        if (Array.isArray(rec)) rec = rec[0];
        return getMeals(rec, id);
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

router.get('/all', (req, res, next) => {

  Recipe.findAll()
  .then(function(recipes){
    res.send(recipes);
  })
  .catch(next);
})

module.exports = router;
