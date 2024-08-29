const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');
const exercisesCtrl = require('../../controllers/exercises');

router.get('/:id/exercises', exercisesCtrl.showAllExercises);
router.get('/:id/logs', exercisesCtrl.showLogs);
router.get('/', usersCtrl.getAllUsers);
router.post('/:id/exercises', exercisesCtrl.create);
router.post('/', usersCtrl.create);

module.exports = router;