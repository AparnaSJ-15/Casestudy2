const mongoose =require('mongoose');
const { stringify } = require('querystring');

//schema definition
const Schema = mongoose.Schema;

//modelling
const Employee_Detail = new Schema({
    name:String,
    location:String,
    position:String,
    salary:Number
})

// add collection name without s
const EmployeeData = mongoose.model('employee',Employee_Detail);
module.exports = EmployeeData;