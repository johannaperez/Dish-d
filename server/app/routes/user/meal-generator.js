const db = require('../../../db');
const User = db.model('user');
const Recipe = db.model('recipe');
const Ingredient = db.model('ingredient');
const UserPref = db.model('userPrefs');
const router = require('express').Router();
const Promise = require('bluebird');

// both recipe and user are sequelize instances
module.exports = {

	getMeals: function(recipe, userId){
		//get list of 10 associated meals given the first recipe
		let mealPlan = recipe.mealsWithSimilarIngredients;
		//Filter that list by user restrictions
		return UserPref.findOne(
		{
			where: {
				userId: userId
			}
		})
		.then(function(prefs){
			let mealPromises = mealPlan.map((recId) => Recipe.findById(recId));

			return Promise.all(mealPromises)
			.then(function(fullMealPlan){
				return fullMealPlan.filter(prefs.isOkayRecipe, prefs)
			})

		})
		//Fill in with random meals to get the total back up to 10
		.then(function(filteredMeals){
			let numMissing = 10 - filteredMeals.length;
			return filteredMeals.concat(Recipe.randomRecipes(userId, numMissing));
			//return filteredMeals;
		})
		.catch((error) => {
			console.log(error);
		})
		//Send back array of 10 meals
	}
}
