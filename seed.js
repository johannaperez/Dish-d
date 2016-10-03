'use strict';

const chalk = require('chalk');
const Promise = require('bluebird');

const db = require('./server/db/index.js');
const Recipe = require('./server/db/models/recipe-model.js');
const Ingredient = require('./server/db/models/ingredient-model.js');

let data = require('./server/db-setup/api-responses.json');

let ingredients = [];

data.recipes.forEach(recipe => {
  recipe.extendedIngredients.forEach(ingredient => {
    ingredients.push({
      apiIngId: ingredient.id,
      name: ingredient.name,
      category: ingredient.aisle
    });
  })
});


db.sync({force: true})
.then(() => {
  console.log('synced db');
	let recipePromises = data.recipes.map(recipe => {
		recipe.apiRecipeId = recipe.id;
		delete recipe.id;
		return Recipe.findOrCreate({
			where: {
				apiRecipeId: recipe.apiRecipeId
			},
			defaults: recipe
		})
    .then(recps => recps[0])
    .catch(err => console.log(chalk.blue("recipe not loaded, " + err)));
	})

	let ingredientPromises = ingredients.map(ingredient => {
		// ingredient.apiIngId =
    return Ingredient.findOrCreate({
			where: {
				apiIngId: ingredient.apiIngId
			},
			defaults: ingredient
		})
		.then(ing => ing[0]);
	});

	return Promise.all([...recipePromises, ...ingredientPromises]);
})
.then(() => {
  console.log('created recipes/ingredients');
	return Recipe.findAll();
})
.then((recipes) => {
  let promises = [];
	recipes.forEach(recipe => {
		recipe.extendedIngredients.forEach(ingredient => {
		  let id = ingredient.id;

			let promise = Ingredient.findOne({
				where: {
					apiIngId: id
				}
			})
			.then(ingredient => {
				recipe.addIngredient(ingredient);
			})
      promises.push(promise);
		})
	})
  return Promise.all(promises);
})
.then(() => {
  console.log(chalk.green('seed successful'));
})
.catch(err => {
  console.log(chalk.red(err));
  console.log(chalk.red(err.stack));
})
.finally(() => {
   console.log('closing db');
  db.close();
  process.exit(0)
  return null;
});
