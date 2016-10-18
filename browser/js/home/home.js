app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            currentUser: function(AuthService){
                return AuthService.getLoggedInUser();
            }
        },
        cache: true
    });
});

app.controller('HomeCtrl', function ($scope, currentUser, $mdMedia) {

    $scope.$watch(function() { return $mdMedia('xs'); }, function(small) {
        $scope.smallScreen = small;
    });

        $scope.user = currentUser;
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
        $scope.poster = 'js/home/media/mobile-pic.png'
});
