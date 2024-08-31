const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }
}, {
  timestamps: true
});

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.username = ret.name;
    delete ret.name;
    delete ret.password;
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

module.exports = mongoose.model('User', userSchema);