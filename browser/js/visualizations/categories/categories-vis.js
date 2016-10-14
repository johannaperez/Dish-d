app.controller('CategoriesCtrl', ($scope, $log, currentUser, activeMealPlan, VisFactory) => {

	$scope.activeMealPlan = activeMealPlan[0];
	$scope.data = VisFactory.buildCategoryData($scope.activeMealPlan);

	$scope.options = {
		chart: {
			type: 'sunburstChart',
			height: 600,
			color: d3.scale.category20b(),
			duration: 250
		}
	};
});
