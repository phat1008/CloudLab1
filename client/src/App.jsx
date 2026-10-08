import React, { useState } from 'react';
import StudentForm from './StudentForm';
import StudentList from './StudentList';

const API_URL = import.meta.env.VITE_API_URL || 'https://mern-backend-235221.onrender.com';

export default function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleAddStudent = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/api/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Thêm sinh viên thất bại');
      }

      alert('Thêm sinh viên thành công!');
      setRefreshTrigger(prev => !prev);
      
    } catch (error) {
      console.error('Lỗi chi tiết:', error);
      alert('Thêm sinh viên thất bại!');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0f172a', 
      color: '#f8fafc', 
      padding: '40px 20px', 
      boxSizing: 'border-box',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '850px', margin: '0 auto', backgroundColor: '#1e293b', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)', border: '1px solid #334155' }}>
        <h1 style={{ textAlign: 'center', color: '#38bdf8', marginBottom: '30px', fontSize: '28px', fontWeight: 'bold' }}>Quản Lý Sinh Viên Cloud Lab</h1>
        
        <StudentForm onStudentAdded={handleAddStudent} />

        <hr style={{ margin: '30px 0', borderColor: '#334155' }} />

        <StudentList onRefresh={refreshTrigger} />
      </div>
    </div>
  );
}