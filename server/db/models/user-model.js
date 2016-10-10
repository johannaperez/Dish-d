'use strict';
const crypto = require('crypto');
const _ = require('lodash');
const Sequelize = require('sequelize');

const db = require('../_db');
const UserPref = require('./user-pref-model.js');

module.exports = db.define('user', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING
    },
    firstName: {
     type: Sequelize.STRING,
    },
    lastName: {
     type: Sequelize.STRING,
    },
    city: {
     type: Sequelize.STRING,
    },
    state: {
     type: Sequelize.STRING,
    },
    country: {
     type: Sequelize.STRING,
    },
    salt: {
        type: Sequelize.STRING
    },
    twitter_id: {
        type: Sequelize.STRING
    },
    facebook_id: {
        type: Sequelize.STRING
    },
    google_id: {
        type: Sequelize.STRING
    }
}, {
    instanceMethods: {
        sanitize: function () {
            return _.omit(this.toJSON(), ['password', 'salt']);
        },
        correctPassword: function (candidatePassword) {
            return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
        }
    },
    classMethods: {
        generateSalt: function () {
            return crypto.randomBytes(16).toString('base64');
        },
        encryptPassword: function (plainText, salt) {
            var hash = crypto.createHash('sha1');
            hash.update(plainText);
            hash.update(salt);
            return hash.digest('hex');
        }
    },
    hooks: {
        beforeCreate: setSaltAndPassword,
        beforeUpdate: setSaltAndPassword,
        afterCreate: function(user) {
            return UserPref.create({ userId: user.id })
        }
    }
});

function setSaltAndPassword(user) {
    if (user.changed('password')) {
        user.salt = user.Model.generateSalt();
        user.password = user.Model.encryptPassword(user.password, user.salt);
    }
}
