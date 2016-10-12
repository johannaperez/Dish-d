app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeCtrl',
        resolve: {
            currentUser: function(AuthService){
                return AuthService.getLoggedInUser();
            }
        },
        cache: false
    });
});

app.controller('homeCtrl', ['$scope', function ($scope, currentUser) {
        $scope.user = currentUser;
        console.log("CURRENT USER:", currentUser);

        $scope.resources = [
            '*.ogv',
            'js/home/media/girls_cooking.mp4',
            '*.swf'
        ];
        $scope.fullScreen = true;
        $scope.muted = true;
        $scope.zIndex = '10';
        $scope.playInfo = {};
        $scope.pausePlay = true;
    }]);
