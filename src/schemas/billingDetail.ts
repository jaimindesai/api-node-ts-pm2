
/**
 * Created by snytkind on 6/19/16.
 */

import mongoose = require('mongoose');


let billingDetailSchema: mongoose.Schema = new mongoose.Schema({
	product: String,
	pe_code: String,
	company: String,
	gross: Number,
	discount: String,
	promotion: String,
	tax: String

});


export default billingDetailSchema;
