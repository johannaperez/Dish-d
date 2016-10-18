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

app.controller('AboutCtrl', function ($scope, currentUser, $mdMedia) {
        $scope.user = currentUser;

        $scope.$watch(function() { return $mdMedia('xs'); }, function(small) {
        $scope.smallScreen = small;
    });
});
