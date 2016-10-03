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
  instanceMethods: {
    getRelatedMeals: function(){
      // get ingredients
      // figure out important ingredients
      // find other recipes in which that is an important ingredient
    }
  }
});


module.exports = Recipe;
