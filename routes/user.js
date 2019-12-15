const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getSignup);
router.post('/', userController.postSignup);

module.exports = router;

