const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = { 
  create,
  login,
  getAllUsers
 }

async function create(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.create({ name: username, password });
    await user.save();
    const token = jwt.sign({ userID: user._id, username }, process.env.SECRET, { expiresIn: '24h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ name: username });

    if (!user) return res.status(401).json({ error: 'Invalid username' });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({ userID: user._id }, process.env.SECRET, { expiresIn: '24h' });
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ error: 'Invalid password' });
    }
    } catch (err) {
      return res.status(500).json({ error: err });
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