'use strict';
const db = require('./_db');

const User = require('./models/user-model.js');
// const UserPrefs = require('./models/user-prefs-model.js');
const Recipe = require('./models/recipe-model.js');
const Ingredient = require('./models/ingredient-model.js');


Ingredient.belongsToMany(Recipe, { through: 'recipes_ingredients', as: 'recipes'});
Recipe.belongsToMany(Ingredient, { through: 'recipes_ingredients', as: 'ingredients'});

// User.hasOne(UserPrefs);
// UserPrefs.belongsTo(User);

module.exports = db;
