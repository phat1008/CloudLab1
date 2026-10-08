import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'https://mern-backend-235221.onrender.com';

export default function StudentList({ onRefresh }) {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ mssv: '', name: '', email: '', major: '' });

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_URL}/api/students`);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error('Lỗi khi gọi API lấy danh sách:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [onRefresh]);

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) return;

    try {
      const response = await fetch(`${API_URL}/api/students/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Xóa thất bại');

      alert('Xóa sinh viên thành công!');
      fetchStudents();
    } catch (error) {
      console.error('Lỗi khi xóa:', error);
      alert('Xóa sinh viên thất bại!');
    }
  };

  const handleEditClick = (student) => {
    setEditingId(student._id);
    setEditForm({
      mssv: student.mssv || student.id || '',
      name: student.name || '',
      email: student.email || '',
      major: student.major || ''
    });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Cập nhật thất bại');

      alert('Cập nhật thành công!');
      setEditingId(null);
      fetchStudents();
    } catch (error) {
      console.error('Lỗi khi cập nhật:', error);
      alert('Cập nhật thất bại!');
    }
  };

  return (
    <div style={{ padding: '10px' }}>
      <h2 style={{ color: '#61dafb', marginBottom: '15px' }}>Danh sách sinh viên</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {students.map((sv) => {
          const isEditing = editingId === sv._id;
          return (
            <li key={sv._id} style={{ 
              marginBottom: '12px', 
              padding: '14px', 
              backgroundColor: '#1e1e2f', 
              border: '1px solid #33334d', 
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}>
              {isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input 
                    type="text" 
                    value={editForm.mssv} 
                    onChange={(e) => setEditForm({ ...editForm, mssv: e.target.value })} 
                    placeholder="MSSV"
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#2a2a40', color: '#fff' }}
                  />
                  <input 
                    type="text" 
                    value={editForm.name} 
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} 
                    placeholder="Họ tên"
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#2a2a40', color: '#fff' }}
                  />
                  <input 
                    type="email" 
                    value={editForm.email} 
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} 
                    placeholder="Email"
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#2a2a40', color: '#fff' }}
                  />
                  <input 
                    type="text" 
                    value={editForm.major} 
                    onChange={(e) => setEditForm({ ...editForm, major: e.target.value })} 
                    placeholder="Chuyên ngành"
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#2a2a40', color: '#fff' }}
                  />
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <button onClick={() => handleUpdate(sv._id)} style={{ background: '#28a745', color: '#fff', border: 'none', padding: '6px 12px', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>Lưu</button>
                    <button onClick={() => setEditingId(null)} style={{ background: '#6c757d', color: '#fff', border: 'none', padding: '6px 12px', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>Hủy</button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ color: '#e0e0e0', fontSize: '15px' }}>
                    <span style={{ color: '#61dafb', fontWeight: 'bold' }}>[{sv.mssv || 'Chưa có MSSV'}]</span>{' '}
                    <span style={{ fontWeight: '600', marginLeft: '6px' }}>{sv.name}</span>{' '}
                    <span style={{ color: '#b0b0b0' }}>- {sv.email}</span>{' '}
                    <span style={{ color: '#ffc107', fontStyle: 'italic' }}>({sv.major || 'Chưa có chuyên ngành'})</span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => handleEditClick(sv)} style={{ background: '#007bff', color: '#fff', border: 'none', padding: '6px 12px', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>Sửa</button>
                    <button onClick={() => handleDelete(sv._id)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '6px 12px', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>Xóa</button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}