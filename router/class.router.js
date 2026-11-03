const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken.js');
const { getClassStudents, getAttendanceSummary } = require('../controller/class.controller.js');

router.get('/:classId/students', verifyToken, getClassStudents);
router.get('/:classId/attendance-summary', verifyToken, getAttendanceSummary);

module.exports = router;
