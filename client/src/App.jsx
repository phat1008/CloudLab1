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
      backgroundColor: '#121218', 
      color: '#ffffff', 
      padding: '30px 20px', 
      boxSizing: 'border-box' 
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#61dafb', marginBottom: '25px' }}>Quản Lý Sinh Viên Cloud Lab</h1>
        
        <StudentForm onStudentAdded={handleAddStudent} />

        <hr style={{ margin: '30px 0', borderColor: '#333' }} />

        <StudentList onRefresh={refreshTrigger} />
      </div>
    </div>
  );
}