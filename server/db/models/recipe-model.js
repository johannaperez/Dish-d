'use strict';

const Sequelize = require('sequelize');
const db = require('../_db.js');
const User = require('./user-model.js');
// const UserPref = require('./user-pref-model.js');

let Recipe = db.define('recipe', {
    // SCHEMA
    apiRecipeId: {
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING
    },
    readyInMinutes: {
        type: Sequelize.INTEGER
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageType: {
        type: Sequelize.STRING
    },
    instructions: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    vegetarian: {
        type: Sequelize.BOOLEAN
    },
    vegan: {
        type: Sequelize.BOOLEAN
    },
    glutenFree: {
        type: Sequelize.BOOLEAN
    },
    dairyFree: {
        type: Sequelize.BOOLEAN
    },
    ketogenic: {
        type: Sequelize.BOOLEAN
    },
    servings: {
        type: Sequelize.INTEGER
    },
    preparationMinutes: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cookingMinutes: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    sourceUrl: {
        type: Sequelize.STRING
    },
    spoonacularSourceUrl: {
        type: Sequelize.STRING
    },
    creditText: {
        type: Sequelize.STRING
    },
    sourceName: {
        type: Sequelize.STRING
    },
    // extendendedIngredients (loop), get id (in ingredient model, call apiIngId)
    extendedIngredients: {
        type: Sequelize.ARRAY(Sequelize.JSON)
    },
    mealsWithSimilarIngredients: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
    }
}, {
    // OPTIONS
  getterMethods: {

    importantIngredients: function(){
      var title = this.title;
      var ingredients = this.extendedIngredients.filter(function(ingredient){
        var name = ingredient.name;
        return title.toLowerCase().includes(name.toLowerCase());
      });

      return ingredients;
    } // END IMPORTANT

  },

  instanceMethods: {

    getRelatedMeals: function(User){
      var ingredients = this.importantIngredients;
      if (!ingredients) return [];

      return User.getAllOkayRecipes()
      .then(function(recipes) {
        recipes = recipes.filter(function(recipe){
          return compareIngredients(recipe.importantIngredients, ingredients) > 0;
        });

        return recipes;
      })
      .then(function(similarRecipes){
        return similarRecipes;
      })
      .catch(function(err){
        console.log(err);
      });

     },

      // if you have one meal, get numofMeals that have ingredients in common
      // returns recipes that have the most possible ingredients in common
    getMealsWithSimilarIngredients: function(numOfMeals){
        var theRecipe = this;
        var recipeCount = {};
        var recipes = [];
        var promises = [];

        return this.getIngredients().
        then(function(ingredients){

            ingredients.forEach(function(ingredient){
                promises.push(ingredient.getRecipes());
            })

        return Promise.all(promises);
        })
        .then(function(allRecipes){
            // at this point you should have an array of arrays of recipes.
            // each array is the recipes for an ingredient.
            // we care about the recipes that appear the most often across the ingredients.
            allRecipes = [].concat.apply([], allRecipes);
            allRecipes.forEach(function(recipe){
                if (recipeCount[recipe.id]){
                    recipeCount[recipe.id]++;
                }
                else {
                    recipeCount[recipe.id] = 1;
                }
            })

            var minMeals = 0;
            // now we have an object of recipes. key is the recipe id and count is the number of times the recipe appears.
            // we want to loop through the object and return numOfMeals with the highest count value;
            for (var recipeId in recipeCount){
                if (Number(recipeId) !== theRecipe.id){
                    if (recipes.length < numOfMeals){
                        recipes.push({recipeId: recipeId, count: recipeCount[recipeId]});
                    }

                    else if (recipeCount[recipeId] >= minMeals){
                        var smallestIndex = 0;
                        var smallestVal = minMeals;

                            for (var i = 0; i < recipes.length; i++){
                                if (recipes[i].count <= smallestVal){
                                    smallestVal = recipes[i];
                                    smallestIndex = i;
                                }
                            }

                            recipes[smallestIndex] = {recipeId: recipeId, count: recipeCount[recipeId]};
                    }
                    minMeals = Math.min(...recipes.map((elem) => elem.count));
                }
            } // end looking through recipe count

            recipes = recipes.map(function(recipeObj){
                return recipeObj.recipeId;
            })

            return recipes;
        });
      }

    }, // end of instance methods


    classMethods: {
        // return x number of random recipes, considering what the user likes
        randomRecipes: function (userId, numOfRecipes){

            // console.dir(User);
            // var User = this.modelManager.models[2];
            // return User.findById(userId)
            // .then(function(user){
            //     console.log('You found a nice user!!', user);
            //     return user.getAllOkayRecipes();
            // })
            var UserPref = this.modelManager.models[1];
            return UserPref.findOne({
                where: {
                    userId: userId
                }
            })
            .then(function(userPreferences){
                return userPreferences.getAllOkayRecipes();
            })
            .then(function(recipes){
                //console.log('FOUNT SOME CUTE recipes', recipes)
                let indices = [];
                let max = Math.floor(recipes.length);
                // get a bunch of random indecies so you can look up those recipes
                    while (indices.length < numOfRecipes){
                        let random = Math.round(Math.random() * max);
                        if (!indices.includes(random)) {
                            indices.push(random);
                        }
                }

                let toReturn = indices.map(function(index){
                    return recipes[index];
                })

                //console.log("RETURNING", toReturn);
                return toReturn;
            })
        }
    } // end class methods

});

function compareIngredients (ingredients1, ingredients2){

  let ing1 = ingredients1.map(ing => ing.id);
  let ing2 = ingredients2.map(ing => ing.id);

  let count = 0;
  for (let i = 0; i < ing1.length; i++){
    if (ing2.includes(ing1[i])) count++;
  }

  return count;
} // returns number of ingredients in common

module.exports = Recipe;
