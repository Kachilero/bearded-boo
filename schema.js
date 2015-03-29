/**
 * Created by Alejandro on 3/29/2015.
 */
var mongoose  = require('mongoose'),
    color     = require('colors'),
    Schema    = mongoose.Schema;

var db = mongoose.connection;

var dbUrl = "mongodb://alejandro:mheartbleedb456@ds031691.mongolab.com:31691/heroku_app35354312";

var TeamSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

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

var Team = mongoose.model('Team', TeamSchema);

db.on('error',function(){
  console.log("There was an error communicating with the database".red);
});

mongoose.connect(dbUrl, function(err){
  if(err){
    return console.log("There was an error connecting to the database [".red+color.green(err)+"]".red+color.white(err.stack));}
  console.log("Connected!".cyan);

  var team = new Team({
    name: "Product Development"
  });

  team.save(function(error,data){
    if(error){
      console.log(error);
    }else{
      console.dir(data);
    }

    db.close();
    process.exit();
  });
});