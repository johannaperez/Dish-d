'use strict';
const convert = require('convert-units');
const Recipe = require('./recipe-model.js');
const Sequelize = require('sequelize');

const db = require('../_db');

module.exports = db.define('mealPlan', {
  status: Sequelize.ENUM('active', 'complete'),
  meals: Sequelize.ARRAY(Sequelize.INTEGER),
  groceryList: Sequelize.JSON
},
{
	instanceMethods: {
		getGroceryList: function(){

			let groceryList = {};

			return Recipe.findAll({
				where: {
					id: this.meals  // meals will be an array of recipe ids
				}
			})
			.then(function(recipes){
				recipes.forEach(function(recipe){
					recipe.extendedIngredients.forEach(function(ingredient){
						// ingredient has: name, amount, unitShort
						console.log(ingredient.name, ingredient.unitShort);

						// if you've never seen this ingredient before, add it to the list with the amount and unit.
						if (!groceryList[ingredient.name]){
							groceryList[ingredient.name] = {
								amount: ingredient.amount,
								unit: ingredient.unitShort,
								unitLong: ingredient.unitLong,
								section: ingredient.aisle
							}
						}
						// if you have seen this ingredient before, convert the unit and then add the amount;
						else {
							let unit = groceryList[ingredient.name].unit;
							let convertedAmount;
							try { //
								convertedAmount = convert(ingredient.amount).from(ingredient.unitShort).to(unit);
							}
							catch (error) {
								convertedAmount = ingredient.unitShort;
							}

							groceryList[ingredient.name].amount +=  convertedAmount;
						}
					})
				})

				return groceryList;
			});
		}
	}, // end Instance Methods

	hooks: {
		afterCreate: function(mealPlan){

			return mealPlan.getGroceryList()
			.then(function(groceryList){
				console.log(groceryList);
				return mealPlan.update({
					groceryList: JSON.stringify(groceryList)
				});
			});
		}
	}
})
