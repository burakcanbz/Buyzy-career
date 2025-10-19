const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, enum: ['Admin', 'Editor', 'Viewer', 'User'], default: 'User' },
    division: { type: [String], default: [] },
});

const User = mongoose.model('User', userSchema);

module.exports = User;