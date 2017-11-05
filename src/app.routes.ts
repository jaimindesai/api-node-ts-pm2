
import {invoiceRouter} from './routes/invoiceRouter';
import {userRouter} from './routes/userRouter';
import {employeesRouter} from './routes/employeesRouter';


export function setRootRoutes (app) {
		console.log('Inside Users');
		app.use('/invoice', invoiceRouter);
		app.use('/', userRouter);
		app.use('/', employeesRouter);

}


