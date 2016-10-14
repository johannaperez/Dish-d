app.controller('SpendingCtrl', ($scope, currentUser) => {

	$scope.options = {
		chart: {
			type: 'lineChart',
			height: 500,
			margin: {
				top: 20,
				right: 400,
				bottom: 50,
				left: 400
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

	// nv.utils.windowResize = function(scope, handler) {
	//     // Legacy support
	//     if (typeof scope === 'function') {
	//         handler = scope;
	//         scope = undefined;
	//         nv.deprecated('WARNING: Failed to pass $scope when binding to windowResize event');
	//     }

	//     if (window.addEventListener) {
	//         window.addEventListener('resize', handler);
	//     } else {
	//         nv.log("ERROR: Failed to bind to window.resize with: ", handler);
	//     }
	//     // return object with clear function to remove the single added callback.
	//     var retObj = {
	//         callback: handler,
	//         clear: function() {
	//             window.removeEventListener('resize', handler);
	//         }
	//     };

	//     // Hookup our auto-destroy if passed scope
	//     if (scope){
	//         scope.$on('$destroy', function(){
	//             'use strict';
	//             retObj.clear();
	//         });
	//     }

	//     return retObj;
	// };
});
