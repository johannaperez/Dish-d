'use strict';
const db = require('./_db');

const User = require('./models/user-model.js');
const Recipe = require('./models/recipe-model.js');
const Ingredient = require('./models/ingredient-model.js');

Recipe.hasMany(Ingredient);


module.exports = db;
