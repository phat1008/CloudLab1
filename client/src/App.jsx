import React, { useState } from 'react';
import StudentForm from './StudentForm';
import StudentList from './StudentList';

export default function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  // Hàm xử lý thêm sinh viên gửi dữ liệu lên Backend
  const handleAddStudent = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // ⚠️ Bắt buộc phải có để Backend phân tích được JSON
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Thêm sinh viên thất bại');
      }

      alert('Thêm sinh viên thành công!');
      
      // Kích hoạt load lại danh sách sinh viên sau khi thêm mới thành công
      setRefreshTrigger(prev => !prev);
      
    } catch (error) {
      console.error('Lỗi chi tiết:', error);
      alert('Thêm sinh viên thất bại!');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Quản Lý Sinh Viên Cloud Lab</h1>
      
      {/* Component form thêm sinh viên */}
      <StudentForm onStudentAdded={handleAddStudent} />

      <hr style={{ margin: '20px 0' }} />

      {/* Component hiển thị danh sách sinh viên từ Backend */}
      <StudentList key={refreshTrigger} />
    </div>
  );
}