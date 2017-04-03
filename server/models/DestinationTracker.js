var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DestinationTrackerSchema = new Schema({
  _userId: String,
  destination: LocationSchema,
  startLocation: LocationSchema,
  userTracker: UserTrackerSchema,
  weather: String
});


module.exports = mongoose.model('DestinationTracker', DestinationTrackerSchema);
