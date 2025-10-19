const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    location: { type: String },
    company: { type: String },
    hireStatus: { type: String, enum: ['applied', 'interviewing', 'hired', 'rejected'], default: 'applied' },
    files: { type: [String], default: [] },
    links: { type: [String], default: [] },
    position: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Position',
        required: true
    }
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;