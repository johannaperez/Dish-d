app.config(function ($stateProvider){
    $stateProvider.state('prefs', {
        url: '/users/:userId/preferences',
        templateUrl: 'js/user-prefs/user-prefs.html',
        controller: 'PrefsCtrl'
    });
});

app.controller('PrefsCtrl', function ($scope, $log, $state, PrefsFactory, $stateParams) {

    PrefsFactory.getInitialPrefs($stateParams.userId)
    .then(prefs => {
        if (!prefs) {
            $scope.myPrefs = {
                vegetarian: false,
                vegan: false,
                dairyFree: false,
                glutenFree: false,
                dislikes: []
            };
        }
        else {
            $scope.myPrefs = prefs;
        }
    })
    .catch($log.error);

    PrefsFactory.getAllIngredients()
    .then(ings => {
        // console.log('INGS??', ings)
        $scope.allIngs = ings;
    })
    .catch($log.error);

    $scope.saveToMyPrefs = function(){
        return PrefsFactory.saveMyPrefs($stateParams.userId)
        .then(function(pref){
            $scope.myPrefs.dislikes.push(pref);
        })
    };

});

app.factory('PrefsFactory', function($http, $log){

    const sendResponse = response => {
        return response.data;
    }

    let prefsObj = {
        getInitialPrefs: function(userId){
            return $http.get(`/api/users/${userId}/preferences`)
            .then(sendResponse);
        },

        getAllIngredients: function(){
            return $http.get('/api/ingredients')
            .then(sendResponse);
        },

        //save my selected prefs
        saveMyPrefs: function(userId){
            return $http.post(`/api/users/${userId}/preferences`)
            .then(sendResponse)
            .catch($log.error);
        }
    }

    return prefsObj;
})

