'use strict';
const crypto = require('crypto');
const Sequelize = require('sequelize');

const db = require('../_db');

module.exports = db.define('mealPlan', {
  status: Sequelize.ENUM('active', 'complete')
})
