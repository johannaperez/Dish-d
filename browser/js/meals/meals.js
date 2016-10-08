// app.config(function ($stateProvider) {
//     $stateProvider.state('meals', {
//         url: '/meals',
//         templateUrl: 'js/meals/meals.html',
//         controller: 'MealsCtrl'
//     });
// });

// app.controller('MealsCtrl', function($scope){
//     $scope.meals = [ //array of meal suggestions go here
//     {
//         title: 'salad',
//         url: 'https://lighterphotos-production.s3.amazonaws.com/uploads/recipe/image/1519/SuperSeedSalad6773.jpg'
//         },
//         {
//         title: 'other thing',
//         url: `https://lighterphotos-production.s3.amazonaws.com/uploads/recipe/image/1084/2EnergizingMuesliFreshBerries__MelissaBlackall__-8.jpg`
//     }
//     ];

//     $scope.slickConfig = {
//         adaptiveHeight: true,
//         // initialSlide: 0,
//         mobileFirst: true,
//         slidesToScroll: 1,
//         slideToShow: 1,
//         method: {}
//     }
// });

// app.factory('MealFactory', function($http){

//     let MealFactory = {};

//     MealFactory.getMealPlan = function(userId){
//         return $http.get(`api/users/${userId}/meals`);
//     };

//     return MealFactory;
// });

app.config(function ($stateProvider) {
    $stateProvider.state('meals', {
        url: '/meals',
        templateUrl: 'js/meals/meals.html',
        controller: 'MealsCtrl'
    });
});

app.controller('MealsCtrl', function($scope, MealFactory, Session){
    // $scope.meals = [ //array of meal suggestions go here
    // {
    //     title: 'salad',
    //     url: 'https://lighterphotos-production.s3.amazonaws.com/uploads/recipe/image/1519/SuperSeedSalad6773.jpg'
    //     },
    //     {
    //     title: 'other thing',
    //     url: `https://lighterphotos-production.s3.amazonaws.com/uploads/recipe/image/1084/2EnergizingMuesliFreshBerries__MelissaBlackall__-8.jpg`
    // }
    // ];

    $scope.meals = [
//         {
//            '$$hashKey'
// : "object:60",
// 'apiRecipeId'
// :
// 709115,
// 'cookingMinutes'
// :
// 20,
// 'createdAt'
// :
// "2016-10-08T19:06:28.798Z",
// 'creditText'
// :
// "Baked by Rachel",
// 'dairyFree'
// :
// true,
// 'extendedIngredients'
// :
// Array[13],
// 'glutenFree'
// :
// false,
// 'id'
// :
// 180,
// 'image'
// :
// "https://spoonacular.com/recipeImages/applesauce-carrot-cake-muffins-709115.jpg",
// 'imageType'
// :
// "jpg",
// 'importantIngredients'
// :
// Array[1],
// 'instructions'
// :
// "Preheat oven to 350F. Line a muffin pan with six paper liners.Finely shred carrots and chop well to eliminate any large pieces.In a large bowl or stand mixer, beat together applesauce, vegetable oil and sugars until fully combined. Mix in egg and vanilla, followed by carrots. Scrape the bowl as needed. Addremaining dry ingredients, mixing well until no streaks remain.Divide mixture evenly between prepared paper liners, adding 1 heaping large cookie scoop per liner. Liners should be nearly full.Bake for 20-22 minutes or until a toothpick inserted comes out clean or with just a few moist crumbs.Cool in pan for several minutes before removing to a wire rack to cool completely.Store in an airtight container for up to several days.",
// 'ketogenic'
// :
// false,
// 'lowFodmap'
// :
// false,
// 'mealsWithSimilarIngredients'
// :
// Array[10],
// 'preparationMinutes'
// :
// 10,
// 'readyInMinutes'
// :
// 30,
// 'servings'
// :
// 6,
// 'sourceName'
// :
// "Baked by Rachel",
// 'sourceUrl'
// :
// "http://www.bakedbyrachel.com/applesauce-carrot-cake-muffins/",
// 'spoonacularSourceUrl'
// :
// "https://spoonacular.com/applesauce-carrot-cake-muffins-709115",
// 'title'
// :
// "Applesauce Carrot Cake Muffins",
// 'updatedAt'
// :
// "2016-10-08T19:08:09.342Z",
// 'vegan'
// :
// false,
// 'vegetarian'
// :
// true,
// 'whole30'
// :
// false
//         }
    ];

    MealFactory.getMealPlan(Session.user.id)
    .then(function(meals){
        $scope.meals = meals;
        console.log($scope.meals)
    })
    .then(function(){
        $scope.mealsLoaded = true;
    })
    // todo add error handling here.



    $scope.slickConfig = {
        adaptiveHeight: true,
        // initialSlide: 0,
        mobileFirst: true,
        slidesToScroll: 1,
        slideToShow: 1,
        method: {}
    }
});

app.factory('MealFactory', function($http){

    let MealFactory = {};

    MealFactory.getMealPlan = function(userId){
        return $http.get(`api/users/${userId}/meals`)
        .then(function(response){
            return response.data;
        });
    };
    return MealFactory;
    });

