app.config(function ($stateProvider) {
    $stateProvider.state('myAccount', {
        url: '/my-account',
        templateUrl: 'js/my-account/my-account.html',
        abstract: true,
        data: {
            authenticate: true
        },
        controller: 'MyAccountCtrl',
        resolve: {
            currentUser: function(AuthService, MemberInfoFactory){
                return AuthService.getLoggedInUser()
                .then(function(user) {
                    return MemberInfoFactory.getUser(user.id);
                })
            },
            mealPlans: function(VisFactory, currentUser) {
                return VisFactory.getAllPlans(currentUser.id);  // [lightMP, detailedMP, activeMP]
            }
        }
    })
    .state('myAccount.charts', {
        url: '',
        views: {
            categories: {
                templateUrl: 'js/visualizations/categories/categories-vis.html',
                controller: 'CategoriesCtrl'
            },
            spending: {
                templateUrl: 'js/visualizations/spending/spending-vis.html',
                controller: 'SpendingCtrl'
            },
            overlap: {
                templateUrl: 'js/visualizations/overlap/overlap-vis.html',
                controller: 'OverlapCtrl'
            }
        }
    });
});


app.controller('MyAccountCtrl', function($scope, currentUser){
    $scope.userId = currentUser.id;
    $scope.userName = currentUser.firstName;
    $scope.userDate = currentUser.createdAt;

    $scope.userYear = $scope.userDate.slice(0, 4);
    $scope.userUpper = $scope.userName[0].toUpperCase() + $scope.userName.slice(1);

    $scope.isActiveChosen = true;

    $scope.activeHandler = () => {
        $scope.isActiveChosen = true;
        $scope.$broadcast('viewChange');
    }

    $scope.allTimeHandler = () => {
        $scope.isActiveChosen = false;
        $scope.$broadcast('viewChange');
    }
})


app.factory('MemberInfoFactory', function($http){
    return {
        getUser: (userId) => {
            return $http.get(`/api/users/${userId}`)
            .then((response) => {
                return response.data;
            })
        }
    }
});

// app.factory('SecretStash', function ($http) {
//     var getStash = function () {
//         return $http.get('/api/members/secret-stash').then(function (response) {
//             return response.data;
//         });
//     };
//     return {
//         getStash: getStash
//     };
// });
