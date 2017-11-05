import mongoose = require('mongoose');


let employeeSchema: mongoose.Schema = new mongoose.Schema({
    employerId: Number,
    name: String,
    email: String,
    phone: String
});


export default employeeSchema;
