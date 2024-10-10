const db = require('../db');
const { Airport } = require('../models');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const main = async () => {
    const airports = [
        {
            name: "Portland International Airport",
            location: "Portland",
            state: "Oregon",
            code: "PDX"
        },
        {
            name: "SeaTac",
            location: "Seattle",
            state: "Washington",
            code: "SEA"
        },
        {
            name: "San Francisco International Airport",
            location: "San Francisco",
            state: "California",
            code: "SFO"
        },
        {
            name: "LaGuardia Airport",
            location: "East Elmhurst",
            state: "New York",
            code: "LGA"
        }
    ]

    await Airport.insertMany(airports)
    console.log("Created Airports");
}

const run = async () => {
    await main();
    db.close();
}

run();