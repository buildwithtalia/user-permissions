const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Mock data
let users = [
  { id: 1, name: 'Alice Johnson', email: 'alice.johnson@techcorp.com', permissions: [{ permission: 'read', granted: true }, { permission: 'write', granted: false }, { permission: 'delete', granted: false }, { permission: 'admin', granted: false }] },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@techcorp.com', permissions: [{ permission: 'read', granted: true }, { permission: 'write', granted: true }, { permission: 'delete', granted: false }, { permission: 'admin', granted: false }] },
  { id: 3, name: 'Carol Williams', email: 'carol.williams@techcorp.com', permissions: [{ permission: 'read', granted: true }, { permission: 'write', granted: true }, { permission: 'delete', granted: true }, { permission: 'admin', granted: false }] },
  { id: 4, name: 'David Brown', email: 'david.brown@techcorp.com', permissions: [{ permission: 'read', granted: true }, { permission: 'write', granted: false }, { permission: 'delete', granted: false }, { permission: 'admin', granted: false }] },
  { id: 5, name: 'Emma Davis', email: 'emma.davis@techcorp.com', permissions: [{ permission: 'read', granted: true }, { permission: 'write', granted: true }, { permission: 'delete', granted: false }, { permission: 'admin', granted: true }] },
  { id: 6, name: 'Frank Wilson', email: 'frank.wilson@techcorp.com', permissions: [{ permission: 'read', granted: true }, { permission: 'write', granted: false }, { permission: 'delete', granted: false }, { permission: 'admin', granted: false }] },
  { id: 7, name: 'Grace Miller', email: 'grace.miller@techcorp.com', permissions: [{ permission: 'read', granted: true }, { permission: 'write', granted: true }, { permission: 'delete', granted: true }, { permission: 'admin', granted: false }] },
  { id: 8, name: 'Henry Taylor', email: 'henry.taylor@techcorp.com', permissions: [{ permission: 'read', granted: true }, { permission: 'write', granted: true }, { permission: 'delete', granted: false }, { permission: 'admin', granted: false }] },
  { id: 9, name: 'Ivy Anderson', email: 'ivy.anderson@techcorp.com', permissions: [{ permission: 'read', granted: true }, { permission: 'write', granted: false }, { permission: 'delete', granted: false }, { permission: 'admin', granted: false }] },
  { id: 10, name: 'Jack Martinez', email: 'jack.martinez@techcorp.com', permissions: [{ permission: 'read', granted: true }, { permission: 'write', granted: true }, { permission: 'delete', granted: true }, { permission: 'admin', granted: true }] }
];
let permissions = ['read', 'write', 'delete', 'admin'];

// List Users
app.get('/users', (req, res) => res.json(users));

// Get User Permissions
app.get('/users/:userId/permissions', (req, res) => {
  const user = users.find(u => u.id == req.params.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  // Return only the names of permissions that are granted
  const grantedPermissions = user.permissions
    .filter(p => p.granted)
    .map(p => p.permission);
  res.json(grantedPermissions);
});

// Update User Permissions
app.put('/users/:userId/permissions', (req, res) => {
  const user = users.find(u => u.id == req.params.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.permissions = req.body;
  // Return only the names of permissions that are granted
  const grantedPermissions = user.permissions
    .filter(p => p.granted)
    .map(p => p.permission);
  res.json(grantedPermissions);
});

// List Permissions
app.get('/permissions', (req, res) => {
  res.json(permissions);
});

// Grant User Permission
app.post('/users/:userId/permissions', (req, res) => {
  const user = users.find(u => u.id == req.params.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { permission, granted } = req.body;
  const perm = user.permissions.find(p => p.permission === permission);
  if (perm) perm.granted = granted;
  else user.permissions.push({ permission, granted });
  res.json(user.permissions);
});

// Create User
app.post('/users', (req, res) => {
  const { id, name, email, permissions } = req.body;
  
  // Check if user with this ID already exists
  const existingUser = users.find(u => u.id == id);
  if (existingUser) {
    return res.status(409).json({ error: 'User with this ID already exists' });
  }
  
  // Check if email already exists
  const existingEmail = users.find(u => u.email === email);
  if (existingEmail) {
    return res.status(409).json({ error: 'User with this email already exists' });
  }
  
  const newUser = {
    id: id || users.length + 1,
    name,
    email,
    permissions: permissions || []
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// Delete User
app.delete('/users/:user_id', (req, res) => {
  const userIndex = users.findIndex(u => u.id == req.params.user_id);
  if (userIndex === -1) return res.status(404).json({ error: 'User not found' });
  users.splice(userIndex, 1);
  res.status(200).json({ message: 'User deleted successfully' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
