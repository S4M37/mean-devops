var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
  _locationId: String,
  label: String,
  lat: Number,
  lon: Number,
  tags: [String]
});


module.exports = mongoose.model('Location', LocationSchema);
