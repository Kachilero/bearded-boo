/**
 * Created by alejandrocerro on 4/3/15.
 */
var async     = require('async'),
    mongoose  = require('mongoose'),
    color     = require('colors');

require(process.cwd() + "/lib/connection");

var Employee  = mongoose.model("Employee"),
    Team      = mongoose.model("Team");

var data = {
  employees: [
    {
      id: '1000003',
      name: {
        first: "Colin",
        last: 'Ihrig'
      },
      image: 'img/employee/1000003.png',
      address: {
        lines: [ '11 Wall Street' ],
        city: "New York",
        state: "NY",
        zip: 10118
      }
    },
    {
      id: '1000021',
      name: {
        first: 'Adam',
        last: 'Bretz'
      },
      address: {
        lines: ['46 18th St', 'St. 210'],
        city: 'Pittsburgh',
        state: 'PA',
        zip: 15222
      }
    },
    {
      id: '1000022',
      name: {
        first: 'Matt',
        last: 'Liegey'
      },
      address: {
        lines: ['2 S Market Square', '(Market Square)'],
        city: 'Pittsburgh',
        state: 'PA',
        zip: 15222
      }
    },
    {
      id: '1000025',
      name: {
        first: 'Aleksey',
        last: 'Smolenchuk'
      },
      image: 'images/employees/1000025.png' /* invalid image */,
      address: {
        lines: ['3803 Forbes Ave'],
        city: 'Pittsburgh',
        state: 'PA',
        zip: 15213
      }
    },
    {
      id: '1000030',
      name: {
        first: 'Sarah',
        last: 'Gay'
      },
      address: {
        lines: ['8651 University Blvd'],
        city: 'Pittsburgh',
        state: 'PA',
        zip: 15108
      }
    },
    {
      id: '1000031',
      name: {
        first: 'Dave',
        last: 'Beshero'
      },
      address: {
        lines: ['1539 Washington Rd'],
        city: 'Mt Lebanon',
        state: 'PA',
        zip: 15228
      }
    }
  ],
  teams: [
    {
      name: "Software and Services Group"
    },
    {
      name: "Project Development"
    }
  ]
};

var deleteEmployees = function(callback) {
  console.info("Deleting Employees".red);
  Employee.remove({}, function(err,response) {
    if(err){ console.error("Error Deleting Employees: " + err); }
    console.info("Done Deleting Employees".green);
    callback();
  });
};

var addEmployees = function(callback) {
  console.info("Adding Employees");
  Employee.create(data.employees, function(err){
    if(err){ console.error("Error Adding: " + err); }
    console.info("Done Adding Employees");
    callback();
  });
};

var deleteTeams = function(callback){
  console.info("Deleting Teams");
  Team.remove({}, function(err,response) {
    if(err){ console.error("Error deleting teams: " + err); }
    console.info("Done Deleting Teams".cyan);
    callback();
  });
};

var addTeams = function(callback) {
  console.info("Adding Teams".cyan);
  Team.create(data.teams, function(err,team1){
    if(err){ console.error("Error Creating Team: " + err); }
    else{ data.team_id = team1._id; }
    console.info("Done Adding Teams");
    callback();
  });
};

var updateEmployeeTeams = function(callback) {
  console.info("Updating Employee teams".cyan);
  var team = data.teams[0];

  //Set everyone to be on the same team to start
  Employee.update({}, {
    team: data.team_id
  },{
    multi: true
  }, function(err,numberAffected,response){
    if(err){ console.error("Error Updating employee team: " + err); }
    console.info("Done updating employee teams");
    callback();
  });
};

async.series([
  deleteEmployees,
  deleteTeams,
  addEmployees,
  addTeams,
  updateEmployeeTeams
], function(err, results){
  if(err){ console.error("Error in async: " + err); }
  mongoose.connection.close();
  console.log("DONE!".red);
});