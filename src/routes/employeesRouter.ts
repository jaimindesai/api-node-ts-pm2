import * as express from 'express';
import * as cors from 'cors';
import {getEmployees} from '../controllers/employeeController';


const router: express.Router = express.Router();

router.get('/employees', cors(), getEmployees);


export {router as employeesRouter};

