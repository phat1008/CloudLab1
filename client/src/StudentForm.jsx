import React, { useState } from 'react';

export default function StudentForm({ onStudentAdded }) {
  // Giữ nguyên các trường ban đầu của bạn: id, name, email, major
  const [formData, setFormData] = useState({ id: '', name: '', email: '', major: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onStudentAdded(formData); 
    setFormData({ id: '', name: '', email: '', major: '' }); 
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h3>Thêm sinh viên mới</h3>
      <div>
        <label>MSSV (ID): </label>
        {/* Giữ nguyên name="id" theo cấu trúc ban đầu */}
        <input type="text" name="id" value={formData.id} onChange={handleChange} required />
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Họ tên: </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Email: </label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Chuyên ngành (Major): </label>
        <input type="text" name="major" value={formData.major} onChange={handleChange} required />
      </div>
      <button type="submit" style={{ marginTop: '15px' }}>Lưu sinh viên</button>
    </form>
  );
}