const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');

router.post('/', usersCtrl.create);
router.get('/', usersCtrl.getAllUsers);

module.exports = router;