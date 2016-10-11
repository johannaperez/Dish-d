app.config(function ($stateProvider) {

    $stateProvider.state('myAccount', {
        url: '/my-account',
        templateUrl: 'js/my-account/my-account.html',
        data: {
            authenticate: true
        },
        controller: 'MyAccountCtrl',
        resolve: {
            currentUser: function(AuthService){
                return AuthService.getLoggedInUser();
            }
        }
    });

});

app.controller('MyAccountCtrl', function($scope, currentUser){

    $scope.userId = currentUser.id;
})

app.factory('SecretStash', function ($http) {

    var getStash = function () {
        return $http.get('/api/members/secret-stash').then(function (response) {
            return response.data;
        });
    };

    return {
        getStash: getStash
    };

});
