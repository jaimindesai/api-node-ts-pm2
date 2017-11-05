import express = require( 'express' );
import { default as employeeModel } from '../models/employeeModel';
import * as mongoose from 'mongoose';
import { logger, BoomError, ErrorTag, timer} from '../lib';
import * as Boom from 'boom';
const TAG = 'EMPLOYEE_CONTROLLER';

export async function getEmployees (req: express.Request, res: express.Response, next: express.NextFunction) {
	let filter = req.body.filter;
	let start = Date.now();

	try {

		let user = await employeeModel.find(filter ? filter : {});
		logger.debug(TAG, 'getEmployees success', {duration: timer(start, Date.now())});
		res.send(user);
	}
	catch ( err ) {
		logger.error(TAG, 'getUsers error', {error: err}, res.locals.SmHeaders);
		next(Boom.badImplementation('getUsers find method not executed', BoomError(ErrorTag.USR105, err)));
	}
}