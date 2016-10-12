// These code snippets use an open-source library. http://unirest.io/nodejs
const unirest = require('unirest');
const fs = require('fs');
const key = require('./api-key.js');

unirest.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=100')
.header('X-Mashape-Key', key)
.header('Accept', 'application/json')
.end(function (result) {
  console.log(result.status, result.headers, result.body);
  fs.writeFileSync('./api-responses11.json', JSON.stringify(result.body));
});

