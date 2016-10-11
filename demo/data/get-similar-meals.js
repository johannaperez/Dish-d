'use strict';

const fs = require('fs');
const Promise = require('bluebird');
const Recipe = require('../../../../server/db/models/recipe-model.js');

Recipe.findById(76)		// [76, 50, 155, 172, 145, 24]
.then(recipe => {
	fs.writeFileSync('./starter-recipe.json', JSON.stringify(recipe));
	let promises = [];
	recipe.mealsWithSimilarIngredients.forEach(mealId => {
		promises.push(Recipe.findById(mealId))
	})
	Promise.all(promises)
	.then(mealArr => {
		fs.writeFileSync('./similar-recipes.json', JSON.stringify(mealArr));
	})
});

// 76: baked falafel burger