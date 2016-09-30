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
	let recipePromises = data.recipes.map(recipe => {
		recipe.apiRecipeId = recipe.id;
		delete recipe.id;
		return Recipe.findOrCreate({
			where: {
				apiRecipeId: recipe.apiRecipeId
			},
			defaults: recipe
		});
	})

	let ingredientPromises = ingredients.map(ingredient => {
		return Ingredient.findOrCreate({
			where: {
				apiIngId: ingredient.apiIngId
			},
			defaults: {
				name: ingredient.name,
				category: ingredient.category
			}
		})
		.then(ing => {
			return ing[0]
		});
	});

	return Promise.all([...recipePromises, ...ingredientPromises]);
})
.then(() => {
	return Recipe.findAll();
})
.then((recipes) => {
  let promises = [];
	recipes.forEach(recipe => {
		recipe.extendedIngredients.forEach(ingredient => {
		  let id = ingredient.id;
			Ingredient.findOne({
				where: {
					apiIngId: id
				}
			})
			.then(ingredient => {
				promises.push(recipe.addIngredient(ingredient));
			})
			.catch(err => {
				console.log(chalk.blue(err));
			})
		})
	})
  return Promise.all(promises);
})
.then(() => {
  console.log(chalk.green('seed successful'));
})
.catch(err => {
  console.log(chalk.red(err));
})
.finally(() => {
  db.close();
  console.log('SEEDED THE DATABASE>>>>> OR TRIED TO');
  return null;
});
