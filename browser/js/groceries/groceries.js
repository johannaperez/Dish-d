app.config(function ($stateProvider) {
    $stateProvider.state('groceries', {
        url: '/groceries',
        templateUrl: 'js/groceries/groceries.html',
        controller: 'ListCtrl'
    });
});

app.controller('ListCtrl', function($scope) {
  $scope.items = [
    { name: 'Pepperoni', wanted: true },
    { name: 'Sausage', wanted: false },
    { name: 'Black Olives', wanted: true },
    { name: 'Green Peppers', wanted: false }
  ];
});

