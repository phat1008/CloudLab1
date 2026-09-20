const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    mssv: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    major: { type: String }
});

module.exports = mongoose.model('Student', studentSchema);