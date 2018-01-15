

import mongoose = require('mongoose');


let address: mongoose.Schema = new mongoose.Schema({
	street1: String,
	city: String,
	state: String,
	zip: Number
});


export { address };
