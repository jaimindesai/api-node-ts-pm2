import * as express from 'express';
import { UserModel } from '../models/users.model';
import { logger,BoomError, ErrorTag,timer } from '../lib';
import * as Boom from 'boom';
const TAG = 'USERS_CONTROLLER';
function MongoError(error: any): string {

	// Switch on the error code.
	switch (error.code) {
		// Duplicate Key error.
		case 11000:
			return 'The selected user already exists in the system.';
	}

	return '';
}

export async function putUser (req: express.Request, res: express.Response, next: express.NextFunction) {

		const start = Date.now();
		let currentUser = 'desaij',
			userObj     = req.body.user;

		logger.debug(TAG, 'putUser start', {user: userObj});
		if ( userObj ) {
			userObj.updated_by = currentUser;
			userObj.created_by = currentUser;
			let userModel = new UserModel(userObj);
			try {
				let user = await userModel.save();
				logger.debug(TAG, 'put User Success', {
					user: user,
					id:   req.params.id
				});
				res.send(user);
			}
			catch ( err ) {
				// Default Error message.
				let message = 'putUser save method not executed';
				if(err.name) {
					switch (err.name) {

						// Mongo Native driver errors.
						case 'MongoError':
							message = MongoError(err) || message;
							break;

						// Mongoose Validation errors.
						case 'ValidationError':
							// Mongoose Model fields failed validation.
							message = 'Invalid user data supplied.';
							break;
					}

				}

				logger.error(TAG, 'AWAIT ERROR', {error: err});
				next(Boom.badRequest(message, BoomError(ErrorTag.USR101)));
			}
		}
		else {
			logger.error(TAG, 'putUser error', {error: 'No \'user\' information is available in this request.'});
			next(Boom.badRequest('No \'user\' information is available in this request.', BoomError(ErrorTag.USR102)));
		}
}
export async function getUser (req: express.Request, res: express.Response, next: express.NextFunction) {
	logger.debug(TAG, 'getUser start', {id: req.params.id});
	const start = Date.now();
	let userModel = UserModel;
	let id = req.params.id;

	if ( id ) {
		id = id.toString();
	
	}
	try {
		let user = await userModel.findOne({
			$or: [
				{assocId: id},
				{userName: id.toLowerCase()},
				{email: id.toLowerCase()}
			]
		});
		logger.debug(TAG, 'getUser success', {duration: timer(start, Date.now())}, res.locals.SmHeaders);
		res.send(user);
	}
	catch ( err ) {
		logger.error(TAG, 'getUsers error', {error: err}, res.locals.SmHeaders);
		next(Boom.badImplementation('getUsers findOne method not executed', BoomError(ErrorTag.USR106, err)));
	}
}
export async function getUsers (req: express.Request, res: express.Response, next: express.NextFunction) {
	let filter = req.body.filter;
	let start = Date.now();

	try {

		let user = await UserModel.find(filter ? filter : {}).sort({'associate.last_name': 1});
		logger.debug(TAG, 'getUsers success', {duration: timer(start, Date.now())});
		res.send(user);
	}
	catch ( err ) {
		logger.error(TAG, 'getUsers error', {error: err}, res.locals.SmHeaders);
		next(Boom.badImplementation('getUsers find method not executed', BoomError(ErrorTag.USR105, err)));
	}
}