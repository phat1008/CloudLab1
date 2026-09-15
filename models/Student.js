const mongoose = require('mongoose');

// Khai bao Schema theo đúng yêu cầu: studentId, name, email
const studentSchema = new mongoose.Schema({
  studentId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);