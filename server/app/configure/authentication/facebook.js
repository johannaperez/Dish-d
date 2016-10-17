'use strict';
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (app, db) {

    var User = db.model('user');

    var facebookConfig = app.getValue('env').FACEBOOK;

    var facebookCredentials = {
        clientID: facebookConfig.clientID,
        clientSecret: facebookConfig.clientSecret,
        callbackURL: facebookConfig.callbackURL
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {
        //get user's first name via fb oauth
        let name = profile.displayName
        let info = {
            firstName: name.split(' ')[0],
            lastName: name.split(' ').slice(1).join(' '),
        };

        console.log('PROFILE \n\n', profile)

        User.findOne({
                where: {
                    facebook_id: profile.id
                }
            })
            .then(function (user) {
                if (user) {
                    return user;
                } else {
                    return User.create({
                        facebook_id: profile.id,
                        firstName: info.firstName,
                        lastName: info.lastName
                    });
                }
            })
            .then(function (userToLogin) {
                done(null, userToLogin);
            })
            .catch(function (err) {
                console.error('Error creating user from Facebook authentication', err);
                done(err);
            })

    };

    passport.use(new FacebookStrategy(facebookCredentials, verifyCallback));

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {failureRedirect: '/login'}),
        function (req, res) {
            res.redirect('/');
        });

};
