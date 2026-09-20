const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    id: { 
        type: String, 
        required: false // Cho phép không bắt buộc truyền id từ form
    },
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: false 
    },
    major: { 
        type: String, 
        required: false // Cho phép không bắt buộc truyền major từ form
    }
});

module.exports = mongoose.model('Student', studentSchema);