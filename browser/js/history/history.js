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

app.controller('HistoryCtrl', function($scope, HistoryFactory, currentUser){

	$scope.history = {};

	HistoryFactory.getHistory(currentUser.id)
	.then(function(history){
		$scope.history = history;
		console.log(history);
	})

});


app.factory('HistoryFactory', function($http){
	let HistoryFactory = {}

	HistoryFactory.getHistory = function(userId){
		return $http.get(`api/users/${userId}/history`)
		.then(function(response){
			return response.data;
		})
	};

	// HistoryFactory.getHistoryDetail = function(userId, mealPlanId){
	// 	return $http.get(`api/users/${userId}/history/${mealPlanId}`)
	// 	.then(function(response){
	// 		return response.data;
	// 	})
	// }

	return HistoryFactory;
});
