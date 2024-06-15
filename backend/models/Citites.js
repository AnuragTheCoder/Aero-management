const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({

    city: { type: String, default: "" }


})


module.exports = mongoose.model('City', citySchema);

