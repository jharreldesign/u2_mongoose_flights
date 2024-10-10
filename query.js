const db = require('./db')
const { Flight, Airport } = require('./models')

//----------------------------- CRUD OPERATIONS ---------------------//

//----------------------------- CREATE ------------------------------//

//----------------------------- CREATE A FLIGHT ---------------------//

const createFlight = async () => {
    try {
        const departingAirport = await Airport.findOne({ code: 'SFO' });
        const arrivalAirport = await Airport.findOne({ code: 'LGA' });

        if (!departingAirport) {
            console.log("Departing airport with code 'SFO' not found!");
            return; 
        }

        if (!arrivalAirport) {
            console.log("Arrival airport with code 'LGA' not found!");
            return; 
        }

        let flight = await Flight.create({
            airline: "Delta",
            flight_number: 98907,
            price: 700,
            numberOfSeats: 1200,
            departureDateTime: new Date('2025-01-01T15:35:00'),
            departingAirport: departingAirport._id,
            arrivalAirport: arrivalAirport._id
        });

        flight = await Flight.findById(flight._id)
            .populate('departingAirport')
            .populate('arrivalAirport');

        console.log('Flight created:', flight);
    } catch (error) {
        console.error('Error creating flight:', error);
    }
};


//----------------------------- CREATE A AIRPORT ---------------------//

const createAirport = async () => {

    let airport = await Airport.create({
        name: "Midway Airport",
        location: "Chicago",
        state: "IL",
        code: "MDW"
    });

    console.log('Airport created:', airport);
}

//----------------------------- READ ---------------------------------//

//----------------------------- VIEW ALL AIRPORTS ---------------------//

const findAllAirports = async () => {
    const airports = await Airport.find();
    console.log('All Airports: ', airports)
}

//----------------------------- VIEW ALL FLIGHTS ---------------------//

const findAllFlights = async () => {
    const flights = await Flight.find();
    console.log('All Flights: ', flights)
}

//----------------------------- VIEW ALL FLIGHTS COMING TO CHOSEN AIRPORT ---------------------//

const findAllFlightsComingToAirport = async (code) => {
        const airport = await Airport.findOne({ code: code });

        if (!airport) {
            console.log(`Airport with code ${code} not found!`);
            return;
        }

        const flights = await Flight.find({ arrivalAirport: airport._id })
            .populate('arrivalAirport'); 

        console.log(`All Flights arriving at ${code}:`, flights);
};

const findAllFlightsSortedByDepartureDate = async () => {

        const flights = await Flight.find()
            .sort({ departureDateTime: 1 }) 
            .populate('departingAirport') 
            .populate('arrivalAirport'); 

        console.log('Flights sorted by departure date (ascending):', flights);

};

//----------------------------- FIND ALL UPCOMING FLIGHTS SORTED BY DEPARTURE DATE ---------------------//

const findAllUpcomingFlightsSortedByDepartureDate = async () => {

        const currentDateTime = new Date();


        const flights = await Flight.find({ departureDateTime: { $gte: currentDateTime } })
            .sort({ departureDateTime: 1 })
            .populate('departingAirport') 
            .populate('arrivalAirport'); 

        console.log('Upcoming Flights sorted by departure date (ascending):', flights);

};

//----------------------------- FIND ALL FLIGHT FROM CA TO NY ---------------------//

const findAllFlightsFromCaliforniaToNewYork = async () => {

        const californiaAirports = ['LAX', 'SFO'];
        const newYorkAirports = ['JFK', 'LGA'];

        const flights = await Flight.find({
            departingAirport: { $in: await Airport.find({ code: { $in: californiaAirports } }).distinct('_id') },
            arrivalAirport: { $in: await Airport.find({ code: { $in: newYorkAirports } }).distinct('_id') }
        })
        .sort({ price: -1 }) 
        .populate('departingAirport') 
        .populate('arrivalAirport'); 

        console.log('Flights from California to New York sorted by descending price:', flights);

};


//----------------------------- UPDATE ------------------------------//

//----------------------------- UPDATE FLIGHTS ---------------------//
const updateFlight = async () => {
    const updated = await Flight.updateOne(
        { airline: 'Southwest Airlines' },
        { airline: 'United Airlines' }
    )
    console.log('Updated Flight');
}

//----------------------------- UPDATE AIRPORT ---------------------//
const updateAirport = async () => {
    const updated = await Airport.updateOne(
        { code: "AGL" },
        { code: "LGA" }
    )
    console.log('Updated Airport');
}

//----------------------------- DELETE ------------------------------//

//----------------------------- DELETE A FLIGHT OF YOUR CHOICE ---------------------//

const deleteFlight = async () => {
    let deleted = await Flight.deleteOne({flight_number: 938});
    console.log(deleted);
}

//----------------------------- DELETE AN AIRPORT OF YOUR CHOICE ---------------------//

const deleteAirport = async () => {
    let deleted = await Airport.deleteOne({code: "MDW"});
    console.log(deleted);
}

//----------------------------- DELETE ALL FLIGHTS ---------------------//

const deleteAllFlightData = async () => {
    await Flight.deleteMany({})
    console.log('All flight data deleted')
}

//----------------------------- DELETE ALL AIRPORTS --------------------//

const deleteAllAirportData = async () => {
    await Airport.deleteMany({})
    console.log('All airport data deleted')
}

async function main() {
  try {
    // await createFlight();
    // await createAirport();

    // await findAllAirports();
    // await findAllFlights();
    // await findFlight();
    // await findAirport();
    // await findAllFlightsComingToAirport('PDX');
    // await findAllFlightsSortedByDepartureDate();
    // await findAllUpcomingFlightsSortedByDepartureDate();
    // await findAllFlightsFromCaliforniaToNewYork();

    // await updateFlight();
    // await updateAirport();

    // await deleteFlight();
    // await deleteAirport();
    // await deleteAllFlightData();
    // await deleteAllAirportData();

  } catch (error) {
    console.log(error)
  } finally {
    await db.close()
  }
}

main()