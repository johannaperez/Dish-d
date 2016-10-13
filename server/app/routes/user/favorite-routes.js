const db = require('../../../db');
const Recipe = db.model('recipe');
const User = db.model('user');
const router = require('express').Router({mergeParams: true});
const Promise = require('bluebird');


router.get('', (req, res, next) => {

	let id = req.params.userId;

	User.findById(id)
	.then(function(user){
		return user.getRecipes();
	})
	.then(function(favorties){
		res.send(favorties);
	})
	.catch(next);

});


router.post('/:mealId', (req, res, next) => {

	let id = req.params.userId;
	let mealId = req.params.mealId;

	User.findById(id)
	.then(function(user){
		return Recipe.findById(mealId)
		.then(function(recipe){
			return user.addRecipe(recipe);
		})
	})
	.then(function(){
		res.send('Success!');
	})
	.catch(next);

});


router.delete('/:mealId', (req, res, next) => {

	let id = req.params.userId;
	let mealId = req.params.mealId;

	User.findById(id)
	.then(function(user){
		return Recipe.findById(mealId)
		.then(function(recipe){
			return user.removeRecipe(recipe);
		})
	})
	.then(function(){
		res.send('Success!');
	})
	.catch(next);

});


module.exports = router;
