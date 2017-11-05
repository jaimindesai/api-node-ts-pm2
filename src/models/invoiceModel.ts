
import mongoose = require('mongoose');
import {invoiceSchema} from '../schemas/invoice';

let invoiceModel: mongoose.Model<any>;
invoiceModel = mongoose.model<any>('Invoices', invoiceSchema, 'otc_invoices');

export default invoiceModel;
