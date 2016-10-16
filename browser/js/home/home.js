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

        $scope.user = currentUser;
        // $scope.smallScreen = $mdMedia('xs');
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
        $scope.poster = 'https://d16cs9nbg8x6iq.cloudfront.net/p/?url=https%3A%2F%2Fd16cs9nbg8x6iq.cloudfront.net%2Fi%2Ffe902e541218c945bce86f6c0f8faf01%2F&q=75&w=1928&h=868&opt=1&fmt=webp'
});
