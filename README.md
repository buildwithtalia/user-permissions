# User Permissions CRUD App

This project contains a simple backend (Node.js/Express) and frontend (React) for managing user permissions.

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   
   The backend API will run on **http://localhost:4000**

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```
   
   The frontend application will run on **http://localhost:3000**

## API Testing with Postman

This project includes comprehensive Postman collections for API testing:

### Available Collections
- **User Permissions API**: Complete collection with all API endpoints
- **User Permissions API-1** & **User Permissions API-2**: Additional collection variants

### Available Environments
- **User Permissions API - Local**: Environment configured for local development (http://localhost:4000)
- **User Permissions API - Local 1**: Alternative local environment configuration

### Using the Collections

1. **Import Collections**: 
   - Collections are located in `postman/collections/`
   - Environments are in `postman/environments/`

2. **Setup Environment**:
   - Import the "User Permissions API - Local" environment
   - Ensure your backend server is running on localhost:4000

3. **Run Tests**:
   - Use the collection to test all API endpoints
   - Automated tests are configured in GitHub Actions (`.github/workflows/postman.yaml`)

### API Endpoints Available
- **Users**: List, create, and delete users
- **Permissions**: List all available permissions
- **User Permissions**: Get, add, and update user-specific permissions

## Features
- List and manage users
- View and update user permissions
- List available permissions
- Grant and revoke permissions for users
- RESTful API design
- Automated API testing with Postman/Newman

## Development

### Project Structure
```
├── backend/          # Node.js/Express API server
├── frontend/         # React application
├── postman/          # API collections and environments
├── .github/          # CI/CD workflows
└── README.md
```

### Running Tests
Newman results are saved to `newman-results.json` after running the Postman collection tests.

---

You can expand this app with authentication, persistent storage, and more features as needed.
