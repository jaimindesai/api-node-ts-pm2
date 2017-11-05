
import mongoose = require('mongoose');
import employeeSchema from './employee';


let employeeModel: mongoose.Model<any>;
employeeModel = mongoose.model<any>('Employees', employeeSchema, 'employees');

export default employeeModel;
