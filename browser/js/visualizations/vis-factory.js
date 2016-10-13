app.factory('VisFactory', function($http){
    return {
        // returns active mealPlan
        getActiveMealPlan: (userId) => {
            return $http.get(`api/users/${userId}/meals`)
            .then((response) => {
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

            let d3Name = (mealTitle, ing) => {
                return `meals.${mealTitle}.${ing}`;
            }

            mealInfo.forEach(obj => {
                // no ingredient overlap
                if (obj.meals.length === 1) {
                    data.push({name: d3Name(obj.meals[0], obj.ing), size: 500, imports: []});
                }
                else {
                   for (let i = 0; i < obj.meals.length; i++) {
                     
                   } 
                }
            })

            return mealInfo


            /*
                go through each ing in meal1
                    check if ing1 is INCLUDED in meal2.ings
                        if yes: {name:meals.meal1.ing1, size:500, imports:[meals.meal2.ing1]}
                        * create the backward loop!
                    check if ing2 is INCLUDED in meal3.ings
                    ...
                    meali.ings
            */

        }

    }
});















