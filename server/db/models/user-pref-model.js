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
			.then(boolRecipes => {
				let filteredRecipes = [];
				let dislikeNames = dislikes.map(dislike => {
					return dislike.name;
				})
				boolRecipes.forEach(recipe => {
					recipe.extendedIngredients.forEach(ingredient => {
						if (!dislikeNames.includes(ingredient.name)) {
							filteredRecipes.push(recipe);
						}
					})
				})
				return filteredRecipes;
			})
		},
        isOkayRecipe: function (recipe) {
        	const prefs = {
                vegetarian: this.vegetarian,
                vegan: this.vegan,
                glutenFree: this.glutenFree,
                dairyFree: this.dairyFree
            }
            
            let approved = true;
            for (let pref in prefs){
                if (prefs[pref] !== recipe[pref]) {
                    approved = false;
                    break;
                }
            }
            return approved;
        }
	}
});

module.exports = UserPref;
