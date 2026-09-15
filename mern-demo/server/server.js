const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');
const Student = require('../../models/Student');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB Atlas (Thay MONGO_URI thành tên biến thực tế trong file .env nếu cần)
mongoose.connect("mongodb+srv://phattran99999999_db_user:123456789aA@cluster0.ggxjxsw.mongodb.net/cloud_lab?appName=Cluster0")
  .then(() => console.log('✅ Kết nối MongoDB Atlas thành công!'))
  .catch((err) => console.error('❌ Lỗi kết nối MongoDB:', err));

// API Test
app.get('/api/hello', (req, res) => {
  res.json({ message: "Backend đang hoạt động thành công!" });
});

// ---------------------------------------------------------
// Câu 36: GET /api/students - Lấy danh sách sinh viên
// ---------------------------------------------------------
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Loi server', error: error.message });
  }
});

// ---------------------------------------------------------
// Câu 37: POST /api/students - Thêm sinh viên mới
// ---------------------------------------------------------
app.post('/api/students', async (req, res) => {
  try {
    const { studentId, name, email } = req.body;
    const newStudent = await Student.create({ studentId, name, email });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: 'Loi tao sinh vien', error: error.message });
  }
});

// ---------------------------------------------------------
// Câu 38: PUT /api/students/:id - Cập nhật thông tin sinh viên
// ---------------------------------------------------------
app.put('/api/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Khong tim thay sinh vien' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: 'Loi cap nhat', error: error.message });
  }
});

// ---------------------------------------------------------
// Câu 39: DELETE /api/students/:id - Xóa sinh viên
// ---------------------------------------------------------
app.delete('/api/students/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Khong tim thay sinh vien' });
    }
    res.status(200).json({ message: 'Xoa sinh vien thanh cong', data: deletedStudent });
  } catch (error) {
    res.status(400).json({ message: 'Loi xoa sinh vien', error: error.message });
  }
});

// Khởi động Server (Chỉ gọi 1 lần duy nhất ở cuối file)
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy trên port ${PORT}`);
});