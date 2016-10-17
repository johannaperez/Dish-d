// Instantiate all models
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');
var Recipe = db.model('recipe'); 

var supertest = require('supertest');

describe('Meal Plan Route', function () {

    var app, User;

    beforeEach('Sync DB', function () {
        return db.sync();
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        User = db.model('user');
    });

  describe('get meal plan route', function () {

    var guestAgent;

    beforeEach('Create guest agent', function () {
      guestAgent = supertest.agent(app);
    });

    beforeEach('Seed recipes', function(){

          var recipes = [
        {title: "Chocolate Cake",
        instructions: 'make it!',
        image: 'img.jpg',
        preparationMinutes: 10,
        cookingMinutes: 10,
        extendedIngredients: [
            {name: 'chocolate', id: 1},
            {name: 'sugar', id: 2}
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
        },
        {title: "Chocolate Cake2",
        instructions: 'make it!',
        image: 'img.jpg',
        preparationMinutes: 10,
        cookingMinutes: 10,
        extendedIngredients: [
            {name: 'chocolate', id: 1},
            {name: 'sugar', id: 2}
        ]
        },
        {title: "Chocolate Chip Cookies2",
        instructions: 'make it!',
        image: 'img.jpg',
        preparationMinutes: 10,
        cookingMinutes: 10,
        extendedIngredients: [
            {name: 'chocolate', id: 1},
            {name: 'flour', id: 3}
        ]
        },
        {title: "Chicken Nuggets2",
        instructions: 'make it!',
        image: 'img.jpg',
        preparationMinutes: 10,
        cookingMinutes: 10,
        extendedIngredients: [
            {name: 'chicken', id: 400},
            {name: 'nuggets', id: 323}
        ]
        },
        {title: "Chocolate Cake3",
        instructions: 'make it!',
        image: 'img.jpg',
        preparationMinutes: 10,
        cookingMinutes: 10,
        extendedIngredients: [
            {name: 'chocolate', id: 1},
            {name: 'sugar', id: 2}
        ]
        },
        {title: "Chocolate Chip Cookies3",
        instructions: 'make it!',
        image: 'img.jpg',
        preparationMinutes: 10,
        cookingMinutes: 10,
        extendedIngredients: [
            {name: 'chocolate', id: 1},
            {name: 'flour', id: 3}
        ]
        },
        {title: "Chicken Nuggets3",
        instructions: 'make it!',
        image: 'img.jpg',
        preparationMinutes: 10,
        cookingMinutes: 10,
        extendedIngredients: [
            {name: 'chicken', id: 400},
            {name: 'nuggets', id: 323}
        ]
        },
        {title: "Chicken Nuggets4",
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

     let recipePromises = [];
        recipes.forEach(function(recipe){
          recipePromises.push(Recipe.create(recipe));
        });

      return Promise.all(recipePromises);


    });


    // need to make a user.
    // need to put recipes in the db for this to work
    it('should get an array of 10 recipes as a response if a user has no meal plans', function(done) {
      return guestAgent.get('/api/users/1/meals')
        .expect(200)
        .end(function(err, response) {
            if (err) return console.log(err);
            // console.log(response.body);
            expect(response.body).to.be.an('array');
            expect(response.body).to.have.length(10);
            done();
          });
    });

  });
});
