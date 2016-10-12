app.config(function ($stateProvider) {

    $stateProvider.state('myAccount', {
        url: '/my-account',
        templateUrl: 'js/my-account/my-account.html',
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
            }
        }
    });

});

app.controller('MyAccountCtrl', function($scope, currentUser){
    $scope.userId = currentUser.id;
    $scope.userName = currentUser.firstName;
    $scope.userDate = currentUser.createdAt;

    $scope.userYear = $scope.userDate.slice(0,4);
    $scope.userUpper = $scope.userName[0].toUpperCase() + $scope.userName.slice(1);
})

app.factory('MemberInfoFactory', function($http){
    return {
        getUser : function(userId){
            return $http.get(`/api/users/${userId}`)
            .then(function(response){
                // console.log('RES??', response);
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
