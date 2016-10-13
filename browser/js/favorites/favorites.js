app.config(function($stateProvider) {
    $stateProvider.state('favorites', {
        url: '/favorites',
        templateUrl: 'js/favorites/favorites.html',
        controller: 'FavoritesCtrl',
        resolve: {
            currentUser: function(AuthService){
                return AuthService.getLoggedInUser();
            }
        },
        data: {
            authenticate: true
        }
    });
});

app.controller('FavoritesCtrl', function($scope, FavoritesFactory, currentUser, $mdDialog){
    $scope.meals = [];

    FavoritesFactory.getFavorites(currentUser.id)
    .then(function(favorites){
        $scope.meals = favorites;
    })

    $scope.removeRecipe = function(mealId){
        FavoritesFactory.removeFavorite(currentUser.id, mealId)
        .then(function(){
           return FavoritesFactory.getFavorites(currentUser.id)
        })
        .then(function(favorites){
            $scope.meals = favorites;
        })
    }

    //popup to show a recipe's detail
    $scope.showRecipe = function(meal, ev) {
        $mdDialog.show({
            controller: DialogController,
            scope: $scope, // use parent scope in template
            preserveScope: true,
            templateUrl: 'js/meals/recipe.html',
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })

        function DialogController($scope, $mdDialog) {
            $scope.meal = meal;

            $scope.formatInstructions = (instructions) => {
                return instructions.split('.');
            };

            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

        }
    };
});

app.factory('FavoritesFactory', function($http){
    let FavoritesFactory = {};

    FavoritesFactory.getFavorites = function(userId){
        return $http.get(`api/users/${userId}/favorites`)
        .then(function(response){
            return response.data;
        })
    }

    FavoritesFactory.removeFavorite = function(userId, recipeId){
        return $http.delete(`api/users/${userId}/favorites/${recipeId}`)
    }

    return FavoritesFactory;
});
