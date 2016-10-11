'use strict';

const fs = require('fs');
const mealPlan = require('./mealplan.json');


// organize by sunburst parent categories (pyramid)
let rawSunData = {
	dairy: [],
	'meat, beans, nuts, eggs': [],
	'fats, oils, sweets': [],
	vegetables: [],
	fruits: [],
	carbs: []
}

mealPlan.forEach(recipe => {
	recipe.extendedIngredients.forEach(ing => {
		if (ing.pyramidCat) {
			rawSunData[ing.pyramidCat].push({
				name: ing.name,
				amount: ing.amount,
				unit: ing.unit
			})
		}
	})
})

fs.writeFileSync('./sunburst-cats.json', JSON.stringify(rawSunData));


// organize by ingredient name (common ingredients combined)
let rawData = {};

mealPlan.forEach(recipe => {
	recipe.extendedIngredients.forEach(ing => {
		if (ing.pyramidCat) {
			if (rawData[ing.name] && ing.unit === rawData[ing.name].unit) {
				rawData[ing.name].amount += ing.amount
			}
			else {
				rawData[ing.name] = {
					category: ing.pyramidCat,
					amount: ing.amount,
					unit: ing.unit
				}
			}
		}
	})
});

fs.writeFileSync('./categories.json', JSON.stringify(rawData));
