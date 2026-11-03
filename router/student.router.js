const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken.js');
const { getStudentAttendances } = require('../controller/student.controller.js');

router.get('/:studentId/attendances', verifyToken, getStudentAttendances);

module.exports = router;
