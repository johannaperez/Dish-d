'use strict';

const Sequelize = require('sequelize');
const db = require('../_db.js');
const Recipe = require('./recipe-model.js');

let UserPrefs = db.define('userPrefs', {
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
		return getAllOkayRecipes() => {
			Recipe.findAll({
				where: this
			})
			.then(boolRecipes => {
				let filteredRecipes = [];
				boolRecipes.forEach(recipe => {
					recipe.extendedIngredients.forEach(ingredient => {
						if (this.dislikes.includes(ingredient)) {
							break;
						}
					})
					filteredRecipes.push(recipe);
				})
				return filteredRecipes;
			})
		}
	}
});


module.exports = UserPrefs
