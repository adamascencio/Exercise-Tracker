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

exerciseSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    ret.date = ret.date.toDateString();
    return ret
  }
});

module.exports = mongoose.model('Exercise', exerciseSchema);