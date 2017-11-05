import express = require( 'express' );
import { default as invoiceModel } from '../models/invoiceModel';
import * as mongoose from 'mongoose';
import * as Boom from 'boom';
import { BoomError,ErrorTag } from "../lib";
import { logger } from '../lib/logger';

let TAG = 'INVOICE-CONTROLLER';


export const findAccount = (filter: any) => {

	return new Promise((resolve, reject) => {
		invoiceModel.findOne(filter, function (err: mongoose.Error, data: any) {
			if ( err ) {
				return reject(err);
			}
			else {
				return resolve(data);
			}
		});
	})


}

export const findAccounts = (filter: any) => {

	return new Promise((resolve, reject) => {
		invoiceModel.find(filter, function (err: mongoose.Error, data: any) {
			if ( err ) {
				return reject(err);
			}
			else {
				return resolve(data);
			}
		});
	})


}
export function listInvoices (req: express.Request, res: express.Response, next: express.NextFunction) {
	findAccounts({})
		.then((data) => res.json(data))
		.catch((err) => next(Boom.badImplementation('Find multiple Account in Invoices', BoomError(ErrorTag.INV100, err))));

}

export function byAccount (req: express.Request, res: express.Response, next: express.NextFunction) {
	let accountID = req.params.account.toString();

	findAccount({account: accountID})
		.then((data) => res.json(data))
		.catch((err) => next(Boom.badImplementation('Find Account in Invoices', BoomError(ErrorTag.INV101, err))));
}




