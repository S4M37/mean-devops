var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParkingDTO = new Schema({
    parkingId: String,
    parkingName: String,
    location: {
        lat: Number,
        lon: Number
    },
    locality: String,
    address: String
});

module.exports = mongoose.model('ParkingDTO', ParkingDTO);