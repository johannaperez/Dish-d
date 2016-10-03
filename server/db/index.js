'use strict';
const db = require('./_db');

const User = require('./models/user-model.js');
const UserPref = require('./models/user-pref-model.js');
const Recipe = require('./models/recipe-model.js');
const Ingredient = require('./models/ingredient-model.js');


Ingredient.belongsToMany(Recipe, { through: 'recipes_ingredients', as: 'recipes' });
Recipe.belongsToMany(Ingredient, { through: 'recipes_ingredients', as: 'ingredients' });

UserPref.hasOne(User);

module.exports = db;
