app.config(function($stateProvider) {
    $stateProvider.state('groceries', {
        url: '/groceries',
        templateUrl: 'js/groceries/groceries.html',
        controller: 'ListCtrl',
        resolve: {
            currentUser: function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        },
        data: {
            authenticate: true
        }
    });
});

app.controller('ListCtrl', function($scope, $log, ListFactory, currentUser, $mdDialog) {

    $scope.userId = currentUser.id;
    $scope.getActivePlan = ListFactory.getActivePlan;

    $scope.sections = {};
    $scope.showList = false;

    ListFactory.getGroceryList(currentUser.id)
        .then(function(groceryList) {
            $scope.sections = groceryList;
            $scope.headers = Object.keys(groceryList);
            $scope.showList = $scope.headers.length;
        })

    $scope.round = ListFactory.round;

    $scope.makePDF = ListFactory.makePDF;


    //popup to show grocery cost input form
    $scope.showCostForm = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'js/groceries/groceries_cost.html',
            scope: $scope,
            preserveScope: true,
            targetEvent: ev,
            clickOutsideToClose: true
        });

        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.submitPrice = function(price) {
                let ampId = -1;
                ListFactory.getMealPlans($scope.userId)
                .then(function(mealPlans) {
                    mealPlans.forEach(mp => {
                        if (mp.status === 'active') {
                            ampId = mp.id;
                        }
                    })
                    ListFactory.submitPrice(price.toFixed(2), $scope.userId, ampId);
                    $scope.hide();
                })
                .catch($log.error)

            };
        }
    };

});

app.factory('ListFactory', function($http) {

    let ListFactory = {};

    ListFactory.round = function(number) {
        if (isNaN(number)) {
            return parseInt(number, 10);
        }
        return Math.round(number * 100) / 100;
    }

    ListFactory.getGroceryList = function(userId) {
        return $http.get(`api/users/${userId}/meals/grocerylist`)
            .then(function(response) {
                return response.data;
                // {amount, unit, unitLong, Section}
            })
            .then(function(groceryList) {
                let formatedList = {};

                for (var key in groceryList) {
                    if (!formatedList[groceryList[key].section]) {
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

    ListFactory.getMealPlans = function(userId) {
        return $http.get(`api/users/${userId}/meals/all`)
        .then(function(response) {
            return response.data[0];
        })
    }

    ListFactory.makePDF = function(groceryList) {
        let listToExport = [];
        for (let aisle in groceryList) {
            listToExport.push({ text: aisle, fontSize: 16, bold: true });
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

    ListFactory.submitPrice = function(price, userId, mealPlanId) {
        return $http.put(`api/users/${userId}/meals/${mealPlanId}`, { price: price })
        .then(function(response) {
            return response.data;
        })
    }

    return ListFactory;
});