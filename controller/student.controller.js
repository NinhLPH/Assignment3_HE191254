const mongoose = require('mongoose');
const Student = require('../model/students.js');
const Attendance = require('../model/attendances.js');
require('../model/classes.js');
require('../model/subjects.js');

const getStudentAttendances = async (req, res, next) => {
    const { studentId } = req.params;
    if (!mongoose.isObjectIdOrHexString(studentId)) {
        return res.status(400).json({ message: 'Invalid student ID' });
    }

    try {
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const attendances = await Attendance.find({ studentId })
            .populate({
                path: 'classId',
                select: 'className subjectId',
                populate: { path: 'subjectId', select: 'name' }
            })
            .sort({ date: -1 });

        return res.json(attendances.map(attendance => ({
            className: attendance.classId?.className ?? null,
            subjectName: attendance.classId?.subjectId?.name ?? null,
            date: attendance.date,
            status: attendance.status
        })));
    } catch (error) {
        return next(error);
    }
};

module.exports = { getStudentAttendances };
