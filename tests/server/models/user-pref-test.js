var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');
var Promise = require('bluebird');

var UserPref = db.model('userPref');
var Recipe = db.model('recipe');


describe('User Preference model', function () {

	var newUserPref = {
		vegetarian: true,
       	dislikes: ['eggs']
	};

	var recipes = [{
		title: 'this is vegetarian!',
		vegetarian: true,
		image: 'http',
		instructions: '1, 2, 3',
		preparationMinutes: 5,
		cookingMinutes: 10,
		extendedIngredients: [{name: 'carrots'}]
	}, {
		title: 'this is MEAT!',
		vegetarian: false,
		image: 'http',
		instructions: '1, 2, 3',
		preparationMinutes: 5,
		cookingMinutes: 10,
		extendedIngredients: [{name: 'lamb chops'}]
	}, {
		title: 'omelette',
		vegetarian: true,
		image: 'http',
		instructions: '1, 2, 3',
		preparationMinutes: 5,
		cookingMinutes: 10,
		extendedIngredients: [{name: 'eggs'}]
	}]

	var preference = {};

    beforeEach('Sync DB', function () {
       	return db.sync({ force: true })
       	.then(function() {
       		var promises = [];

       		promises.push(UserPref.create(newUserPref));

       		recipes.forEach(function(recipe) {
       			promises.push(Recipe.create(recipe));
       		});
       		Promise.All(promises)
       		.then(function() {
       			UserPref.findAll()
    			.then(function(foundPref) {
    				preference = foundPref;
    			}))
       		});
       	})
    });

    describe('gets user preferences', function() {

    	describe('returns a new user preference instance', function() {
    		it('has an updated vegetarian boolean status', function() {
    			expect(preference.vegetarian).to.be.equal(true);
    		});

    		it('has a recipe filter method', function() {
    			expect(preference.getAllOkayRecipes).to.be.a('function');
    		});
    	});

    	describe('filters recipes based on preferences', function() {
    		it('filters by restrictions and dislikes', function() {
    			expect(preference.getAllOkayRecipes()).to.be.an('array');
    			expect(preference.getAllOkayRecipes().length).to.equal(1);
    		})	

    		it('returns vegetarian recipes', function() {
    			expect(preference.getAllOkayRecipes()[0].title).to.equal('this is vegetarian!');
    		});

    		it('returns recipes without eggs', function() {
    			expect(preference.getAllOkayRecipes()[0].extendedIngredients[0].name).to.not.equal('eggs');
    		});
    	})
    })

});
