import * as winston from 'winston';


const logLevel = 'debug';

let logFormatter = function (options: any): string {
	let timestamp = function () {
		let dt = new Date();

		let ret = dt.toISOString().replace('000Z', dt.getMilliseconds() + 'Z');

		return ret;
	};
	return 'EventTime=' + timestamp() + ' [' + options.level.toUpperCase() + '] - ' + (undefined !== options.message ? options.message : '');
}

export const logger = new (winston.Logger)({
	level: logLevel,

	transports: [

		new (winston.transports.Console)({
			formatter: logFormatter
		})
	]
});


export const timer: Function = (startTime, endTime) => {
	return endTime - startTime;
};