const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Mock data
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', permissions: [{ permission: 'read', granted: true }, { permission: 'write', granted: false }] },
  { id: 2, name: 'Bob', email: 'bob@example.com', permissions: [{ permission: 'read', granted: true }, { permission: 'write', granted: true }] }
];
let permissions = ['read', 'write', 'delete'];

// List Users
app.get('/users', (req, res) => res.json(users));

// Get User Permissions
app.get('/users/:userId/permissions', (req, res) => {
  const user = users.find(u => u.id == req.params.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
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
  res.json(user.permissions);
});

// List Permissions
app.get('/permissions', (req, res) => res.json(permissions));

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

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
