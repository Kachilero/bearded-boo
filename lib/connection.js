/**
 * Created by alejandrocerro on 4/3/15.
 */

var mongoose  = require('mongoose'),
    color     = require('colors');

var dbUrl     = "mongodb://alejandro:mheartbleedb456@ds031691.mongolab.com:31691/heroku_app35354312";

mongoose.connect(dbUrl);

//Close the Mongoose connection on control+C
process.on('SIGINT', function(){
  mongoose.connection.close(function() {
    console.log("Mongoose default connection disconnected".magenta);
    process.exit(0);
  });
});

require("../models/employee");
require("../models/team");