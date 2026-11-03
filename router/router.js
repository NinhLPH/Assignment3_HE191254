const express = require('express');
const router = express.Router();

router.use(express.json());
router.use('/auth', require('./auth.router.js'));
router.use('/classes', require('./class.router.js'));
router.use('/students', require('./student.router.js'));

module.exports = router;
