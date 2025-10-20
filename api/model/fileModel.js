const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true },
  size: { type: Number },
  uploadedAt: { type: Date, default: Date.now }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;