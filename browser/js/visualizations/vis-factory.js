app.factory('VisFactory', function($http){
    return {
        getActiveMealPlan: (userId) => {
            return $http.get(`api/users/${userId}/meals`)
            .then(response => {
                return response.data;
            })
        },

        getCompletedMealPlans: (userId) => {
            return $http.get(`api/users/${userId}/history`)
            .then(response => {
                return response.data;
            })
        },

        getUserPrefs: (userId) => {
            return $http.get(`api/users/${userId}/preferences`)
            .then(response => {
                return response.data;
            })
        },

        buildCategoryData: (mealArr) => {
            // eventually build a fruit/veg dict to discriminate
            // use to map api aisle to chart categories
            const catDict = {
                Produce: 'fruits & veggies',
                'Milk, Eggs, Other Dairy': 'eggs & dairy',
                'Bakery/Bread':  'carbs',
                Baking: 'fats, oils, sweets',
                Meat: 'meat, beans, & nuts',
                'Oil, Vinegar, Salad Dressing': 'fats, oils, sweets',
                'Pasta and Rice': 'carbs',
                Cereal: 'carbs',
                'Sweet Snacks': 'fats, oils, sweets',
                Cheese: 'eggs & dairy',
                Nuts: 'meat, beans, & nuts',
                Seafood: 'meat, beans, & nuts',
                'Dried Fruits': 'fruits & veggies'
            };

            // use to get dataChildren idx for given category
            const catIdx = {
                'fruits & veggies': 0,
                'eggs & dairy': 1,
                carbs: 2,
                'fats, oils, sweets': 3,
                'meat, beans, & nuts': 4
            };

            // d3 data structure
            let dataChildren = [
                {
                    name: 'fruits & veggies',
                    children: []
                }, {
                    name: 'eggs & dairy',
                    children: []
                }, {
                    name: 'carbs',
                    children: []
                }, {
                    name: 'fats, oils, sweets',
                    children: []
                }, {
                    name: 'meat, beans, & nuts',
                    children: []
                }
            ];

            // build data in d3 format
            mealArr.forEach(meal => {
                meal.extendedIngredients.forEach(ing => {
                    if (catDict[ing.aisle]) {
                        let chartCat = catDict[ing.aisle];
                        let childIdx = catIdx[chartCat];
                        // ADD MEAL TITLE AS EXTRA LAYER!
                        // Cannot create property 'dx0' on string 'Sweet Onion Carbonara' when adding  children: [meal.title]
                        // console.log('MEAL: ', meal)
                        dataChildren[childIdx].children.push({name: ing.name});
                    }
                })
            })

            let data = [{name: 'Your Ingredients', children: dataChildren}];
            return data;
        },

        buildOverlapData: (mealArr) => {
            // get all ings for all meals for further filtering
            let mealInfo = [];
            let ingIdx = {};

            // [{ing: parsley, meals: [falafel burger, meatballs]}, {ing: thing, meals:[]}]
            mealArr.forEach(meal => {
                meal.extendedIngredients.forEach(ing => {
                    if (ingIdx[ing.name] === undefined) {
                        mealInfo.push({ing: ing.name, meals: [meal.title]});
                        ingIdx[ing.name] = mealInfo.length - 1;
                    }
                    else {
                        let idx = ingIdx[ing.name];
                        mealInfo[idx].meals.push(meal.title);
                    }
                })
            })

            // build data in d3 format
            let data = [];

            let upperCamelCase = (str) => {
                let strArr = str.split(' ');
                let upperStr = '';
                strArr.forEach(word => {
                    upperStr += word[0].toUpperCase() + word.slice(1)
                });
                return upperStr;
            }

            let d3Name = (mealTitle, ing) => {
                let upperMealTitle = upperCamelCase(mealTitle);
                let upperIng = upperCamelCase(ing);
                return `meals.${upperMealTitle}.${upperIng}`;
            }

            mealInfo.forEach(elem => {
                // no ingredient overlap
                if (elem.meals.length === 1) {
                    data.push({name: d3Name(elem.meals[0], elem.ing), size: 500, imports: []});
                }
                else {
                    for (let i = 0; i < elem.meals.length; i++) {
                        let tempArr = elem.meals.map(meal => {
                            return d3Name(meal, elem.ing);
                        });
                        let currMeal = tempArr[i];
                        tempArr.splice(elem.meals.indexOf(currMeal), 1);
                        data.push({name: currMeal, size: 500, imports: tempArr});
                    }
                }
            });
            return data;
        },

        buildSpendingData: (loadedMealArr, lightMealArr, numPeople) => {
            let data = [{
                key: 'Marley Spoon',
                values: []
            }, {
                key: 'Blue Apron',
                values: []
            }, {
                key: 'Dish\'d',
                values: []
            }]

            // build data in d3 format
            for (let i = 0; i < lightMealArr.length; i++) {
                let price = +lightMealArr[i].price;
                let divisor = loadedMealArr[i].length * numPeople;
                let pricePerServ = price / divisor;

                data[0].values.push([i + 1, 10.33]);
                data[1].values.push([i + 1, 9.99]);
                data[2].values.push([i + 1, pricePerServ]);
            }
            return data;
        }
    }
});










