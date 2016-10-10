app.controller('CategoriesCtrl', ($scope) => {
	$scope.options = {
		chart: {
			type: 'sunburstChart',
			height: 300,
			color: d3.scale.category20c(),
			duration: 250
		}
	};

	$scope.data = [{
		name: 'I ate...',
		children: [
			{
				name: 'Dairy',
				children: [
					{name: 'milk', size: 5000}
				]
			}, {
				name: 'Meat, eggs, nuts',
				children: [
					{name: 'eggs', size: 3000}
				]
			}, {
				name: 'Fats, oils, sweets',
				children: [
					{name: 'donuts', size: 1000}
				]
			}, {
				name: 'Vegetables',
				children: [
					{name: 'carrots', size: 8000}
				]
			}, {
				name: 'Fruits',
				children: [
					{name: 'strawberries', size: 3000}
				]
			}, {
				name: 'Carbs',
				children: [
					{name: 'tortelini', size: 9000}
				]
			}
		]
	}]; // end of data

});
