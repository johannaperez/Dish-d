app.controller('SpendingCtrl', ($scope) => {
	$scope.options = {
		chart: {
			type: 'lineChart',
			height: 300,
			margin: {
				top: 20,
				right: 20,
				bottom: 50,
				left: 65
			},
			x: (d) => { return d[0] },
			y: (d) => { return d[1] },

			color: d3.scale.category10().range(),
            useInteractiveGuideline: true,

            xAxis: {
            	axisLabel: 'meal'
            },

            yAxis: {
	          	axisLabel: 'price per serving'
            }
		},
	};

	$scope.data = [{
		key: 'Marley Spoon',
		values: [[1, 10.33], [2, 10.33], [3, 10.33], [4, 10.33], [5, 10.33], [6, 10.33]]	// $62
	}, {
		key: 'Blue Apron',
		values: [[1, 9.99], [2, 9.99], [3, 9.99], [4, 9.99], [5, 9.99], [6, 9.99]]	// $59.94
	}, {
		key: 'Dish\'d',
		values: [
			[1, 2.99], [2, 7.34], [3, 1.52], [4, 2.57], [5, 3.87], [6, 4.70]]
	}]

});
