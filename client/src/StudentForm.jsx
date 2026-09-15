import React, { useState } from 'react';

export default function StudentForm({ onStudentAdded }) {
  const [formData, setFormData] = useState({ mssv: '', name: '', email: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onStudentAdded(formData); // Gọi hàm truyền từ component cha để xử lý lưu
    setFormData({ mssv: '', name: '', email: '' }); // Làm sạch form sau khi submit
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h3>Thêm sinh viên mới</h3>
      <div>
        <label>MSSV: </label>
        <input type="text" name="mssv" value={formData.mssv} onChange={handleChange} required />
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Họ tên: </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Email: </label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <button type="submit" style={{ marginTop: '10px' }}>Lưu sinh viên</button>
    </form>
  );
}