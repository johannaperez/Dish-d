app.controller('CategoriesCtrl', ($scope, $log, currentUser, activeMealPlan, VisFactory) => {
	console.log('AMP??', activeMealPlan)

	if (activeMealPlan.length < 6) {
		$scope.activeMealPlan = activeMealPlan[0];
		$scope.data = VisFactory.buildCategoryData($scope.activeMealPlan);
	}
	else {
		// display all-time data or add placeholder
		// ng-show scope property that will toggle placeholder
	}

	$scope.options = {
		chart: {
			type: 'sunburstChart',
			height: 600,
			color: d3.scale.category20b(),
			duration: 250
		}
	};
});
