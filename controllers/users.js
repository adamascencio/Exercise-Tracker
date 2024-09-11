const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = { 
  create,
  getAllUsers
 }

async function create(req, res) {
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name: username, password: hash });
    await user.save();
    const token = jwt.sign({ username }, process.env.SECRET, { expiresIn: '24h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.json({ data: err });
  }
}