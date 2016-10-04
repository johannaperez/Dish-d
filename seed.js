'use strict';

const chalk = require('chalk');
const Promise = require('bluebird');

const db = require('./server/db/index.js');
const Recipe = require('./server/db/models/recipe-model.js');
const Ingredient = require('./server/db/models/ingredient-model.js');

let data = require('./server/db-setup/api-responses.json');
let data2 = require('./server/db-setup/api-responses2.json');
let data3 = require('./server/db-setup/api-responses3.json');
let data4 = require('./server/db-setup/api-responses4.json');

data = [... data.recipes, ...data2.recipes, ...data3.recipes, ...data4.recipes];

let ingredients = [];

data.forEach(recipe => {
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
	let recipePromises = data.map(recipe => {
		recipe.apiRecipeId = recipe.id;
		delete recipe.id;
		return Recipe.findOrCreate({
			where: {
				apiRecipeId: recipe.apiRecipeId
			},
			defaults: recipe
		})
    .then(recps => recps[0])
    .catch(err => {
      if (err.toString().split(':')[0] === 'SequelizeValidationError') return;
      else throw err;
    });
	});

	let ingredientPromises = ingredients.map(ingredient => {
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
  console.log('Created recipes & ingredients');
	return Recipe.findAll();
})
.then((recipes) => {

  let promises = [];

	recipes.forEach(recipe => {
    if (recipe.title === 'Southwestern Mini Meatloaves') console.dir(recipe.extendedIngredients)
		recipe.extendedIngredients.forEach(ingredient => {
		  let id = ingredient.id;
      let ingrr = ingredient;
			let promise = Ingredient.findOne({
				where: {
					apiIngId: id
				}
			})
			.then(ingredient2 => {
        if (!ingredient2) throw Error ("ingredient not found", ingredient2);
			   return recipe.addIngredient(ingredient2);
			}) // might be an error here with repeated ingredients...
      .catch(err => {
        if (err === 'SequelizeUniqueConstraintError: Validation error') return;
        else throw err;
      });

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
  process.exit(0);
  return null;
});
