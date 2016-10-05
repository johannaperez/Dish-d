'use strict';

var router = require('express').Router(); // eslint-disable-line new-cap

router.use('/members', require('./members'));
router.use('/signup', require('./signup'));
router.use('/api/preferences', require('./user-pref'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res, next) {
    var err = new Error('Not found.');
    err.status = 404;
    next(err);
});

module.exports = router;
