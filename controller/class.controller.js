const mongoose = require('mongoose');
const Class = require('../model/classes.js');
const Attendance = require('../model/attendances.js');
require('../model/students.js');

const getClassStudents = async (req, res, next) => {
    const { classId } = req.params;
    if (!mongoose.isObjectIdOrHexString(classId)) {
        return res.status(400).json({ message: 'Invalid class ID' });
    }

    const status = req.query.status === undefined ? 'enrolled' : req.query.status;
    if (!['enrolled', 'dropped'].includes(status)) {
        return res.status(400).json({ message: 'Status must be enrolled or dropped' });
    }

    try {
        const classData = await Class.findById(classId).populate(
            'enrollments.studentId', 'studentCode fullName email'
        );
        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }

        const students = classData.enrollments
            .filter(enrollment => enrollment.status === status && enrollment.studentId)
            .map(({ studentId: student }) => ({
                studentId: student._id,
                studentCode: student.studentCode,
                fullName: student.fullName,
                email: student.email
            }));
        return res.json(students);
    } catch (error) {
        return next(error);
    }
};

const getAttendanceSummary = async (req, res, next) => {
    const { classId } = req.params;
    if (!mongoose.isObjectIdOrHexString(classId)) {
        return res.status(400).json({ message: 'Invalid class ID' });
    }

    try {
        const classData = await Class.findById(classId);
        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }

        const statistics = new Map();
        for (const enrollment of classData.enrollments) {
            if (enrollment.status === 'enrolled') {
                statistics.set(enrollment.studentId.toString(), {
                    studentId: enrollment.studentId,
                    totalSessions: 0,
                    present: 0,
                    absent: 0
                });
            }
        }

        const attendances = await Attendance.find({
            classId,
            studentId: { $in: [...statistics.keys()] }
        }).select('studentId status').lean();

        for (const attendance of attendances) {
            const student = statistics.get(attendance.studentId.toString());
            if (!student) continue;

            student.totalSessions++;
            if (attendance.status === 'PRESENT') student.present++;
            if (attendance.status === 'ABSENT') student.absent++;
        }

        const summary = [...statistics.values()].map(student => {
            const attendanceRate = student.totalSessions === 0 ? 0 :
                Number((student.present / student.totalSessions * 100).toFixed(1));

            return { ...student, attendanceRate, warning: attendanceRate < 80 };
        });

        return res.json({ classId, summary });
    } catch (error) {
        return next(error);
    }
};

module.exports = { getClassStudents, getAttendanceSummary };
