app.config(function ($stateProvider) {

    $stateProvider.state('meals', {
        url: '/meals',
        templateUrl: 'js/meals/meals.html',
    });
});

app.controller('Meals', function($scope){
    $scope.slickConfig = {
        method: {
            slickPrev: () => {
                console.log('previous recipe suggestion')
            },
            slickNext: () => {
                console.log('next recipe suggestion')
            }

        }
    }
});
