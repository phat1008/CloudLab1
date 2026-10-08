import React, { useState } from 'react';

export default function StudentForm({ onStudentAdded }) {
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
    <form onSubmit={handleSubmit} style={{ padding: '15px', backgroundColor: '#0f172a', borderRadius: '10px', border: '1px solid #334155' }}>
      <h3 style={{ color: '#38bdf8', marginBottom: '15px', fontSize: '18px' }}>Thêm sinh viên mới</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#cbd5e1' }}>MSSV (ID): </label>
          <input 
            type="text" 
            name="id" 
            value={formData.id} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#1e293b', color: '#fff', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#cbd5e1' }}>Họ tên: </label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#1e293b', color: '#fff', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#cbd5e1' }}>Email: </label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#1e293b', color: '#fff', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#cbd5e1' }}>Chuyên ngành (Major): </label>
          <input 
            type="text" 
            name="major" 
            value={formData.major} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#1e293b', color: '#fff', boxSizing: 'border-box' }}
          />
        </div>
      </div>
      <button type="submit" style={{ marginTop: '15px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>Lưu sinh viên</button>
    </form>
  );
}