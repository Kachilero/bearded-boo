/**
 * Created by Alejandro on 3/29/2015.
 */
var mongoose  = require('mongoose'),
    color     = require('colors'),
    Schema    = mongoose.Schema,
    db        = mongoose.connection,
    dbUrl     = "mongodb://alejandro:mheartbleedb456@ds031691.mongolab.com:31691/heroku_app35354312";

var TeamSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});
var Team = mongoose.model('Team', TeamSchema);

var EmployeeSchema = new Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  image: {
    type: String,
    default: 'images/user.png'
  },
  address: {
    lines: {
      type: [String]
    },
    postal: {
      type: String
    }
  }
});
var Employee = mongoose.model('Employee', EmployeeSchema);

db.on('error',function(){
  console.log("There was an error in db while communicating with the database".red);
});

function insertTeams(callback){
  Team.create([{
      name: 'Product Development'
    },{
      name: 'Dev Ops'
    },{
      name: 'Accounting'
    }],
    function(error,pd,devops,acct){
      if(error){
        callback(error);
      }else{

        console.info("Teams Created Successfully".cyan);
        console.info("Pro Dev [".magenta+color.green(pd)+"]".magenta);
        console.info("Dev Ops [".magenta+color.green(devops)+"]".magenta);
        console.info("Acct    [".magenta+color.green(acct)+"]".magenta);
        callback(null,pd,devops,acct);
      }
    });
}

function insertEmployees(pd,devops,acct,callback){
  Employee.create([{
    name: {
      first: 'John',
      last: 'Adams'
    },
    team: pd._id,
    address: {
      lines: ['2 Lincoln Memorial Circle NW'],
      zip: 20037
    }
  },{
    name: {
      first: 'Thomas',
      last: 'Jefferson'
    },
    team: devops._id,
    address: {
      lines: ['1600 Pennsilvania Ave','White House'],
      zip: 20500
    }
  },{
    name: {
      first: 'James',
      last: 'Madison'
    },
    team: acct._id,
    address: {
      lines: ['2 15th street NW','PO Box 8675309'],
      zip: 20007
    }
  },{
    name: {
      first: 'James',
      last: 'Monroe'
    },
    team: acct._id,
    address: {
      lines: ['1850 West Basin Dr SW','Suite 210'],
      zip: 20242
    }
  }],function(error,johnadams){
    if(error){
      return callback(error);
    }else{
      console.info("Employees Successfully Added");
      callback(null,{
        team: pd,
        employee: johnadams
      });
    }
  })
}

function retrieveEmployee(data,callback){
  Employee.findOne({
    _id: data.employee._id
  }).populate('team').exec(function(error,result){
    if(error){ return callback(error); }
    else{
      console.log('*** Single Employee Result ***');
      console.dir(result);
      callback(null,data);
    }
  });
}

function retrieveMultipleEmployees(data,callback){
  Employee.find({
    'name.first': /J/i
  }, function(error,results){
    if(error){ return callback(error); }
    else{
      console.log("*** Multiple Employees Result ***");
      console.dir(results);
      callback(null,data);
    }
  })
}

mongoose.connect(dbUrl, function(err){
  if(err){
    return console.log("There was an error connecting to the database [".red+color.green(err)+"]".red);
  }
  console.log("Connected!".cyan);

  insertTeams(function (err,pd,devops,acct){
    if(err){ return console.error(err); }
    insertEmployees(pd,devops,acct, function(err,result){
      if(err){
        console.error(color.red(err)); }
      else{ console.info("Database Activity Complete"); }

      db.close();
      process.exit();
    })
  });
});