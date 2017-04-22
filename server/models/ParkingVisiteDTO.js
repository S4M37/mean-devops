var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParkingVisiteDTO  = new Schema({
    parkingId: String,
    parkingName: String,
    location: {
        lat: Number,
        lon: Number
    },
    locality: String,
    address: String,
    clientId: String,
    time: String
});

module.exports = mongoose.model('ParkingVisiteDTO', ParkingVisiteDTO);