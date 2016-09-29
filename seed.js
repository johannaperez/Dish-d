'use strict';

const chalk = require('chalk');
const Promise = require('bluebird');

const db = require('./server/db/_db.js');
const Recipe = require('./server/db/models/recipe-model.js');
const Ingredient = require('./server/db/models/ingredient-model.js');

let data = require('./server/db-setup/api-responses.json');


db.sync({force: true})
.then(() => {
	let recipePromises = data.recipes.map(recipe => {
		recipe.apiRecipeId = recipe.id;
		delete recipe.id;
		return Recipe.create(recipe);
	});
	return Promise.all(recipePromises);
})
.then(() => {
  console.log(chalk.green('seed successful'));
})
.catch(err => {
  console.log(chalk.red(err));
})
.finally(() => {
  db.close();
  return null;
});
