const User = require('../models/user');

module.exports = { 
  create,
  getAllUsers
 }

async function create(req, res) {
  const request = { name: req.body.username };
  try {
    const user = await User.create(request);
    res.json({ username: user.name, _id: user._id });
  } catch (err) {
    res.json({ data: err });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    res.json(users.map(user => {
      return {
        username: user.name,
        _id: user._id
      }
    }));
  } catch (err) {
    res.json({ data: err });
  }
}