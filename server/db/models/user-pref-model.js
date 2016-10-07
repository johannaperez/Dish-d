// 'use strict';

const Sequelize = require('sequelize');
const db = require('../_db.js');
const Recipe = require('./recipe-model.js');

let UserPref = db.define('userPrefs', {
	// SCHEMA
	vegetarian: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	vegan: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	glutenFree: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	dairyFree: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	dislikes: {
		type: Sequelize.ARRAY(Sequelize.JSON),
		defaultValue: []
	},
	numPeople: {
		type: Sequelize.INTEGER,
		defaultValue: 1
	},
	availableTime: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}
}, {
	// OPTIONS
	instanceMethods: {
		getAllOkayRecipes: function() {
			// capture instance properties
            var prefs = {
                vegetarian: this.vegetarian,
                vegan: this.vegan,
                glutenFree: this.glutenFree,
                dairyFree: this.dairyFree
            };
            var dislikes = this.dislikes;
            var availableTime = this.availableTime;

            // filter by dietary preferences
			return Recipe.findAll({
                where: prefs
            })
            // filter out recipes with disliked ingredients
			.then(boolRecipes => {
				let dislikeFilteredRecipes = [];
				let dislikeNames = dislikes.map(dislike => {
					return dislike.name;
				});
				boolRecipes.forEach(recipe => {
					recipe.extendedIngredients.forEach(ingredient => {
						if (!dislikeNames.includes(ingredient.name)) {
							dislikeFilteredRecipes.push(recipe);
						}
					})
				});
				// filter by available time
				let filteredRecipes = dislikeFilteredRecipes.filter(recipe => {
					return recipe.readyInMinutes <= availableTime;
				});
				return filteredRecipes;
			})
		}
	}
});

module.exports = UserPref;
















