app.controller('CategoriesCtrl', ($scope, $log, $q, currentUser, VisFactory) => {

	VisFactory.getActiveMealPlan(currentUser.id)
	.then(mealPlan => {
		// array of recipe objects in active mealPlan
		$scope.activeMealPlan = mealPlan;
		$scope.data = VisFactory.buildCategoryData($scope.activeMealPlan);
	})
	.catch($log.error);

	$scope.options = {
		chart: {
			type: 'sunburstChart',
			height: 500,
			color: d3.scale.category20b(),
			duration: 250
		}
	};

});
