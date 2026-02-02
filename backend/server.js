const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Helper function to create error response matching OpenAPI Error schema
const createError = (code, message, details = null) => {
  const error = { code, message };
  if (details) error.details = details;
  return error;
};

// Mock data matching OpenAPI schemas
const allPermissions = [
  { id: 'perm-read-users', name: 'Read Users', description: 'Allows reading user information', category: 'users', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'perm-write-users', name: 'Write Users', description: 'Allows creating and updating users', category: 'users', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'perm-delete-users', name: 'Delete Users', description: 'Allows deleting users', category: 'users', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'perm-admin', name: 'Admin', description: 'Full administrative access', category: 'admin', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'perm-read-permissions', name: 'Read Permissions', description: 'Allows viewing permissions', category: 'permissions', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'perm-manage-permissions', name: 'Manage Permissions', description: 'Allows managing user permissions', category: 'permissions', createdAt: '2024-01-01T00:00:00Z' }
];

let users = [
  { id: 'user-1', name: 'Alice Johnson', email: 'alice.johnson@techcorp.com', createdAt: '2024-01-15T10:30:00Z', updatedAt: '2024-01-20T14:45:00Z' },
  { id: 'user-2', name: 'Bob Smith', email: 'bob.smith@techcorp.com', createdAt: '2024-01-16T09:00:00Z', updatedAt: '2024-01-21T11:30:00Z' },
  { id: 'user-3', name: 'Carol Williams', email: 'carol.williams@techcorp.com', createdAt: '2024-01-17T14:15:00Z', updatedAt: '2024-01-22T16:00:00Z' },
  { id: 'user-4', name: 'David Brown', email: 'david.brown@techcorp.com', createdAt: '2024-01-18T08:45:00Z', updatedAt: '2024-01-23T10:20:00Z' },
  { id: 'user-5', name: 'Emma Davis', email: 'emma.davis@techcorp.com', createdAt: '2024-01-19T11:00:00Z', updatedAt: '2024-01-24T13:45:00Z' },
  { id: 'user-6', name: 'Frank Wilson', email: 'frank.wilson@techcorp.com', createdAt: '2024-01-20T15:30:00Z', updatedAt: '2024-01-25T09:15:00Z' },
  { id: 'user-7', name: 'Grace Miller', email: 'grace.miller@techcorp.com', createdAt: '2024-01-21T10:00:00Z', updatedAt: '2024-01-26T14:30:00Z' },
  { id: 'user-8', name: 'Henry Taylor', email: 'henry.taylor@techcorp.com', createdAt: '2024-01-22T12:45:00Z', updatedAt: '2024-01-27T11:00:00Z' },
  { id: 'user-9', name: 'Ivy Anderson', email: 'ivy.anderson@techcorp.com', createdAt: '2024-01-23T09:30:00Z', updatedAt: '2024-01-28T15:45:00Z' },
  { id: 'user-10', name: 'Jack Martinez', email: 'jack.martinez@techcorp.com', createdAt: '2024-01-24T16:00:00Z', updatedAt: '2024-01-29T10:30:00Z' }
];

// User permissions mapping (userId -> array of permission IDs)
let userPermissions = {
  'user-1': { permissionIds: ['perm-read-users'], updatedAt: '2024-01-20T14:45:00Z' },
  'user-2': { permissionIds: ['perm-read-users', 'perm-write-users'], updatedAt: '2024-01-21T11:30:00Z' },
  'user-3': { permissionIds: ['perm-read-users', 'perm-write-users', 'perm-delete-users'], updatedAt: '2024-01-22T16:00:00Z' },
  'user-4': { permissionIds: ['perm-read-users'], updatedAt: '2024-01-23T10:20:00Z' },
  'user-5': { permissionIds: ['perm-read-users', 'perm-write-users', 'perm-admin'], updatedAt: '2024-01-24T13:45:00Z' },
  'user-6': { permissionIds: ['perm-read-users'], updatedAt: '2024-01-25T09:15:00Z' },
  'user-7': { permissionIds: ['perm-read-users', 'perm-write-users', 'perm-delete-users'], updatedAt: '2024-01-26T14:30:00Z' },
  'user-8': { permissionIds: ['perm-read-users', 'perm-write-users'], updatedAt: '2024-01-27T11:00:00Z' },
  'user-9': { permissionIds: ['perm-read-users'], updatedAt: '2024-01-28T15:45:00Z' },
  'user-10': { permissionIds: ['perm-read-users', 'perm-write-users', 'perm-delete-users', 'perm-admin'], updatedAt: '2024-01-29T10:30:00Z' }
};

// Helper to get full permission objects from IDs
const getPermissionsByIds = (permissionIds) => {
  return permissionIds.map(id => allPermissions.find(p => p.id === id)).filter(Boolean);
};

// Validation helpers
const validatePermissionIds = (permissionIds) => {
  const errors = [];
  if (!permissionIds || !Array.isArray(permissionIds)) {
    errors.push({ field: 'permissionIds', reason: 'must be an array' });
    return errors;
  }
  if (permissionIds.length === 0) {
    errors.push({ field: 'permissionIds', reason: 'must not be empty' });
    return errors;
  }
  // Check for duplicates
  const uniqueIds = new Set(permissionIds);
  if (uniqueIds.size !== permissionIds.length) {
    errors.push({ field: 'permissionIds', reason: 'must contain unique items' });
  }
  // Check if all permission IDs are valid
  const invalidIds = permissionIds.filter(id => !allPermissions.find(p => p.id === id));
  if (invalidIds.length > 0) {
    errors.push({ field: 'permissionIds', reason: `invalid permission IDs: ${invalidIds.join(', ')}` });
  }
  // Check length constraints
  permissionIds.forEach((id, index) => {
    if (typeof id !== 'string' || id.length < 1 || id.length > 128) {
      errors.push({ field: `permissionIds[${index}]`, reason: 'must be a string between 1 and 128 characters' });
    }
  });
  return errors;
};

// API v1 routes

// GET /v1/users - List all users (paginated)
app.get('/v1/users', (req, res) => {
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);
  const offset = Math.max(parseInt(req.query.offset) || 0, 0);
  
  const paginatedUsers = users.slice(offset, offset + limit);
  
  // Return UserList schema
  res.json({
    users: paginatedUsers,
    total: users.length,
    limit: limit,
    offset: offset
  });
});

// DELETE /v1/users/:userId - Delete a user
app.delete('/v1/users/:userId', (req, res) => {
  const { userId } = req.params;
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json(createError('NOT_FOUND', 'User not found'));
  }
  
  users.splice(userIndex, 1);
  delete userPermissions[userId];
  
  // Return 204 No Content on successful deletion
  res.status(204).send();
});

// GET /v1/users/:userId/permissions - Get user permissions
app.get('/v1/users/:userId/permissions', (req, res) => {
  const { userId } = req.params;
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json(createError('NOT_FOUND', 'User not found'));
  }
  
  const userPerms = userPermissions[userId] || { permissionIds: [], updatedAt: new Date().toISOString() };
  const permissions = getPermissionsByIds(userPerms.permissionIds);
  
  // Return UserPermissions schema
  res.json({
    userId: userId,
    permissions: permissions,
  });
});

// PUT /v1/users/:userId/permissions - Update (replace) user permissions
app.put('/v1/users/:userId/permissions', (req, res) => {
  const { userId } = req.params;
  const { permissionIds } = req.body;
  
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json(createError('NOT_FOUND', 'User not found'));
  }
  
  // Validate request body
  const validationErrors = validatePermissionIds(permissionIds);
  if (validationErrors.length > 0) {
    return res.status(400).json(createError('VALIDATION_ERROR', 'The request body is invalid', validationErrors));
  }
  
  const updatedAt = new Date().toISOString();
  userPermissions[userId] = { permissionIds: [...new Set(permissionIds)], updatedAt };
  
  const permissions = getPermissionsByIds(userPermissions[userId].permissionIds);
  
  // Return UserPermissions schema
  res.json({
    userId: userId,
    permissions: permissions,
  });
});

// POST /v1/users/:userId/permissions - Add permissions to user
app.post('/v1/users/:userId/permissions', (req, res) => {
  const { userId } = req.params;
  const { permissionIds } = req.body;
  
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json(createError('NOT_FOUND', 'User not found'));
  }
  
  // Validate request body
  const validationErrors = validatePermissionIds(permissionIds);
  if (validationErrors.length > 0) {
    return res.status(400).json(createError('VALIDATION_ERROR', 'The request body is invalid', validationErrors));
  }
  
  const updatedAt = new Date().toISOString();
  const existingPerms = userPermissions[userId]?.permissionIds || [];
  // Merge existing and new permissions (unique)
  const mergedPermissionIds = [...new Set([...existingPerms, ...permissionIds])];
  userPermissions[userId] = { permissionIds: mergedPermissionIds, updatedAt };
  
  const permissions = getPermissionsByIds(mergedPermissionIds);
  
  // Return 201 with UserPermissions schema
  res.status(201).json({
    userId: userId,
    permissions: permissions,
  });
});

// GET /v1/permissions - List all permissions (paginated)
app.get('/v1/permissions', (req, res) => {
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);
  const offset = Math.max(parseInt(req.query.offset) || 0, 0);
  
  const paginatedPermissions = allPermissions.slice(offset, offset + limit);
  
  // Return PermissionsList schema
  res.json({
    permissions: paginatedPermissions,
    total: allPermissions.length,
    limit: limit,
    offset: offset
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));