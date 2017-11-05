
/**
 * Created by snytkind on 6/19/16.
 */

import mongoose = require('mongoose');


let address: mongoose.Schema = new mongoose.Schema({
	street1: String,
	city: String,
	state: String,
	zip: Number
});


export { address };
