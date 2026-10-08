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
      mssv: student.mssv || student.id || student.studentId || '',
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
      <h2 style={{ color: '#38bdf8', marginBottom: '20px', textAlign: 'center' }}>Danh sách sinh viên</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {students.map((sv) => {
          const isEditing = editingId === sv._id;
          return (
            <li key={sv._id} style={{ 
              marginBottom: '14px', 
              padding: '16px 20px', 
              backgroundColor: '#1e293b', 
              border: '1px solid #334155', 
              borderRadius: '10px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
            }}>
              {isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input 
                    type="text" 
                    value={editForm.mssv} 
                    onChange={(e) => setEditForm({ ...editForm, mssv: e.target.value })} 
                    placeholder="MSSV"
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#f8fafc' }}
                  />
                  <input 
                    type="text" 
                    value={editForm.name} 
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} 
                    placeholder="Họ tên"
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#f8fafc' }}
                  />
                  <input 
                    type="email" 
                    value={editForm.email} 
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} 
                    placeholder="Email"
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#f8fafc' }}
                  />
                  <input 
                    type="text" 
                    value={editForm.major} 
                    onChange={(e) => setEditForm({ ...editForm, major: e.target.value })} 
                    placeholder="Chuyên ngành"
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#f8fafc' }}
                  />
                  <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                    <button onClick={() => handleUpdate(sv._id)} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', cursor: 'pointer', borderRadius: '6px', fontWeight: 'bold' }}>Lưu</button>
                    <button onClick={() => setEditingId(null)} style={{ background: '#64748b', color: '#fff', border: 'none', padding: '8px 16px', cursor: 'pointer', borderRadius: '6px', fontWeight: 'bold' }}>Hủy</button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ color: '#f8fafc', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ backgroundColor: '#0f172a', color: '#38bdf8', padding: '4px 8px', borderRadius: '6px', fontSize: '14px', border: '1px solid #334155', fontWeight: 'bold' }}>
                      {sv.mssv || sv.id || sv.studentId || (sv._id ? sv._id.slice(-6) : 'Chưa có MSSV')}
                    </span>
                    <span style={{ fontWeight: '700', color: '#f1f5f9' }}>{sv.name}</span>
                    <span style={{ color: '#94a3b8' }}>- {sv.email}</span>
                    <span style={{ color: '#fbbf24', fontStyle: 'italic', fontSize: '14px' }}>({sv.major || 'Chưa có chuyên ngành'})</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleEditClick(sv)} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '6px 14px', cursor: 'pointer', borderRadius: '6px', fontWeight: 'bold', transition: '0.2s' }}>Sửa</button>
                    <button onClick={() => handleDelete(sv._id)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 14px', cursor: 'pointer', borderRadius: '6px', fontWeight: 'bold', transition: '0.2s' }}>Xóa</button>
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