app.controller('CategoriesCtrl', ($scope) => {

	$scope.options = {
		chart: {
			type: 'sunburstChart',
			height: 500,
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
					{name: 'canned chickpeas'},
					{name: 'hummus'},
					{name: 'ground lamb'},
					{name: 'pecans'},
				]
			}, {
				name: 'Fats, oils, sweets',
				children: [
					{name: 'honey'},
					{name: 'olive oil'},
					{name: 'coconut oil'}				]
			}, {
				name: 'Vegetables',
				children: [
					{name: 'chile garlic sauce'},
					{name: 'garlic'},
					{name: 'greens'},
					{name: 'tomato'},
					{name: 'shallot'},
					{name: 'butternut squash'},
					{name: 'celery'},
					{name: 'yellow onion'}
				]
			}, {
				name: 'Fruits',
				children: [
					{name: 'lemon'},
					{name: 'dried cherries'},
					{name: 'juice of lemon'},
					{name: 'bosc pear'},
					{name: 'dried cranberries'}
				]
			}, {
				name: 'Carbs',
				children: [
					{name: 'oat flour'},
					{name: 'wild rice'}
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
