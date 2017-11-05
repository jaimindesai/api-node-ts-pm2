import * as express from 'express';
import { ErrorTag } from "./lib/boomError";


export interface IErrorHandlers {
	notFound(req: express.Request, res: express.Response, next: express.NextFunction): void;
}

interface INodeError extends Error {
	inner?: {
		name: string;
		message: string;
		expiredAt: string;
	};
	output: {
		statusCode: number;
		errorTag: string;
		transactionId: string;
		data: any;
	},
	data: any,
	status: number;
}
const ERROR_CODES = {
	404: 'Sorry cant find that!'
};


const TAG = 'ERROR_HANDLER';
export class ErrorHandlers implements IErrorHandlers {
	public app: express.Express;
	constructor(app) {
		this.app = app;
		return this;
	}
	notFound = function (req: express.Request, res: express.Response, next: express.NextFunction) {

		res.status(404)
			.send(ERROR_CODES[404]);
	};
	catchAll = (err: INodeError, req: express.Request, res: express.Response, next: express.NextFunction) => {
		// development error handler
		// will print stacktrace
		const ENV = this.app.get('env');
		const errorCode = (err.output) ? err.output.statusCode : 500;

	
		if ( err.output ) {
			if ( err.data ) {
				err.output.errorTag 	= err.data.errorTag;
			}
			err.output.transactionId 	= res.locals.SmHeaders.sm_transactionid;
			res.status(errorCode).send(err.output);
		}
		else {
			res.status(errorCode).send(err);
		}
	};


}

