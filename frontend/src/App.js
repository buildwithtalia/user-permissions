import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      // userPermsRes.data is an array of permission names the user has (e.g., ['read', 'write'])
      const grantedPerms = userPermsRes.data;
      const allPerms = allPermsRes.data;
      // Convert to format: [{ permission: 'read', granted: true }, ...]
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
        alert('Permissions updated successfully!');
        setIsSaving(false);
      })
      .catch(error => {
        console.error('Failed to save permissions:', error);
        alert('Failed to save permissions. Please try again.');
        setIsSaving(false);
      });
  };

  return (
    <div>
      <h1>User Permissions Admin</h1>
      <h2>Users</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            <button onClick={() => selectUser(u)}>{u.name} ({u.email})</button>
          </li>
        ))}
      </ul>
      {selectedUser && (
        <div>
          <h2>Permissions for {selectedUser.name}</h2>
          {permissions.map(perm => {
            const userPerm = userPerms.find(p => p.permission === perm) || { permission: perm, granted: false };
            return (
              <div key={perm}>
                <label>
                  <input
                    type="checkbox"
                    checked={userPerm.granted}
                    onChange={e => updatePermission(perm, e.target.checked)}
                  />
                  {perm}
                </label>
              </div>
            );
          })}
          <button onClick={savePermissions} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Permissions'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
