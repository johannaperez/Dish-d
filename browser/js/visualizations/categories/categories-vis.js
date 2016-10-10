app.controller('CategoriesCtrl', ($scope) => {
	$scope.options = {

	};

	$scope.data = {
		name: 'I ate...',
		children: [
		{
			name: 'Dairy',
			children: [
				{name: 'milk', size: number}
			]
		}, {
			name: 'Meat, eggs, nuts',
			children: [
				{}
			]
		}, {
			name: 'Fats, oils, sweets',
			children: [
				{}
			]
		}, {
			name: 'Vegetables',
			children: [
				{}
			]
		}, {
			name: 'Fruits',
			children: [
				{}
			]
		}, {
			name: 'Carbs',
			children: [
				{}
			]
		}]
	} // end of data

});
