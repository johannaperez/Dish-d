'use strict';
const db = require('./_db');

const User = require('./models/user-model.js');
const UserPref = require('./models/user-pref-model.js');
const Recipe = require('./models/recipe-model.js');
const Ingredient = require('./models/ingredient-model.js');
const MealPlan = require('./models/meal-plan-model.js');


Ingredient.belongsToMany(Recipe, { through: 'recipes_ingredients', as: 'recipes' });
Recipe.belongsToMany(Ingredient, { through: 'recipes_ingredients', as: 'ingredients' });

UserPref.belongsTo(User);	// UserPref has userId column
MealPlan.belongsTo(User);   // MealPlan has userId column

// handle users having favorite recipes
User.belongsToMany(Recipe, { through: 'user_recipes'});
Recipe.belongsToMany(User, { through: 'user_recipes'});

module.exports = db;
