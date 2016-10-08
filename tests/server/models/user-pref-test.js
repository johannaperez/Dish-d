var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');
var Promise = require('bluebird');

var UserPref = db.model('userPrefs');
var Recipe = db.model('recipe');


xdescribe('User Preference model', function() {

    var newUserPref = {
        vegetarian: true,
        dislikes: [{name: 'eggs'}],
        availableTime: 30,
    };

    var recipes = [{
        title: 'Carrot Soup',
        vegetarian: true,       // passes
        vegan: false,
        glutenFree: false,
        dairyFree: false,
        image: 'http',
        instructions: '1, 2, 3',
        readyInMinutes: 15,     // passes
        preparationMinutes: 5,
        cookingMinutes: 10,
        extendedIngredients: [{ name: 'carrots' }]      // passes
    }, {
        title: 'Lamb Popsicles',
        vegetarian: false,      // doesn't pass (TEST VEG)
        vegan: false,
        glutenFree: false,
        dairyFree: false,
        image: 'http',
        instructions: '1, 2, 3',
        readyInMinutes: 15,     // passes
        preparationMinutes: 5,
        cookingMinutes: 10,
        extendedIngredients: [{ name: 'lamb chops' }]   // passes
    }, {
        title: 'Omelette',
        vegetarian: true,       // passes
        vegan: false,
        glutenFree: false,
        dairyFree: false,
        image: 'http',
        instructions: '1, 2, 3',
        readyInMinutes: 15,     // passes
        preparationMinutes: 5,
        cookingMinutes: 10,
        extendedIngredients: [{ name: 'eggs' }]     // doesn't pass (TEST DISLIKES)
    }, {
        title: 'zuccini bread',
        vegetarian: true,           // passes
        vegan: false,
        glutenFree: false,
        dairyFree: false,
        image: 'http',
        instructions: '1, 2, 3',
        readyInMinutes: 200,         // doesn't pass (TEST AVAIL-TIME)
        preparationMinutes: 5,
        cookingMinutes: 115,
        extendedIngredients: [{ name: 'zuccini' }]  // passes
    }]

    var preference = {};

    beforeEach('Sync DB', function() {
        return db.sync({ force: true })
            .then(function() {
                var promises = [];

                promises.push(UserPref.create(newUserPref));

                recipes.forEach(function(recipe) {
                    promises.push(Recipe.create(recipe));
                });
                return Promise.all(promises)
                .then(function([pref, rec1, rec2, rec3, rec4]) {
                    preference = pref;
                })
            })
    });

    describe('gets user preferences', function() {

        describe('all recipes were seeded', function() {
            it('has 4 recipes in db', function() {
                Recipe.findAll()
                .then(function(allRecipes) {
                    expect(allRecipes.length).to.equal(4);
                    expect(allRecipes[3].title).to.equal('zuccini bread');
                });
            });
        });

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
                preference.getAllOkayRecipes()
                .then(function(recipes){
                    expect(recipes).to.be.an('array');
                    expect(recipes.length).to.equal(1);
                })
            });

            it('returns vegetarian recipes', function() {
                preference.getAllOkayRecipes()
                .then(function(recipes){
                    expect(recipes[0].title).to.equal('Carrot Soup');
                })
            });

            it('returns recipes without eggs', function() {
                preference.getAllOkayRecipes()
                .then(function(recipes){
                    expect(recipes[0].title).to.not.equal('Lamb Popsicles');
                })
            });
        })
    })
});

