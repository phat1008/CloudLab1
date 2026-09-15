import React, { useEffect, useState } from 'react';

export default function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/students') // Thay thế bằng URL Backend thực tế của bạn
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error('Lỗi khi gọi API:', err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Danh sách sinh viên</h2>
      <ul>
        {students.map((sv) => (
          <li key={sv._id || sv.mssv}>
            {sv.mssv} - {sv.name} - {sv.email}
          </li>
        ))}
      </ul>
    </div>
  );
}