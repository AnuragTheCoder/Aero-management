const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({

    from: {
        type: String,
        required: true,
    },

    to: {
        type: String,
        required: true
    },

    departureTime: {
        type: String,
    },


    arrivalTime: {
        type: String,
    },

    airlines: [
        {
            type: String,
        }
    ]


})


module.exports = mongoose.model('Flight', FlightSchema);

