app.config(function ($stateProvider) {
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });
});

app.controller('SignupCtrl', function ($scope, $log, AuthService, $state, Session) {

    $scope.error = null;
    $scope.user = {};

    $scope.sendSignup = function (user) {
        $scope.error = null;
        AuthService.signup(user).then(function () {
            $state.go('prefs', {userId: Session.user.id});
        })
        .catch(function () {
            $scope.error = 'An account already exists with this email.';
        });
    };

    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function(state) {
        return {abbrev: state};
      });
});

