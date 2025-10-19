const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    division: { type: String, required: true },
    location: { type: String, required: true },
    requirements: { type: String },
    responsibilities: { type: String },
    image : { type: String, required: true },
});

const Position = mongoose.model('Position', positionSchema);

module.exports = Position;