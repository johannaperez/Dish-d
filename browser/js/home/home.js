app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeCtrl'
    });
});

app.controller('homeCtrl', ['$scope', function ($scope) {
        $scope.resources = [
            'http://techslides.com/demos/sample-videos/small.webm',
            '*.ogv',
            '*.mp4',
            '*.swf'
        ];
        $scope.poster = 'http://placehold.it/2000&text=you%20may%20want%20to%20have%20a%20poster';
        $scope.fullScreen = true;
        $scope.muted = true;
        $scope.zIndex = '10';
        $scope.playInfo = {};
        $scope.pausePlay = true;
    }]);
