const express = require("express");
const app = express();
const Flight = require('./models/Flight')
// const User = require('./models/User')
const cors = require('cors');
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protectedRoute");
const cookieParser = require("cookie-parser");
const City = require("./models/Citites");
const User = require("./models/User")


const path = require("path");
const dotenv = require("dotenv");
dotenv.config();













app.use(cors({
    origin: ['http://127.0.0.1:3003', 'http://localhost:3003', 'http://localhost:3000', 'http://127.0.0.1:3000', 'http://127.0.0.1:3002', 'http://localhost:3002', 'http://127.0.0.1:3001', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow credentials
}));
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Using Middlewares


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.get("/",(req,res)=>{
res.json("Hello");
})
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);














// Helper function to convert 12-hour time format to minutes


// Helper function to convert 12-hour time format to minutes
const convertToMinutes = (time) => {
    const match = time.match(/^(\d{1,2}):?(\d{2})?(am|pm)$/i);
    if (!match) return null;

    let [, hourStr, minuteStr, period] = match;
    let hour = parseInt(hourStr);
    let minutes = minuteStr ? parseInt(minuteStr) : 0;

    if (hour === 12) {
        // Handle special case for 12am and 12pm
        hour = period.toLowerCase() === 'am' ? 0 : 12;
    } else {
        // Adjust hour for pm period
        if (period.toLowerCase() === 'pm') {
            hour += 12;
        }
    }

    return hour * 60 + minutes;
};




app.get('/cities', async (req, res) => {
    try {
        const cities = await City.find();
        if (!cities) {
            return res.status(500).json({
                success: false,
                message: "not any cities"
            })
        }
        res.status(200).json({
            cities
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
})

app.post('/cities', async (req, res) => {
    try {
        const { cities } = req.body;
        const inserted = await City.insertMany(cities)
        res.status(200).json({
            success: true, message: `${inserted.length} cities created successfully`,
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
})


// Define the /flights/search route
app.get('/flights/search', async (req, res) => {
    try {
        const { from, to, time } = req.query;

        // Check for missing parameters
        if (!from || !to || !time) {
            return res.status(400).json({ error: 'Missing required query parameters' });
        }
        if (time === "any" || !time) {
            const flights = await Flight.find({ from, to });
            if (!flights) {
                console.error('No flights found for the given criteria');
                return res.status(200).json({ flights: [] });
            }
            return res.status(200).json({ flights });
        }
        else {

            // Convert the query time to minutes
            const queryTimeMinutes = convertToMinutes(time);
            if (queryTimeMinutes === null) {
                return res.status(400).json({ error: 'Invalid time format' });
            }

            // Calculate the time range (±4 hours)
            const lowerBound = queryTimeMinutes - 4 * 60;
            const upperBound = queryTimeMinutes + 4 * 60;

            // Fetch flights based on 'from' and 'to'
            const flights = await Flight.find({ from, to });
            if (!flights) {
                console.error('No flights found for the given criteria');
                return res.status(200).json({ flights: [] });
            }

            // Filter flights based on the departure time range
            const filteredFlights = flights.filter(flight => {
                const flightTimeMinutes = convertToMinutes(flight.departureTime);
                return (flightTimeMinutes >= lowerBound && flightTimeMinutes <= upperBound);
            });

            res.status(200).json({ flights: filteredFlights });
        }
    } catch (error) {
        console.error('Error searching flights:', error);
        res.status(500).json({ error: 'An error occurred while searching for flights' });
    }
});



app.put('/updateFlights/:id', async (req, res) => {
    try {
        const { id } = req.params; // User ID
        const { to, from, arrivalTime, departureTime, airline } = req.body; // Flight details

        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Add the flight details to the user's bookedFlights array
        user.bookedFlights.push({ to, from, arrivalTime, departureTime, airline });
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Flight booked successfully',
            bookedFlights: user.bookedFlights,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
})

app.put('/updateManyFlights/:id', async (req, res) => {
    try {
        const { id } = req.params; // User ID
        const flights = req.body.flights; // Array of flight details

        if (!Array.isArray(flights) || flights.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid flights data' });
        }

        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Append new flights directly to bookedFlights array
        user.bookedFlights = [...flights];
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Flights booked successfully',
            bookedFlights: user.bookedFlights,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});


app.delete('/deleteManyFlights/:id', async (req, res) => {
    try {
        const { id } = req.params; // User ID
        const flightIds = req.body.flightIds; // Array of flight IDs to delete

        if (!Array.isArray(flightIds) || flightIds.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid flight IDs data' });
        }

        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Filter out the flights to be deleted
        user.bookedFlights = user.bookedFlights.filter(flight => !flightIds.includes(flight.toString()));

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Flights deleted successfully',
            bookedFlights: user.bookedFlights,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});





app.get('/getManyFlights/:id', async (req, res) => {
    try {
        const { id } = req.params; // User ID

        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }



        res.status(200).json({
            success: true,
            message: 'Flights fetched successfully',
            bookedFlights: user.bookedFlights,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});



app.post('/flights', async (req, res) => {
    try {
        const { to, from, departureTime, arrivalTime, airlines } = req.body;
        const newFlightData = {
            to,
            from,
            departureTime,
            arrivalTime,
            airlines
        }
        const newFlight = await Flight.create(newFlightData);
        res.status(200).json({
            success: true,
            message: 'Airline Created',
            newFlight
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }

})



app.post('/flightsBulk', async (req, res) => {
    try {
        const flightDataArray = req.body; // Expecting an array of flight data
        if (!Array.isArray(flightDataArray) || flightDataArray.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data format. Expected an array of flight data.'
            });
        }

        // Insert all flight data in one go
        const newFlights = await Flight.insertMany(flightDataArray);

        res.status(200).json({
            success: true,
            message: `${newFlights.length} flights created successfully`,
            newFlights
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

app.get('/flights/:from/:to', async (req, res) => {
    try {

        const to = req.params.to;
        const from = req.params.from;

        const flights = await Flight.find({ to: to, from: from });
        if (flights.length == 0) {
            return res.status(404).json({
                msg: "flights not found"
            })
        }




        res.status(200).json({
            success: true,
            message: 'Airline Created',
            flights: flights[0].airlines
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }

})


app.get('/flights', async (req, res) => {
    try {
        const flights = await Flight.find();
        res.status(200).json({
            success: true,
            flights
        })



    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message

        })
    }
})
app.get('/flights/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const flights = await Flight.findById(id);
        res.status(200).json({
            success: true,
            flights
        })



    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message

        })
    }
})



app.put('/flights/:id', async (req, res) => {
    const { id } = req.params;
    const flightData = req.body;

    try {
        const updatedFlight = await Flight.findByIdAndUpdate(id, flightData, { new: true });
        res.json(updatedFlight);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/flights/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Flight.findByIdAndDelete(id);
        res.json({ message: 'Flight deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});






module.exports = app;
