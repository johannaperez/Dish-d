app.config(function ($stateProvider) {
    $stateProvider.state('about', {
        url: '/about',
        templateUrl: 'js/about/about.html',
        controller: 'AboutCtrl',
        resolve: {
            currentUser: function(AuthService){
                return AuthService.getLoggedInUser();
            }
        }
    });
});

app.controller('AboutCtrl', function ($scope, currentUser) {
        $scope.user = currentUser;
});
