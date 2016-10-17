/* eslint-disable */

app.controller('CategoriesCtrl', ($scope, $log, currentUser, mealPlans, VisFactory) => {

	$scope.activeMealPlan = mealPlans[2];

	$scope.allMealPlans = [];
	mealPlans[1].forEach(mp => {
		$scope.allMealPlans = [...$scope.allMealPlans, ...mp]
	});

	if ($scope.activeMealPlan) {
		$scope.activeData = VisFactory.buildCategoryData($scope.activeMealPlan);
	}

	$scope.allData = VisFactory.buildCategoryData($scope.allMealPlans);

	$scope.data = $scope.activeData;

	$scope.$on('viewChange', () => {
		if ($scope.isActiveChosen) {
			$scope.data = $scope.activeData;
		}
		else {
			$scope.data = $scope.allData;
		}
	})

	$scope.options = {
		chart: {
			type: 'sunburstChart',
			height: 600,
			color: d3.scale.category20b(),
			duration: 250
		}
	};
});
