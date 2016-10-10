app.config(function ($stateProvider) {
    $stateProvider.state('groceries', {
        url: '/groceries',
        templateUrl: 'js/groceries/groceries.html',
        controller: 'ListCtrl'
    });
});

app.controller('ListCtrl', function($scope, ListFactory, Session) {

  $scope.items = {};


  ListFactory.getGroceryList(Session.user.id)
  .then(function(groceryList){
    console.log(groceryList);
    $scope.items = groceryList;
  });


});

app.factory('ListFactory', function($http) {

    let ListFactory = {};

    ListFactory.getGroceryList = function(userId){
        return $http.get(`api/users/${userId}/meals/grocerylist`)
        .then(function(response){
            return response.data;
        });
    }

    return ListFactory;
});
