const db = require('../db');
const { Flight, Airport } = require('../models');

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const pdx = await Airport.find({ name: 'Portland International Airport'});
    const sea = await Airport.find({ name: 'SeaTac' });
    const sfo = await Airport.find({ name: 'San Francisco International Airport'});
    const lga = await Airport.find({ name: 'LaGuardia Airport'})

    const flights = [
        {
            airline: 'Southwest Airlines',
            flight_number: 666,
            price: 666,
            numberOfSeats: 423,
            departureDateTime: new Date('2024-10-10T16:00:00'),
            departingAirport: pdx[0]._id,
        },
        {
            airline: 'Delta',
            flight_number: 2235,
            price: 9889,
            numberOfSeats: 21,
            departureDateTime: new Date('2024-10-10T16:00:00'),
            departingAirport: sfo[0]._id,
        },
        {
            airline: 'JetBlue',
            flight_number: 9002,
            price: 993,
            numberOfSeats: 250,
            departureDateTime: new Date('2024-10-10T16:00:00'),
            departingAirport: sea[0]._id
        },
        {
            airline: 'Spirit',
            flight_number: 8993,
            price: 982,
            numberOfSeats: 219,
            departureDateTime: new Date('2024-10-10T16:00:00'),
            departingAirport: lga[0]._id
        }
    ]

    await Flight.insertMany(flights)
    console.log('Created flights with airports')
}

const run = async () => {
    await main()
    db.close()
}

run();
