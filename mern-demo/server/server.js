const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 1. Phải khởi tạo app trước tiên
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const Student = require('./models/Student');

// Kết nối MongoDB Atlas
mongoose.connect("mongodb+srv://admin_user:168322@cluster0.ggxjxsw.mongodb.net/cloud_lab?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Đã kết nối MongoDB Atlas thành công!'))
.catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// Route kiểm tra API
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from MERN backend server!' });
});

// Lấy danh sách sinh viên từ MongoDB
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sinh viên:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
});

// Thêm sinh viên mới vào MongoDB
app.post('/api/students', async (req, res) => {
    try {
        console.log('Dữ liệu nhận từ Client:', req.body);
        
        const studentData = {
            id: req.body.id || req.body.mssv,
            studentId: req.body.id || req.body.mssv,
            mssv: req.body.id || req.body.mssv,
            name: req.body.name,
            email: req.body.email,
            major: req.body.major || ''
        };

        const newStudent = new Student(studentData);
        const savedStudent = await newStudent.save();
        
        console.log('✅ Đã lưu thành công vào MongoDB:', savedStudent);
        res.status(201).json({ 
            message: 'Thêm sinh viên thành công!', 
            student: savedStudent 
        });
    } catch (error) {
        console.error('❌ Lỗi khi thêm sinh viên vào DB:', error);
        res.status(500).json({ message: 'Thêm sinh viên thất bại!', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});