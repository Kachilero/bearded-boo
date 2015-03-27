/**
 * Created by alejandrocerro on 3/27/15.
 */

var employeeDb = require('../database/employees');

exports.getEmployees = getEmployees;
exports.getSingleEmployee = getSingleEmployee;

function getEmployees(callback){
  setTimeout(function () {
    callback(null, employeeDb);
  },500);
}

function getSingleEmployee(employeeId, callback){
  getEmployees(function(error,data){
    if(error){ return callback(error); }

    var result = data.find(function(item){
      return item.id === employeeId;
    });

    callback(null,result);
  });
}