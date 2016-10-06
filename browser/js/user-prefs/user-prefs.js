app.config(function ($stateProvider){
    $stateProvider.state('prefs', {
        url: '/users/:userId/preferences',
        templateUrl: 'js/user-prefs/user-prefs.html',
        controller: 'PrefsCtrl'
    });
});

app.controller('PrefsCtrl', function ($scope, $log, $state, PrefsFactory, $stateParams) {

    $scope.frontendDislikes = [];

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
        $scope.allIngs = ings;
    })
    .catch($log.error);


    $scope.queryFilter = (query) => {
        if (query) {
            return $scope.allIngs.filter(ing => {
                return ing.name.includes(query)
            });
        }
        else {
            return $scope.allIngs;
        }
    };


    $scope.updateDislikes = selectedItem => {
        $scope.myPrefs.dislikes.push(selectedItem.id);  // ing ID for db
        $scope.frontendDislikes.push(selectedItem);     // whole ingredient object
    };

});


app.factory('PrefsFactory', function($http, $log){

    const sendResponse = response => {
        return response.data;
    }

    let prefsObj = {
        getInitialPrefs: userId => {
            return $http.get(`/api/users/${userId}/preferences`)
            .then(sendResponse);
        },

        getAllIngredients: () => {
            return $http.get('/api/ingredients')
            .then(sendResponse);
        },

        //save my selected prefs
        saveMyPrefs: userId => {
            return $http.post(`/api/users/${userId}/preferences`)
            .then(sendResponse)
            .catch($log.error);
        }
    }

    return prefsObj;
})

