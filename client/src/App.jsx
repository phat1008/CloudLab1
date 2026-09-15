import { useState, useEffect } from 'react';
import './App.css';
import StudentList from './StudentList';

function App() {
  // Khai báo state cho danh sách sinh viên và form input
  const [students, setStudents] = useState([]);
  const [mssv, setMssv] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Hàm gọi API lấy danh sách sinh viên (GET /api/students) - Câu 47
  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students');
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        console.error('Lỗi khi tải danh sách sinh viên');
      }
    } catch (error) {
      console.error('Lỗi kết nối đến Backend:', error);
    }
  };

  // Sử dụng useEffect để tải dữ liệu khi component được mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Hàm xử lý khi submit form thêm sinh viên (POST /api/students) - Câu 48 & 49
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra dữ liệu không được để trống
    if (!mssv || !name || !email) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const newStudent = { mssv, name, email };

    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        alert('Thêm sinh viên thành công!');
        // Reset form sau khi thêm thành công
        setMssv('');
        setName('');
        setEmail('');
        // Gọi lại hàm lấy danh sách để cập nhật giao diện ngay lập tức
        fetchStudents();
      } else {
        alert('Thêm sinh viên thất bại!');
      }
    } catch (error) {
      console.error('Lỗi kết nối khi gửi dữ liệu:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'left' }}>
      <h1>Quản Lý Sinh Viên - Điện Toán Đám Mây</h1>

      {/* --- CÂU 48: FORM NHẬP MSSV, HỌ TÊN VÀ EMAIL --- */}
      <section style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Thêm Sinh Viên Mới</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Mã số sinh viên (MSSV)" 
            value={mssv} 
            onChange={(e) => setMssv(e.target.value)} 
            style={{ padding: '8px', fontSize: '14px' }}
          />
          <input 
            type="text" 
            placeholder="Họ tên" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={{ padding: '8px', fontSize: '14px' }}
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ padding: '8px', fontSize: '14px' }}
          />
          <button type="submit" style={{ padding: '10px', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Thêm sinh viên
          </button>
        </form>
      </section>

      {/* --- CÂU 47: GIAO DIỆN HIỂN THỊ DANH SÁCH SINH VIÊN --- */}
      <section style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Danh Sách Sinh Viên Từ Backend</h2>
        
        {/* Có thể dùng trực tiếp danh sách ở đây hoặc truyền qua component StudentList */}
        <StudentList students={students} />

        {/* Hoặc hiển thị trực tiếp danh sách dưới dạng danh sách cơ bản */}
        <ul style={{ marginTop: '15px', paddingLeft: '20px' }}>
          {students.length === 0 ? (
            <p>Chưa có dữ liệu sinh viên nào.</p>
          ) : (
            students.map((st, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                <strong>{st.mssv}</strong> - {st.name} - <em>{st.email}</em>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}

export default App;