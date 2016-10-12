const fs = require('fs');

let data = require('./api-responses.json');
let data2 = require('./api-responses2.json');
let data3 = require('./api-responses3.json');
let data4 = require('./api-responses4.json');
let data5 = require('./api-responses5.json');
let data6 = require('./api-responses6.json');
let data7 = require('./api-responses7.json');
let data8 = require('./api-responses8.json');
let data9 = require('./api-responses9.json');
let data10 = require('./api-responses10.json');
let data11 = require('./api-responses11.json');

data = [... data.recipes, ...data2.recipes, ...data3.recipes, ...data4.recipes, ...data5.recipes, ...data6.recipes, ...data7.recipes, ...data8.recipes, ...data9.recipes, ...data10.recipes, ...data11.recipes];
let toDelete = fs.readFileSync('./delete.txt').toString().split('\n');


toDelete.forEach(function(item){
	for (let i = 0; i < data.length; i++){
		if (data[i].id === Number(item)){
			let name = data[i].title;
			// console.log('before:', data.length);
			data.splice(i, 1);
			// console.log('after:', data.length);
			console.log('You deleted recipe #', item, name);
			// i = i - 1;
		}
	}
})


fs.writeFileSync('./theFINAL.json', JSON.stringify(data));


// prompt.start();

// function onErr(err) {
// 	console.log(err);
// 	return 1;
// }

// function getInput() {

// 	prompt.get(['input'], function (err, result){
// 		if (err) {
// 			return onErr(err);
// 		}

// 		if (result.input === 'q'){
// 			fs.writeFileSync('./theFINAL.json', JSON.stringify(data));
// 			console.log('Bye!');
// 		}

// 		else {

// 			for (let i = 0; i < data.length; i++){
// 				if (data[i].id === Number(result.input)){
// 					let name = data[i].title;
// 					console.log('before:', data.length);
// 					data.splice(i, 1);
// 					console.log('after:', data.length);
// 					console.log('You deleted recipe #' + result.input, name);
// 					// i = i - 1;
// 				}
// 			}
// 			getInput();
// 		}
// 	})

// }

// getInput();


