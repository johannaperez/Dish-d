'use strict';
const convert = require('convert-units');
const Recipe = require('./recipe-model.js');
const Sequelize = require('sequelize');

const db = require('../_db');

module.exports = db.define('mealPlan', {
  status: Sequelize.ENUM('active', 'complete'),
  meals: Sequelize.ARRAY(Sequelize.INTEGER),
  groceryList: Sequelize.ARRAY(Sequelize.JSON),
},
{
	instanceMethods: {
		getGroceryList: function(){

			let groceryList = [];

			return Recipe.findAll({
				where: {
					id: this.meals  // meals will be an array of recipe ids
				}
			})
			.then(function(recipes){
				recipes.forEach(function(recipe){
					recipe.extendedIngredients.forEach(function(ingredient){
						// ingredient has: name, amount, unitShort

						// if you've never seen this ingredient before, add it to the list with the amount and unit.
						if (!groceryList[ingredient.name]){
							groceryList[ingredient.name] = {
								amount: ingredient.amount,
								unit: ingredient.unitShort
							}
						}
						// if you have seen this ingredient before, conver the unit and then add the amount;
						else {
							let unit = groceryList[ingredient.name].unit;
							let convertedAmount = convert(ingredient.amount).from(ingredient.unitShort).to(unit);

							groceryList[ingredient.name].amount += convertedAmount;
						}
					})
				})

				return groceryList;
			});
		}
	}, // end Instance Methods

	hooks: {
		afterValidate: function(mealPlan){
			console.log('RUNNING BEFORE SAVE');
			return mealPlan.getGroceryList()
			.then(function(groceryList){
				console.log(groceryList);
				mealPlan.groceryList = groceryList;
			});
		}
	}
})
