const mongoose = require('mongoose');
const { Schema } = mongoose;

const classSchema = new Schema({
    className: { 
        type: String, 
        required: true 
    },
    subjectId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Subject', 
        required: true 
    },
    lecturerName: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['OPEN', 'CLOSED'], 
        default: 'OPEN' 
    },
    enrollments: [{
        studentId: { 
            type: Schema.Types.ObjectId, 
            ref: 'Student', 
            required: true },
        status: { 
            type: String, 
            enum: ['enrolled', 'dropped'], 
            default: 'enrolled' 
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);