const router = require('express').Router();
const { login } = require('../controller/auth.controller.js');

router.post('/login', login);

module.exports = router;
