'use strict';

const fs = require('fs');
const starterMeal = require('./starter-recipe.json');	// obj
const similarMeals = require('./similar-recipes.json');

let mealplan = [];
let selectMealIds = [166, 37]

mealplan.push(starterMeal);

similarMeals.forEach(meal => {
	if (selectMealIds.includes(meal.id)) {
		mealplan.push(meal);
	}
})

fs.writeFileSync('./mealplan.json', JSON.stringify(mealplan));
