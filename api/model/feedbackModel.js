const { application } = require('express');
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    status: { type: String, enum: ['positive', 'negative'], required: true },
    message: { type: String },
    from: { type: String, required: true },
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;