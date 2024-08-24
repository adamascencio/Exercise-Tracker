const User = require('../models/user');

module.exports = { create }

async function create(req, res) {
  const request = { name: req.body.username };
  try {
    const user = await User.create(request);
    res.json({ data: user });
  } catch (err) {
    res.json({ data: err });
  }
}