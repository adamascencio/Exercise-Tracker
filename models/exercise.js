const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: Number,
  date: Date,
}, {
  timestamps: true
});

module.exports = mongoose.model('Exercise', exerciseSchema);