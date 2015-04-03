/**
 * Created by alejandrocerro on 4/3/15.
 */

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var EmployeeScheema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
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
    default: 'img/user.png'
  },
  address:{
    lines: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zip: {
      type: Number
    }
  }
});

module.exports = mongoose.model('Employee', EmployeeScheema);