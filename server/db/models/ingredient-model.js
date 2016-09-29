'use strict';

const Sequelize = require('sequelize');
const db = require('../_db.js');

let Ingredient = db.define('ingredient', {
	// SCHEMA
	apiIngId: {
		type: Sequelize.INTEGER
	},
	name: {
		type: Sequelize.STRING
	}
}, {
	// OPTIONS
});

module.exports = Ingredient;
