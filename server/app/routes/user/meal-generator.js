const db = require('../../../db');
const Recipe = db.model('recipe');
const UserPref = db.model('userPrefs');
const Promise = require('bluebird');

// both recipe and user are sequelize instances
module.exports = {
//maybe this is a user prefs instance method??
	getMeals: function(recipe, userId){
		//get list of 10 associated meals given the first recipe
		let mealPlan = recipe.mealsWithSimilarIngredients || [recipe.id];
		//Filter that list by user restrictions
		return UserPref.findOne({
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

			return Recipe.randomRecipes(userId, numMissing)
			.then(function(newRecipes){
				return filteredMeals.concat(newRecipes);
			})
			//return filteredMeals;
		})
		.catch((error) => {
			console.log(error);
		})
		//Send back array of 10 meals
	}
}
