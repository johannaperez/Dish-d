app.config(function ($stateProvider) {
    $stateProvider.state('meals', {
        url: '/meals',
        templateUrl: 'js/meals/meals.html',
        controller: 'MealsCtrl'
    });
});

app.controller('MealsCtrl', function($scope, MealFactory, Session, $mdDialog){

    $scope.meals = [];

    MealFactory.getMealPlan(Session.user.id)
    .then(function(meals){
        $scope.meals = meals;
        console.log($scope.meals)
    })
    .then(function(){
        $scope.mealsLoaded = true;
    })
    // todo add error handling here.

    $scope.slickConfig = {
        adaptiveHeight: true,
        // initialSlide: 0,
        mobileFirst: true,
        slidesToScroll: 1,
        slideToShow: 1,
        method: {}
    }

     $scope.showRecipe = function(ev) {
    $mdDialog.show({
      // controller: MealsCtrl,
      template: `<md-dialog aria-label="Recipe" controller="MealsCtrl"> <md-content class="md-padding"> <md-card>
                                    <md-card-content layout="row" layout-align="space-between">
                                        <div class="md-media-xl card-media" style="background: url({{meal.image}}) center; background-size: cover; background-position: center; ">
                                        </div>
                                        <div class="recipe" layout="column">
                                            <md-card-title>
                                                <md-card-title-text>
                                                    <span class="md-headline">{{meal.title}}</span>
                                                </md-card-title-text>
                                            </md-card-title>
                                            <md-card-actions layout="row">
                                                <md-button class="md-icon-button" aria-label="Favorite">
                                                    <ng-md-icon icon="favorite"></ng-md-icon>
                                                </md-button>
                                                <md-button class="md-icon-button" aria-label="Recipe" ng-click="show-recipe()">
                                                <!-- add this to md-button to open recipe link in new tab: ng-href="{{meal.sourceUrl}}" target="_blank" -->
                                                    <i class="material-icons">room_service</i>
                                                </md-button>
                                            </md-card-actions>
                                        </div>
                                    </md-card-content>
                                </md-card></md-content> <div class="md-dialog-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>`,
      targetEvent: ev,
    })
    .then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });
  };
});

app.factory('MealFactory', function($http){

    let MealFactory = {};

    MealFactory.getMealPlan = function(userId){
        return $http.get(`api/users/${userId}/meals`)
        .then(function(response){
            return response.data;
        });
    };
    return MealFactory;
});

