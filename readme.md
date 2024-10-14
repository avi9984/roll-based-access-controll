
# Role-Based Access Control API

## Description
This is a Node.js API project that implements role-based access control (RBAC) using TypeScript, Express, MongoDB, and JWT for authentication and authorization. It allows for user registration, login, and different levels of access based on roles (e.g., user, admin).

## Features
- User Registration and Login with JWT Authentication
- Role-Based Access Control (RBAC) for protected routes
- Password hashing with `bcryptjs`
- CRUD operations for users
- Request logging middleware
- Pagination for listing users
- Admin-only access to certain routes
- Token expiration and handling of invalid tokens

## Technologies Used
- **Node.js**: JavaScript runtime
- **TypeScript**: Type safety for JavaScript
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB
- **JWT**: JSON Web Token for secure authentication
- **bcryptjs**: Password hashing
- **dotenv**: Manage environment variables

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/avi9984/roll-based-access-controll.git
   ```
   ``` cd role-based-access-control ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   PORT=3000
    MONGO_URL="mongodb+srv://Avi9984:JM6hnTiQIRViVdA3@cluster0.qfc4n.mongodb.net/RBAM"
    SECRET_KEY="ce5fa5bbe05df2e8df4c89aa64a3a7b2039caa75cdc0c1efd1697d1844db8f7be6d1c184f4"
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth Routes
- **POST** `http://localhost:3000/users/register` - Register a new user
- **POST** `http://localhost:3000/users/login` - Login user and get a JWT token

### User Routes
- **GET** `/api/users/profile/:id` - Get user profile by ID (Protected)

- **GET** `/api/users` - Get all users with pagination (Admin-only)
- **GET** `http://localhost:3000/admins/users/recent` - Get users registered in the last 7 days (Admin-only)

### Middleware
- `protect`: Protect routes with JWT authentication.
- `admin`: Restrict access to admin users.
- `logRequests`: Log incoming requests to the console.

## Usage

### Register a User
```bash
POST http://localhost:3000/users/register
Body: 
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "your_password",
  "role": "user"
}
```

### Login
```bash
POST http://localhost:3000/users/login
Body:
{
  "email": "john@example.com",
  "password": "your_password"
}
```

### Get User Profile (Protected)
```bash
GET http://localhost:3000/users/profile/:id
Headers: 
{
  "Authorization": "Bearer your_token"
}
```

### Get All Users (Admin-only)
```bash
GET http://localhost:3000/admins/users?role=user
Headers:
{
  "Authorization": "Bearer admin_token"
}
```

## Error Handling
- **401 Unauthorized**: If the user is not authenticated.
- **403 Forbidden**: If the user does not have access to the resource.
- **400 Bad Request**: For invalid inputs.
- **500 Internal Server Error**: For server-side issues.
