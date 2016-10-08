app.config(function ($stateProvider){
    $stateProvider.state('prefs', {
        url: '/users/:userId/preferences',
        templateUrl: 'js/user-prefs/user-prefs.html',
        controller: 'PrefsCtrl'
    });
});

app.controller('PrefsCtrl', function ($scope, $log, $state, PrefsFactory, $stateParams, Session) {

    // console.log('Session id', Session.user.id);
    // console.log('State params', $stateParams.userId);
    $scope.userId = Session.user.id;
    PrefsFactory.getInitialPrefs($stateParams.userId)
    .then(prefs => {
        $scope.myPrefs = prefs;
    })
    .catch($log.error);


    PrefsFactory.getAllIngredients()
    .then(ings => {
        $scope.allIngs = ings;
    })
    .catch($log.error);


    $scope.queryFilter = query => {
        if (query) {
            return $scope.allIngs.filter(ing => {
                return ing.name.includes(query)
            });
        }
        else {
            return $scope.allIngs;
        }
    };

    $scope.addDislikes = selectedItem => {
        if (selectedItem !== null) $scope.myPrefs.dislikes.push(selectedItem);
        $scope.searchText = ''; // reset search bar
    };

    $scope.removeDislike = itemToDelete => {
        $scope.myPrefs.dislikes.splice($scope.myPrefs.dislikes.indexOf(itemToDelete), 1);
    };

    $scope.savePrefs = () => {
        return PrefsFactory.savePrefs($stateParams.userId, $scope.myPrefs);
    };
});


app.factory('PrefsFactory', function($http, $log){

    const sendResponse = response => {
        return response.data;
    }

    let obj = {
        getInitialPrefs: userId => {
            return $http.get(`/api/users/${userId}/preferences`)
            .then(sendResponse);
        },

        getAllIngredients: () => {
            return $http.get('/api/ingredients')
            .then(sendResponse);
        },

        savePrefs: (userId, prefsObj) => {
            return $http.put(`/api/users/${userId}/preferences`, prefsObj)
            .then(sendResponse)
            .catch($log.error);
        }
    }

    return obj;
})
