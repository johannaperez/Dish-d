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
		type: Sequelize.ARRAY(Sequelize.STRING)
	}
}, {
	// OPTIONS
	instanceMethods: {
		getAllOkayRecipes: function() {
            var dislikes = this.dislikes;
            var prefs = {
                vegetarian: this.vegetarian,
                vegan: this.vegan,
                glutenFree: this.glutenFree,
                dairyFree: this.dairyFree
            }
			return Recipe.findAll({
                where: prefs
            })
			.then(function (boolRecipes) {
				let filteredRecipes = [];
				boolRecipes.forEach(function(recipe) {
					recipe.extendedIngredients.forEach(function(ingredient) {
						if (!dislikes.includes(ingredient.name)) {
							filteredRecipes.push(recipe);
						}
					})
				})
				return filteredRecipes;
			})
		}
	}
});


module.exports = UserPref;
