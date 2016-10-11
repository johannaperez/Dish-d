app.controller('CategoriesCtrl', ($scope) => {
	$scope.options = {
		chart: {
			type: 'sunburstChart',
			height: 300,
			color: d3.scale.category20b(),
			duration: 250
		}
	};

	$scope.data = [{
		name: 'This week\'s meal ingredients',
		children: [
			{
				name: 'Dairy',
				children: []
			}, {
				name: 'Meat, eggs, beans, nuts',
				children: [
					{name: 'canned chickpeas', size: 30},
					{name: 'hummus', size: 30000},
					{name: 'ground lamb', size: 3000},
					{name: 'pecans', size: 3000},
				]
			}, {
				name: 'Fats, oils, sweets',
				children: [
					{name: 'honey', size: 3000},
					{name: 'olive oil', size: 30},
					{name: 'coconut oil', size: 30}
				]
			}, {
				name: 'Vegetables',
				children: [
					{name: 'chile garlic sauce', size: 8000},
					{name: 'garlic', size: 300000},
					{name: 'greens', size: 3000},
					{name: 'tomato', size: 3000},
					{name: 'shallot', size: 3000},
					{name: 'butternut squash', size: 3000},
					{name: 'celery', size: 3000},
					{name: 'yellow onion', size: 3000}
				]
			}, {
				name: 'Fruits',
				children: [
					{name: 'lemon', size: 3000},
					{name: 'dried cherries', size: 3000},
					{name: 'juice of lemon', size: 3000},
					{name: 'bosc pear', size: 3000},
					{name: 'dried cranberries', size: 3000}
				]
			}, {
				name: 'Carbs',
				children: [
					{name: 'oat flour', size: 9000},
					{name: 'wild rice', size: 3000}
				]
			}
		]
	}]; // end of data


	/* recipe.extendedIngredients.pyramidCat
		- fats, oils, sweets
		- dairy
		- meat, beans, nuts, eggs
		- vegetables
		- fruits
		- carbs
	*/

});
