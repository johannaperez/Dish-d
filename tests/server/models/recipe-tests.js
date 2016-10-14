var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var User = db.model('user');
var Recipe = db.model('recipe');
var Ingredient = db.model('ingredient');
var Promise = require('bluebird');

describe('Recipe model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({force: true});
    });

    describe('getRelatedMeals', function () {

        var fakeUser = {
            getAllOkayRecipes: function(){
                return new Promise(function(resolve){
                    return recipes;
                })
            }
        }

        var recipes = [
            {title: "Chocolate Cake",
            instructions: 'make it!',
            image: 'img.jpg',
            preparationMinutes: 10,
            cookingMinutes: 10,
            extendedIngredients: [
                {name: 'chocolate', id: 1},
                {name: 'eggs', id: 2}
            ]
            },
            {title: "Chocolate Chip Cookies",
            instructions: 'make it!',
            image: 'img.jpg',
            preparationMinutes: 10,
            cookingMinutes: 10,
            extendedIngredients: [
                {name: 'chocolate', id: 1},
                {name: 'flour', id: 3}
            ]
            },
            {title: "Chicken Nuggets",
            instructions: 'make it!',
            image: 'img.jpg',
            preparationMinutes: 10,
            cookingMinutes: 10,
            extendedIngredients: [
                {name: 'chicken', id: 400},
                {name: 'nuggets', id: 323}
            ]
            }

        ];

        var createRecipes = function () {
            let promises = recipes.map(rec => Recipe.create(rec));
            return Promise.all(promises);
        }

         it('should recognize two recipes with related ingredients', function () {
            return createRecipes().then(function ([rec1, rec2, rec3]) {
                rec1.getRelatedMeals(fakeUser)
                .then(function(simRecipes){
                    expect(simRecipes).to.be.an('array');
                    expect(simRecipes).to.have.length(1);
                    expect(simRecipes[0].title).to.be.equal('Chocolate Chip Cookies');
                });
            });
        });

        it('should return an empty array if there are no matching recipes', function () {
            return createRecipes().then(function ([rec1, rec2, rec3]) {
                rec3.getRelatedMeals(fakeUser)
                .then(function(simRecipes){
                    expect(simRecipes).to.be.an('array');
                    expect(simRecipes).to.have.length(0);
                });
            });
        });

    });

    describe('getMealsWithSimilarIngredients', function () {

        var recipes = [
            {title: "Chocolate Cake",
            instructions: 'make it!',
            image: 'img.jpg',
            preparationMinutes: 10,
            cookingMinutes: 10,
            extendedIngredients: [
                {name: 'chocolate', id: 1},
                {name: 'eggs', id: 2}
            ]
            },
            {title: "Chocolate Chip Cookies",
            instructions: 'make it!',
            image: 'img.jpg',
            preparationMinutes: 10,
            cookingMinutes: 10,
            extendedIngredients: [
                {name: 'chocolate', id: 1},
                {name: 'flour', id: 3}
            ]
            },
            {title: "Chicken Nuggets",
            instructions: 'make it!',
            image: 'img.jpg',
            preparationMinutes: 10,
            cookingMinutes: 10,
            extendedIngredients: [
                {name: 'chicken', id: 4},
                {name: 'nuggets', id: 5}
            ]
            }

        ];

        let egg = {
            name: 'egg'
        }

        let chocolate = {
            name: 'chocolate'
        }

        // this creates all the recipes and ingredients and then sets an association.
        // it will return a promise for the recipe for the ChocolateCake.
        let createRecipe = function () {
            let promises = [Ingredient.create(egg), Ingredient.create(chocolate)];
            let recipe = {};

            recipes.forEach(function(recipe){
                promises.push(Recipe.create(recipe));
            })

            return Promise.all(promises)
            .then(function([createdEgg, createdChocolate, createdCake, createdCookie, createdNuggets]){
                recipe = createdCake;

                let morePromises = [];
                morePromises.push(createdCake.addIngredients([createdEgg, createdChocolate]));
                morePromises.push(createdCookie.addIngredients([createdEgg, createdChocolate]))

                return Promise.all(morePromises);
            })
            .then(function(){
                return recipe;
            });
        }

        it('should return an array of the correct length', function () {
            return createRecipe().then(function (rec) {
                return rec.getMealsWithSimilarIngredients(1)
                .then(function(result){
                    expect(result).to.be.an('array');
                    expect(result).to.have.length(1);
                });
            });
        });

        it('should return an array of recipe id with the same ingredients', function () {
            return createRecipe().then(function (rec) {
                return rec.getMealsWithSimilarIngredients(1)
                .then(function(result){
                    expect(result).to.be.an('array');
                    return Recipe.findOne({
                        where: {id: result[0]}
                    });
                })
                .then(function(resultRecipe){
                    expect(resultRecipe.title).to.be.equals('Chocolate Chip Cookies');
                });
            });
        });
    });

    describe('randomRecipes', function () {

        var fakeUser = {
            email: 'chocolover@choco.com',
            password: 'choco'
        }

        var recipes = [
            {title: "Chocolate Cake",
            instructions: 'make it!',
            image:'img.jpg',
            preparationMinutes: 10,
            cookingMinutes: 10,
            extendedIngredients: [
                {name: 'chocolate', id: 1},
                {name: 'eggs', id: 2}
            ]
            },
            {title: "Chocolate Chip Cookies",
            instructions: 'make it!',
            image:'img.jpg',
            preparationMinutes: 10,
            cookingMinutes: 10,
            extendedIngredients: [
                {name: 'chocolate', id: 1},
                {name: 'flour', id: 3}
            ]
            },
            {title: "Chicken Nuggets",
            instructions: 'make it!',
            image:'img.jpg',
            preparationMinutes: 10,
            cookingMinutes: 10,
            extendedIngredients: [
                {name: 'chicken', id: 400},
                {name: 'nuggets', id: 323}
            ]
            }

        ];


        // this creates all the recipes and ingredients and then sets an association.
        // it will return a promise for the recipe for the ChocolateCake.
        var createRecipes = function () {
            let promises = recipes.map(rec => Recipe.create(rec));
            return Promise.all(promises);
        }

        it('should return an array of the correct length', function () {
            return createRecipes().then(function (rec) {
                User.create(fakeUser)
                .then(function(user){
                    return Recipe.randomRecipes(user.id, 2);
                })
                .then(function(result){
                    expect(result).to.be.an('array');
                    expect(result).to.be.have.length(2);
                })
            });
        });

    });

});

