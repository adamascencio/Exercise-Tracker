const User = require('../models/user');

module.exports = { create }

const create = async (req, res) {
  try {
    const user = await User.create(req.body);
    res.json({ data: user });
  } catch (err) {
    res.json({ data: err });
  }
}