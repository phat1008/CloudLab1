import React, { useState } from 'react';
import StudentForm from './StudentForm';
import StudentList from './StudentList';

export default function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleAddStudent = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/api/students', {
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
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
      <h1>Quản Lý Sinh Viên Cloud Lab</h1>
      
      <StudentForm onStudentAdded={handleAddStudent} />

      <hr style={{ margin: '20px 0' }} />

      <StudentList onRefresh={refreshTrigger} />
    </div>
  );
}