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
	lowFodmap: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	whole30: {
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
		defaultValue: 30
	}
}, {
	// OPTIONS
	instanceMethods: {
		getAllOkayRecipes: function() {
			// capture instance properties if true
			var prefs = {};

			Object.keys(this.dataValues).forEach(key => {
				if (this[key] === true) prefs[key] = true;
			});

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
				let filteredRecipes = dislikeFilteredRecipes.filter(recp => {
					return Number(recp.readyInMinutes) <= Number(availableTime);
				});
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
            const dislikes = this.dislikes;
            const availableTime = this.availableTime;

            let approved = true;
            for (let pref in prefs){

                if (prefs[pref] !== recipe[pref] && prefs[pref]) {
                    approved = false;
                    break;
                }
                if (recipe.readyInMinutes > availableTime){
					approved = false;
					break;
                }

                let dislikeIds = dislikes.map(dislike => {
					return dislike.id;
				});

				let ingredientIds = recipe.extendedIngredients.map(ingredient => {
					return ingredient.id;
				});

				dislikeIds.forEach(function(dislikeId){
					if (ingredientIds.includes(dislikeId)){
						approved = false;
					}
				});

            }
            return approved;
        }
	}
});

module.exports = UserPref;
















