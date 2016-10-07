app.config(function ($stateProvider) {

    $stateProvider.state('meals', {
        url: '/meals',
        templateUrl: 'js/meals/meals.html',
    });
});

app.controller('Meals', function($scope){
    $scope.slickConfig = {
        method: {
            slickPrev: () => {
                console.log('previous recipe suggestion')
            },
            slickNext: () => {
                console.log('next recipe suggestion')
            }

        }
    }
});

app.factory('MealFactory', function($http){

    let MealFactory = {};

    MealFactory.getMealPlan = function(userId){
        return $http.get(`api/users/${userId}/meals`);
    };

    return MealFactory;
});
