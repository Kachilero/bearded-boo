/**
 * Created by alejandrocerro on 4/3/15.
 */

var mongoose    = require('mongoose'),
    postFind    = require('mongoose-post-find'),
    async       = require('async');

var Schema      = mongoose.Schema,
    TeamSchema  = new Schema({
      name: {
        type: String,
        required: true
      },
      members: {
        type: [Schema.Types.Mixed]
      }
    });

function _attachMembers(Employee, result, callback){
  Employee.find({
    team: result._id
  }, function(error,employee){
    if(error){ return callback(error); }
    result.member = employee;
    callback(null, result);
  });
}

//Listen for find() and findOne()
TeamSchema.plugin(postFind, {
  find: function(result, callback){
    var Employee = mongoose.model('Employee');

    async.each(result, function(item,callback){
      _attachMembers(Employee, item, callback);
    }, function(err){
      if(err){ return callback(err); }
      callback(null, result);
    });
  },
  findOne: function (result, callback) {
    var Employee = mongoose.model("Employee");

    _attachMembers(Employee, result, callback);
  }
});

module.exports = mongoose.model("Team", TeamSchema);