app.controller('SpendingCtrl', ($scope, $log, currentUser, mealPlans, VisFactory) => {

	$scope.lightMealPlans = mealPlans[0];
	$scope.detailedMealPlans = mealPlans[1];

	VisFactory.getUserPrefs(currentUser.id)
	.then(prefs => {
		$scope.numPeople = prefs.numPeople;
		$scope.data = VisFactory.buildSpendingData($scope.detailedMealPlans, $scope.lightMealPlans, $scope.numPeople);
	})
	.catch($log.error)

	$scope.options = {
		chart: {
			type: 'lineChart',
			height: 500,
			margin: {
				top: 20,
				bottom: 50,
				left: 40
			},
			x: (d) => { return d[0] },
			y: (d) => { return d[1] },

			color: d3.scale.category20c().range(),
            useInteractiveGuideline: true,

            xAxis: {
            	axisLabel: 'week'
            },

            yAxis: {
	          	axisLabel: 'average price per serving',
	          	tickFormat: (d) => {
	          		return '$' + d.toFixed(2);
	          	}
            }
		},
	};
});
