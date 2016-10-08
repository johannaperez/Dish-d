app.config(function ($stateProvider) {
    $stateProvider.state('meals', {
        url: '/meals',
        templateUrl: 'js/meals/meals.html',
        controller: 'MealsCtrl'
    });
});

app.controller('MealsCtrl', function($scope){
    $scope.meals = [{
        title: 'salad',
        url: 'https://lighterphotos-production.s3.amazonaws.com/uploads/recipe/image/1519/SuperSeedSalad6773.jpg'
        },
        {
        title: 'other thing',
        url: `https://lighterphotos-production.s3.amazonaws.com/uploads/recipe/image/1084/2EnergizingMuesliFreshBerries__MelissaBlackall__-8.jpg`
    }
    ];

    $scope.slickConfig = {
        adaptiveHeight: true,
        // initialSlide: 0,
        mobileFirst: true,
        slidesToScroll: 1,
        slideToShow: 1,
        method: {}
    }
});
