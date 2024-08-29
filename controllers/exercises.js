const Exercise = require('../models/exercise');
const User = require('../models/user');

module.exports = {
  create,
  showLogs,
  showAllExercises
};

async function create(req, res) {
  const { id, description, duration } = req.body;
  let date;
  
  if (!req.body.date) {
    date = (new Date(Date.now())).toDateString()
  } else {
    const dateArr = req.body.date.split('-');
    const [year, month, day] = dateArr;
    date = new Date(parseInt(year), (parseInt(month) - 1), parseInt(day)).toDateString();
  }

  try {
    const user = await User.findById(id);
    const exercise = await Exercise.create({
      username: user.name,
      description,
      duration,
      date
    });
    await exercise.save();
    res.json({
      _id: user._id,
      username: user.name,
      date,
      duration: exercise.duration,
      description: exercise.description
    })
  } catch (err) {
    res.json({ error: err });
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
    const filteredExercises = exercises.map(({ duration, description, date }) => (
      { 
        description, 
        duration, 
        date: date.toDateString()
      }
    ));
    return res.json({
      username: user.name,
      count: exercises.length,
      _id: user._id,
      log: filteredExercises,
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
