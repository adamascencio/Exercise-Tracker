const Exercise = require('../models/exercise');
const User = require('../models/user');

module.exports = {
  create,
  showLogs,
  showAllExercises
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

async function showLogs (req, res) {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    const query = { username: user.name }
    let limit = null;

    if (Object.keys(req.query).length > 0) {
      const dateFilter = {}
  
      for (const key of Object.keys(req.query)) {
        if (key == 'limit') {
          limit = req.query.limit;
        } else if (key == 'from') {
          dateFilter['$gte'] = req.query.from;
        } else if (key == 'to') {
          dateFilter['$lte'] = req.query.to;
        }
      }
      
      if (Object.keys(dateFilter).length > 0) {
        query.date = dateFilter;
      }
    }

    const exercises = await Exercise.find(query)
      .limit(limit);
    return res.json({
      count: exercises.length,
      log: exercises,
    })
  } catch (err) {
    res.json({ error: err });
  }
}

async function showAllExercises (req, res) {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    const exercises = await Exercise.find({ username: user.name });
    return res.json(exercises);
  } catch (err) {
    res.json({ data: err })
  }
}
