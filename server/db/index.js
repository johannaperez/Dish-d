'use strict';
const db = require('./_db');

const User = require('./models/user-model.js');
// const UserPrefs = require('./models/user-prefs-model.js');
const Recipe = require('./models/recipe-model.js');
const Ingredient = require('./models/ingredient-model.js');


Ingredient.belongsToMany(Recipe, { through: 'recipe_ingredients', as: 'Recipes'});
Recipe.belongsToMany(Ingredient, { through: 'recipe_ingredients', as: 'Ingredients'});

// User.hasOne(UserPrefs);
// UserPrefs.belongsTo(User);


db.sync({force: true})
.then(()=>{
	console.log('FINSIHED!');
});


module.exports = db;
