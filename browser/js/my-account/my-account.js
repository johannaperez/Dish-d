app.config(function ($stateProvider) {

    $stateProvider.state('myAccount', {
        url: '/my-account',
        templateUrl: 'js/my-account/my-account.html',
        // controller: function ($scope, SecretStash) {
        //     SecretStash.getStash().then(function (stash) {
        //         $scope.stash = stash;
        //     });
        // },
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        }
    });

});

app.factory('SecretStash', function ($http) {

    var getStash = function () {
        return $http.get('/api/members/secret-stash').then(function (response) {
            return response.data;
        });
    };

    return {
        getStash: getStash
    };

});
