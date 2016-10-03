'use strict';
const db = require('./_db');

const User = require('./models/user-model.js');
const UserPref = require('./models/user-prefs-model.js');
const Recipe = require('./models/recipe-model.js');
const Ingredient = require('./models/ingredient-model.js');


Ingredient.belongsToMany(Recipe, { through: 'recipes_ingredients', as: 'recipes' });
Recipe.belongsToMany(Ingredient, { through: 'recipes_ingredients', as: 'ingredients' });

User.hasOne(UserPref);
UserPref.belongsTo(User);

module.exports = db;
