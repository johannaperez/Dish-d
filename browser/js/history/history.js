app.config(function ($stateProvider) {
    $stateProvider.state('history', {
        url: '/history',
        templateUrl: 'js/history/history.html',
        controller: 'HistoryCtrl',
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

app.controller('HistoryCtrl', function($scope, HistoryFactory, currentUser, MealFactory, $log, $mdDialog, $mdMedia){

	$scope.history = [];
	$scope.details = [];

    $scope.$watch(function() { return $mdMedia('xs'); }, function(small) {
         $scope.smallScreen = small;
    });

	HistoryFactory.getHistory(currentUser.id)
	.then(function(history){
		$scope.history = history[0];
		$scope.details = history[1];
	})

    $scope.addFavorite = function(mealId){
    MealFactory.addFavorite(currentUser.id, mealId)
    .catch($log.error);
	}

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

    $scope.buttons = [{
          icon: 'favorite',
          click: $scope.addFavorite,
          tooltip: "Add To Favorites"
        },
        {
          icon: 'aspect_ratio',
          click: $scope.showRecipe,
          tooltip: 'Show Full Recipe'
    }];

});


app.factory('HistoryFactory', function($http){
	let HistoryFactory = {}

	HistoryFactory.getHistory = function(userId){
		return $http.get(`api/users/${userId}/history`)
		.then(function(response){
			return response.data;
		})
	};

	return HistoryFactory;
});
