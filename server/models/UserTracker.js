var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserTrackerSchema = new Schema({
  _userId: String,
  lat: Number,
  lon: Number,
  timestamp: String
});


module.exports = mongoose.model('UserTracker', UserTrackerSchema);
