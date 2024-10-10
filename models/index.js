const mongoose = require('mongoose')
const airportSchema = require('./airport');
const flightSchema = require('./flight');

const Airport = mongoose.model('Airport', airportSchema);
const Flight = mongoose.model('Flight', flightSchema);

module.exports = {
    Airport,
    Flight
}