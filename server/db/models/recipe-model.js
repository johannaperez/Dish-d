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
}

module.exports = Recipe;
