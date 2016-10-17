app.controller('SpendingCtrl', ($scope, $log, currentUser, mealPlans, VisFactory) => {

	$scope.activeMealPlan = mealPlans[2];

	// set up data
	if (!mealPlans[0].length) {
		$scope.data = false;
	}
	else {
		let mps = mealPlans[0];
		// sort MPs by id (~date)
		for (let i = 0; i < mps.length - 1; i++) {
			let swapped = false;

			for (let j = 0; j < mps.length - 1; j++) {
				if (mps[j].id > mps[j + 1].id) {
					[mps[j], mps[j + 1]] = [mps[j + 1], mps[j]];
					swapped = true;
				}
			}
			if (!swapped) break;
		}

		$scope.lightMealPlans = mps;

		VisFactory.getUserPrefs(currentUser.id)
		.then(prefs => {
			$scope.numPeople = prefs.numPeople;
			$scope.data = VisFactory.buildSpendingData($scope.lightMealPlans, $scope.numPeople);
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
	}
});