var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var Recipe = db.model('recipe');
var Promise = require('bluebird');

xdescribe('compare ingredients helper function', function(){


});

describe('Recipe model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

        describe('getRelatedMeals', function () {

            var fakeUser = {
                getAllOkRecipes: function(){
                    return recipes;
                }
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

            var createRecipes = function () {
                let promises = recipes.map(rec => Recipe.create(rec));
                return Promise.all(promises);
            }

             it('should recognize two recipes with related ingredients', function () {
                createRecipes().then(function ([rec1, rec2, rec3]) {
                    rec1.getRelatedMeals(fakeUser)
                    .then(function(simRecipes){
                        expect(simRecipes).to.be.an('array');
                        expect(simRecipes[0].title).to.be.equal("Chocolate Chip Cookies");
                    });
                });
            });

        });

});
