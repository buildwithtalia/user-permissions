import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const API = 'http://localhost:4000';

function App() {
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPerms, setUserPerms] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    axios.get(`${API}/users`).then(res => setUsers(res.data));
    axios.get(`${API}/permissions`).then(res => setPermissions(res.data));
  }, []);

  const selectUser = user => {
    setSelectedUser(user);
    Promise.all([
      axios.get(`${API}/users/${user.id}/permissions`),
      axios.get(`${API}/permissions`)
    ]).then(([userPermsRes, allPermsRes]) => {
      const grantedPerms = userPermsRes.data;
      const allPerms = allPermsRes.data;
      const userPermissions = allPerms.map(perm => ({
        permission: perm,
        granted: grantedPerms.includes(perm)
      }));
      setUserPerms(userPermissions);
    });
  };

  const updatePermission = (perm, granted) => {
    const updated = userPerms.map(p => p.permission === perm ? { ...p, granted } : p);
    setUserPerms(updated);
  };

  const savePermissions = () => {
    setIsSaving(true);
    axios.put(`${API}/users/${selectedUser.id}/permissions`, userPerms)
      .then(res => {
        setIsSaving(false);
        // Show success message with modern styling
        const successMsg = document.createElement('div');
        successMsg.innerHTML = '✅ Permissions updated successfully!';
        successMsg.style.cssText = `
          position: fixed; top: 20px; right: 20px; z-index: 1000;
          background: linear-gradient(135deg, #48bb78, #38a169);
          color: white; padding: 1rem 1.5rem; border-radius: 8px;
          box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
          font-weight: 600; animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(successMsg);
        setTimeout(() => successMsg.remove(), 3000);
      })
      .catch(error => {
        console.error('Failed to save permissions:', error);
        setIsSaving(false);
        // Show error message with modern styling
        const errorMsg = document.createElement('div');
        errorMsg.innerHTML = '❌ Failed to save permissions. Please try again.';
        errorMsg.style.cssText = `
          position: fixed; top: 20px; right: 20px; z-index: 1000;
          background: linear-gradient(135deg, #f56565, #e53e3e);
          color: white; padding: 1rem 1.5rem; border-radius: 8px;
          box-shadow: 0 4px 15px rgba(245, 101, 101, 0.3);
          font-weight: 600; animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(errorMsg);
        setTimeout(() => errorMsg.remove(), 3000);
      });
  };

  const getUserInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getPermissionIcon = (permission) => {
    const icons = {
      read: '👁️',
      write: '✏️',
      delete: '🗑️',
      admin: '👑',
      edit: '📝',
      view: '👀',
      manage: '⚙️',
      create: '➕',
      update: '🔄'
    };
    return icons[permission.toLowerCase()] || '🔒';
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">🔐 User Permissions Admin</h1>
        <p className="app-subtitle">Manage user access and permissions with ease</p>
      </div>

      <div className="main-content">
        {/* Users Section */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              👥 Users
            </h2>
          </div>
          <div className="users-list">
            {users.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">👤</div>
                <p>No users found</p>
              </div>
            ) : (
              users.map(user => (
                <div
                  key={user.id}
                  className={`user-card ${selectedUser?.id === user.id ? 'selected' : ''}`}
                  onClick={() => selectUser(user)}
                >
                  <div className="user-avatar">
                    {getUserInitials(user.name)}
                  </div>
                  <div className="user-info">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Permissions Section */}
        <div className="card">
          {selectedUser ? (
            <div className="permissions-container">
              <div className="card-header">
                <h2 className="card-title permissions-header">
                  🔑 Permissions for {selectedUser.name}
                </h2>
              </div>
              <div className="permissions-list">
                {permissions.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-state-icon">🔒</div>
                    <p>No permissions available</p>
                  </div>
                ) : (
                  permissions.map(perm => {
                    const userPerm = userPerms.find(p => p.permission === perm) || { permission: perm, granted: false };
                    return (
                      <div key={perm} className="permission-item">
                        <div className="permission-info">
                          <div className="permission-icon">
                            {getPermissionIcon(perm)}
                          </div>
                          <span className="permission-label">{perm}</span>
                        </div>
                        <button
                          className={`toggle-switch ${userPerm.granted ? 'active' : ''}`}
                          onClick={() => updatePermission(perm, !userPerm.granted)}
                          aria-label={`Toggle ${perm} permission`}
                        />
                      </div>
                    );
                  })
                )}
              </div>
              {permissions.length > 0 && (
                <div className="mt-3">
                  <button
                    className="btn btn-primary"
                    onClick={savePermissions}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <div className="loading-spinner"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        💾 Save Permissions
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">👈</div>
              <h3>Select a user</h3>
              <p>Choose a user from the list to manage their permissions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
