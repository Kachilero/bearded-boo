/**
 * Created by alejandrocerro on 3/27/15.
 */

var mongoose    = require('mongoose');

var Employee    = mongoose.model("Employee");

exports.getMultiEmployees = getMultiEmployees;
exports.getEmployees      = getEmployee;

function getMultiEmployees(callback){
  Employee.find().sort("name.last").exec(callback);
}

function getEmployee(employeeId, callback){
  Employee.findOne({
    id: employeeId
  }).populate("team").exec(callback);
}