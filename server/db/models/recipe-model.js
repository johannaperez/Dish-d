'use strict';

const Sequelize = require('sequelize');
const db = require('../_db.js');

let Recipe = db.define('recipe', {
	// SCHEMA
	apiRecipeId: {
		type: Sequelize.INTEGER
	},
	title: {
		type: Sequelize.STRING
	},
	readyInMinutes: {
		type: Sequelize.INTEGER
	},
	image: {
		type: Sequelize.STRING,
    	allowNull: false
	},
	imageType: {
		type: Sequelize.STRING
	},
	instructions: {
		type: Sequelize.TEXT,
    	allowNull: false
	},
	vegetarian: {
		type: Sequelize.BOOLEAN
	},
	vegan: {
		type: Sequelize.BOOLEAN
	},
	glutenFree: {
		type: Sequelize.BOOLEAN
	},
	dairyFree: {
		type: Sequelize.BOOLEAN
	},
	ketogenic: {
		type: Sequelize.BOOLEAN
	},
	servings: {
		type: Sequelize.INTEGER
	},
	preparationMinutes: {
		type: Sequelize.INTEGER,
    	allowNull: false
	},
	cookingMinutes: {
		type: Sequelize.INTEGER,
    	allowNull: false
	},
	sourceUrl: {
		type: Sequelize.STRING
	},
	spoonacularSourceUrl: {
		type: Sequelize.STRING
	},
	creditText: {
		type: Sequelize.STRING
	},
	sourceName: {
		type: Sequelize.STRING
	},
	// extendendedIngredients (loop), get id (in ingredient model, call apiIngId)
	extendedIngredients: {
		type: Sequelize.ARRAY(Sequelize.JSON)
	}
}, {
	// OPTIONS
  getterMethods: {

    importantIngredients: function(){
      var title = this.title;
      var ingredients = this.extendedIngredients.filter(function(ingredient){
        var name = ingredient.name;
        return title.toLowerCase().includes(name.toLowerCase());
      });

      return ingredients;
    } // END IMPORTANT

  },

  instanceMethods: {

    getRelatedMeals: function(User){
      var ingredients = this.importantIngredients;
      if (!ingredients) return [];

      return User.getAllOkayRecipes()
      .then(function(recipes) {
        recipes = recipes.filter(function(recipe){
          return compareIngredients(recipe.importantIngredients, ingredients) > 0;
        });

        return recipes;
      })
      .then(function(similarRecipes){
        return similarRecipes;
      })
      .catch(function(err){
        console.log(err);
      });

     },

      // if you have one meal, get numofMeals that have ingredients in common
      // returns recipes that have the most possible ingredients in common
    getMealsWithSimilarIngredients: function(numOfMeals){
		numOfMeals = Number(numOfMeals); // just in case...

		var recipeCount = {};
		var recipes = [];
		var promises = [];

		return this.getIngredients().
		then(function(ingredients){

		ingredients.forEach(function(ingredient){
			promises.push(ingredient.getRecipes());
		})

		return Promise.all(promises);
		})
		.then(function(allRecipes){
			// at this point you should have an array of arrays of recipes.
			// each array is the recipes for an ingredient.
			// we care about the recipes that appear the most often across the ingredients.
			allRecipes = [].concat.apply([], allRecipes);
			allRecipes.forEach(function(recipe){
				if (recipeCount[recipe.id]){
					recipeCount[recipe.id]++;
				}
				else {
					recipeCount[recipe.id] = 1;
				}
			})

			var maxMeals = 0;
			// this is the number of meals in a week so its only ever like 5
			// now we have an object of recipes. key is the recipe id and count is the number of times the recipe appears.
			// we want to loop through the object and return numOfMeals with the highest count value;
			for (var recipe in recipeCount){
				if (recipeCount[recipe] >= maxMeals){
					maxMeals = recipeCount[recipe];

					if (recipes.length < numOfMeals){
						recipes.push({recipe: recipe, count: recipeCount[recipe]});
					}
					else {
						var smallestIndex = 0;
						var smallestVal = maxMeals;

						for (var i = 0; i < recipes.length; i++){
							if (recipes[i] < smallestVal){
								smallestVal = recipes[i];
								smallestIndex = i;
							}
						}

						recipes[smallestIndex] = {recipe: recipe, count: recipeCount[recipe]};

					}
				}
			} // end looking through recipe count

			// [{id1, count1}, {id2, count2}].... reduce to[sequelize recipe 1, sequelize recipe 2...]
			recipes = recipes.map(function(recipeObj){
				var id = recipeObj.recipe;
				return Recipe.findById(id);
			})

			return Promise.all(recipes);
		});
      }
    }

});

function compareIngredients (ingredients1, ingredients2){

  let ing1 = ingredients1.map(ing => ing.id);
  let ing2 = ingredients2.map(ing => ing.id);

  let count = 0;
  for (let i = 0; i < ing1.length; i++){
    if (ing2.includes(ing1[i])) count++;
  }

  return count;
} // returns number of ingredients in common

module.exports = Recipe;
