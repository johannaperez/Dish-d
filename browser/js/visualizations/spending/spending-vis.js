app.controller('SpendingCtrl', ($scope, $log, currentUser, activeMealPlan, VisFactory) => {

	$scope.activeMealPlan = [activeMealPlan[0]];
	$scope.lightActiveMealPlan = activeMealPlan[1];

	VisFactory.getCompletedMealPlans(currentUser.id)
	.then(mpArr => {
		$scope.lightCompletedMealPlans = mpArr[0];
		$scope.completedMealPlans = mpArr[1];
	})
	.then(() => {
		VisFactory.getUserPrefs(currentUser.id)
		.then(prefs => {
			$scope.numPeople = prefs.numPeople;
			let loadedMealArr = [...$scope.completedMealPlans, ...$scope.activeMealPlan];
			let lightMealArr = [...$scope.lightCompletedMealPlans, $scope.lightActiveMealPlan];
			$scope.data = VisFactory.buildSpendingData(loadedMealArr, lightMealArr, $scope.numPeople);
		})
		.catch($log.error);
	})
	.catch($log.error);

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
            	axisLabel: 'meal'
            },

            yAxis: {
	          	axisLabel: 'price per serving',
	          	tickFormat: (d) => {
	          		return '$' + d.toFixed(2);
	          	}
            }
		},
	};
});
