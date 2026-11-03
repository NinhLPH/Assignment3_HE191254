const mongoose = require('mongoose');
const { Schema } = mongoose;

const attendanceSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['PRESENT', 'ABSENT'],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);