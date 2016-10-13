app.config(function ($stateProvider) {
    $stateProvider.state('groceries', {
        url: '/groceries',
        templateUrl: 'js/groceries/groceries.html',
        controller: 'ListCtrl',
        resolve: {
            currentUser: function(AuthService){
                return AuthService.getLoggedInUser();
            }
        },
        data: {
            authenticate: true
        }
    });
});

app.controller('ListCtrl', function($scope, ListFactory, currentUser) {

  $scope.sections = {};


  ListFactory.getGroceryList(currentUser.id)
  .then(function(groceryList){
    $scope.sections = groceryList;
    $scope.headers = Object.keys(groceryList);
  })

  $scope.round = ListFactory.round;

  $scope.makePDF = ListFactory.makePDF;

});

app.factory('ListFactory', function($http) {

    let ListFactory = {};

    ListFactory.round = function(number){
    if (isNaN(number)){
        return parseInt(number, 10);
    }
    return Math.round(number * 100) / 100;
    }

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

    ListFactory.makePDF = function(groceryList){


        let listToExport = [];
        for (let aisle in groceryList){
            listToExport.push({text: aisle, fontSize: 16, bold: true});
            listToExport.push({
                ul: groceryList[aisle].map(item => `${item.name}: ${ListFactory.round(item.amount)} ${item.unitLong}`)
            })
        }

        let docDefinition = {
            content: listToExport
        }
        console.log(docDefinition);

        pdfMake.createPdf(docDefinition).download('grocerylist.pdf');

    }

    return ListFactory;
});
