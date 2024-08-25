const Exercise = require('../models/exercise');
const User = require('../models/user');

module.exports = {
  create
};

async function create(req, res) {
  const { id, description, duration, date } = req.body;
  const dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  try {
    const user = await User.findById(id);
    const exercise = await Exercise.create({
      username: user.name,
      description,
      duration,
      date: date ? date : new Date().toLocaleDateString('en-US', dateOptions)
    });
    await exercise.save();
    res.json({
      "_id": user._id,
      "username": user.name,
      "description": exercise.description,
      "duration": exercise.duration,
      "date": exercise.date
    })
  } catch (err) {
    res.json({ data: err });
  }
}
