app.config(function ($stateProvider) {
    $stateProvider.state('groceries', {
        url: '/groceries',
        templateUrl: 'js/groceries/groceries.html',
        controller: 'ListCtrl'
    });
});

app.controller('ListCtrl', function($scope, ListFactory, Session) {

  $scope.sections = {};


  ListFactory.getGroceryList(Session.user.id)
  .then(function(groceryList){
    $scope.sections = groceryList;
    $scope.headers = Object.keys(groceryList); 
  });

  $scope.round = function(number){
    if (isNaN(number)){
        return parseInt(number, 10);
    }
    return Math.round(number * 100) / 100;
  }


});

app.factory('ListFactory', function($http) {

    let ListFactory = {};

    ListFactory.getGroceryList = function(userId){
        return $http.get(`api/users/${userId}/meals/grocerylist`)
        .then(function(response){
            return response.data;
            // {amount, unit, unitLong, Section}
        })
        .then(function(groceryList){
            let formatedList = {};

            for (var key in groceryList){
                if (!formatedList[groceryList[key].section]){
                    formatedList[groceryList[key].section] = [];
                }
                let newItem = {
                    name: key,
                    amount: groceryList[key].amount,
                    unit: groceryList[key].unitShort,
                    unitLong: groceryList[key].unitLong,
                    section: groceryList[key].aisle
                }
                formatedList[groceryList[key].section].push(newItem)
            }

            return formatedList;
        });

    }

    return ListFactory;
});
