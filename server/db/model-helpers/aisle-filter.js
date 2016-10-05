'use strict';

const data = require('../../db-setup/api-responses.json');

let aisles = [];

data.recipes.forEach(recipe => {
	recipe.extendedIngredients.forEach(ingredient => {
		if (aisles.indexOf(ingredient.aisle) === -1) {
			aisles.push(ingredient.aisle);
		}
	});
});

console.log(aisles);

module.exports = aisles;


/*let results = [ 'Produce',
  'Frozen',
  'Beverages',
  'Milk, Eggs, Other Dairy',
  'Bakery/Bread',
  'Spices and Seasonings',
  'Health Foods',
  'Savory Snacks',
  'Baking',
  'Meat',
  'Oil, Vinegar, Salad Dressing',
  'Canned and Jarred',
  'Ethnic Foods',
  'Pasta and Rice',
  'Condiments',
  'Cereal',
  'Sweet Snacks',
  'Tea and Coffee',
  'Gourmet',
  'Cheese',
  'Nuts',
  'Alcoholic Beverages',
  'Nut butters, Jams, and Honey',
  'Seafood',
  'Dried Fruits',
  '?',
  'Refrigerated',
  'Gluten Free' ]*/