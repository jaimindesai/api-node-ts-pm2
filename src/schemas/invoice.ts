import mongoose = require('mongoose');
import { activity } from './activity';
import { address as addressSchema } from './address';
import { default as billingDetail } from './billingDetail';


let invoiceSchema: mongoose.Schema = new mongoose.Schema({
	account:         Number,
	invoice:         Number,
	pe_code:         [ String ],
	invoice_date:    String,
	due_date:        String,
	company:         String,
	purchase_order:  String,
	billing_details: [ billingDetail ],
	address:         addressSchema,
	total:           Number,
	balance:         Number,
	activities:      [ activity ]
});


export { invoiceSchema };
