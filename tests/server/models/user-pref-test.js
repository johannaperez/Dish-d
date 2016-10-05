var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');
var Promise = require('bluebird');

var UserPref = db.model('userPrefs');
var Recipe = db.model('recipe');


describe('User Preference model', function() {

    var newUserPref = {
        vegetarian: true,
        dislikes: ['eggs']
    };

    var recipes = [{
        title: 'Carrot Soup',
        vegetarian: true,
        vegan: false,
        glutenFree: false,
        dairyFree: false,
        image: 'http',
        instructions: '1, 2, 3',
        preparationMinutes: 5,
        cookingMinutes: 10,
        extendedIngredients: [{ name: 'carrots' }]
    }, {
        title: 'Lamb Popsicles',
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        dairyFree: false,
        image: 'http',
        instructions: '1, 2, 3',
        preparationMinutes: 5,
        cookingMinutes: 10,
        extendedIngredients: [{ name: 'lamb chops' }]
    }, {
        title: 'Omelette',
        vegetarian: true,
        vegan: false,
        glutenFree: false,
        dairyFree: false,
        image: 'http',
        instructions: '1, 2, 3',
        preparationMinutes: 5,
        cookingMinutes: 10,
        extendedIngredients: [{ name: 'eggs' }]
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
                .then(function([pref, rec1, rec2, rec3]) {
                    preference = pref;
                })
                .catch(console.error)
            })
            .catch(console.error);

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

