const db = require('../../../db');
const User = db.model('user');
const Recipe = db.model('recipe');
const Ingredient = db.model('ingredient');
const UserPref = db.model('userPrefs');
const router = require('express').Router();

// both recipe and user are sequelize instances
module.exports = {

	getMeals: function(recipe, user){
		console.log('Trying to get recipes');
		//get list of 10 associated meals given the first recipe
		let mealPlan = recipe.mealsWithSimilarIngredients;
		//Filter that list by user restrictions
		return user.getuserPrefs()
		.then(function(prefs){
			return mealPlan.filter(prefs.isOkayRecipe)
		})
		//Fill in with random meals to get the total back up to 10
		.then(function(filteredMeals){
			let numMissing = 10 - filteredMeals.length;
			return filteredMeals.concat(Recipe.randomRecipes(user, numMissing));
		})
		.catch((error) => {
			console.log(error);
		})
		//Send back array of 10 meals
	}
}
