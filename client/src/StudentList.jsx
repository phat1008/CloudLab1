import React, { useEffect, useState } from 'react';

export default function StudentList({ onRefresh }) {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ mssv: '', name: '', email: '', major: '' });

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/students');
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
      const response = await fetch(`http://localhost:5000/api/students/${id}`, {
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
      const response = await fetch(`http://localhost:5000/api/students/${id}`, {
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
    <div style={{ padding: '20px' }}>
      <h2>Danh sách sinh viên</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {students.map((sv) => {
          const isEditing = editingId === sv._id;
          return (
            <li key={sv._id} style={{ marginBottom: '12px', padding: '10px', border: '1px solid #444', borderRadius: '6px' }}>
              {isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <input 
                    type="text" 
                    value={editForm.mssv} 
                    onChange={(e) => setEditForm({ ...editForm, mssv: e.target.value })} 
                    placeholder="MSSV"
                  />
                  <input 
                    type="text" 
                    value={editForm.name} 
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} 
                    placeholder="Họ tên"
                  />
                  <input 
                    type="email" 
                    value={editForm.email} 
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} 
                    placeholder="Email"
                  />
                  <input 
                    type="text" 
                    value={editForm.major} 
                    onChange={(e) => setEditForm({ ...editForm, major: e.target.value })} 
                    placeholder="Chuyên ngành"
                  />
                  <div>
                    <button onClick={() => handleUpdate(sv._id)} style={{ marginRight: '8px', background: 'green', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Lưu</button>
                    <button onClick={() => setEditingId(null)} style={{ background: 'gray', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Hủy</button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span><b>{sv.mssv}</b> - {sv.name} - {sv.email} ({sv.major || 'Chưa có'})</span>
                  <div>
                    <button onClick={() => handleEditClick(sv)} style={{ marginRight: '6px', background: '#007bff', color: '#fff', border: 'none', padding: '4px 8px', cursor: 'pointer', borderRadius: '4px' }}>Sửa</button>
                    <button onClick={() => handleDelete(sv._id)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '4px 8px', cursor: 'pointer', borderRadius: '4px' }}>Xóa</button>
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