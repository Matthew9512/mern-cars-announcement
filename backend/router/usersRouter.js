const express = require('express');
const router = express.Router();
const users = require('../controllers/usersController');
const verifyJwt = require('../middleware/verifyJwt');
const refreshJwt = require('../utils/refreshJwt');

router.post('/register', users.register);
router.post('/login', users.login);
router.post('/refresh', refreshJwt);

module.exports = router;
