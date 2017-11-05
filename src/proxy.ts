/**
 * Module dependencies.
 */

import * as mongoose from 'mongoose';
(mongoose as any).Promise = Promise;
import app from './app';


import * as http from 'http';
import * as https from 'https';

import * as fs from 'fs';


/**
 * Start Config
 *
 */

let MONGO_URI: string ="mongodb://localhost:27017/otc01b";

if (process.env.MONGODB_PORT) {
	console.log('DETECTED Linked mongodb container');

	MONGO_URI = MONGO_URI.replace('localhost', 'mongodb');
	console.log('MONGO_URI in container: ', MONGO_URI);
}


/**
 * Get port from environment and store in Express.
 */
let port = 3003;


port = normalizePort(port);
app.set('port', port);



/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server 'error' event.
 */

function onError(error) {

	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server 'listening' event.
 */

function onListening() {

	const addr = server.address();
	const bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;

}

function listen() {
	if (app.get('env') === 'test') return;
	server.listen(port);


	console.log('Express app started on port ' + port);
}



let mongodbConnection = connectToMongodb().once('open', function () {
	console.log('Connected to MONGODB');
});

mongodbConnection.on('disconnected', function (e) {
	console.log('Disconnected from MongoDB', (e || 'OK'));
}).on('error', function (e) {
	console.log('Got MongoDB Error', e);
});

function connectToMongodb(): mongoose.Connection {

	let options = {
		server: {
			socketOptions: {
				keepAlive: 1
			}
		},
		promiseLibrary: Promise
	};
	return mongoose.connect(MONGO_URI, options, (err) => {
		if (err) {
			console.error('Mongo Connection Error: ', err);
		} else {
			console.log('MongoDB Connected with no error');
			listen();
		}
	}).connection;
}


process.on('SIGINT', function () {
	console.log('ON-SIGINT');

	mongoose.disconnect((e) => {
		if (e) {
			console.log('MONGO-DISCONNECT-ERROR', e);
		} else {
			console.log('MONGO-DISCONNECTED');
		}

		setTimeout(function () {
			process.exit(0);
		}, 1000);
	});
});

process.on('SIGTERM', function () {
	console.log('ON-SIGTERM');

	mongoose.disconnect(() => {
		console.log('DISCONNECTED');
		process.exit(0);
	});
});
export default server;


