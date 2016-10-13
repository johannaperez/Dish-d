app.factory('VisFactory', function($http){
    return {
        // returns active mealPlan
        getActiveMealPlan: (userId) => {
            return $http.get(`api/users/${userId}/meals`)
            .then((response) => {
                return response.data;
            })
        },

        getMealPlanRecipes: (recId) => {
            return $http.get(`api/recipes/${recId}`)
            .then(res => {
                return res.data;
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
        }
    }
});
