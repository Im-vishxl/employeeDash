const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobileNo: String,
    designation: String,
    gender: String,
    course: [{ type: String }],
    image: String, 
  });

module.exports = mongoose.model('Employee', employeeSchema, 'employee');