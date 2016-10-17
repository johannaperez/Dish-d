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


/*let results = [ 'Produce',    // fruit/veg
  'Frozen',
  'Beverages',
  'Milk, Eggs, Other Dairy',    // eggs and dairy
  'Bakery/Bread',               // carbs
  'Spices and Seasonings',
  'Health Foods',
  'Savory Snacks',
  'Baking',                     // sweets/carbs
  'Meat',                       // meat, beans, nuts
  'Oil, Vinegar, Salad Dressing', // fats, oils, sweets
  'Canned and Jarred',          // if contains chickpeas, beans, etc FIX THIS!
  'Ethnic Foods',
  'Pasta and Rice',             // carbs
  'Condiments',
  'Cereal',                     // carbs
  'Sweet Snacks',               // fats, oils, sweets
  'Tea and Coffee',
  'Gourmet',
  'Cheese',                     // eggs and dairy
  'Nuts',                       // meat, beans, nuts
  'Alcoholic Beverages',
  'Nut butters, Jams, and Honey', // sweets OR nuts?? FIX THIS
  'Seafood',                    // meat, beans, nuts
  'Dried Fruits',               // fruit/veg
  '?',
  'Refrigerated',
  'Gluten Free' ]*/