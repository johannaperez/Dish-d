app.controller('CategoriesCtrl', ($scope, $log, currentUser, mealPlans, VisFactory) => {

	$scope.activeMealPlan = mealPlans[2];
	if ($scope.activeMealPlan) {
		$scope.data = VisFactory.buildCategoryData($scope.activeMealPlan);
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
