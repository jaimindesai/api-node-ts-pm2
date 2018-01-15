
import * as express from 'express';
import * as path from 'path';
import {setRootRoutes} from './app.routes';
import {ErrorHandlers} from './app.errors'
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');


let app: express.Express = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/*
 * MiddleWare
 */

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

/*
 * App Routes
 * */
setRootRoutes(app);

/*
 Error Handlers
 */
// catch 404 and forward to error handler
let errorHandler = new ErrorHandlers(app);
app.use(errorHandler.notFound);
app.use(errorHandler.catchAll);

console.log('END OF APP.js');
export default app;
