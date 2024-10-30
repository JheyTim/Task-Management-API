# Task Management API
This is a Task Management API built with Node.js, Express, and PostgreSQL. The API supports user registration, authentication, and secure CRUD operations for managing tasks. Advanced security features include JWT-based authentication, and two-factor authentication (2FA).

## Features
* **User Authentication**: Secure login, registration, and JWT-based token authentication.
* **Role-Based Authorization**: Allows different access levels for user and admin roles.
* **Task Management**: CRUD operations for tasks, with user-specific permissions.
* **Two-Factor Authentication**: Optional 2FA using authenticator apps.
* **Rate Limiting**: Prevents brute-force attacks by limiting login attempts.
* **Secure Headers**: Sets secure HTTP headers to protect against vulnerabilities.
* **CORS Configuration**: Restricts access to trusted origins only.

## Tech Stack
* **Node.js** and **Express.js** - Server and routing
* **PostgreSQL** with **Sequelize ORM** - Database and models
* **JWT** - Authentication
* **bcrypt** - Password hashing
* **Helmet** - Secure HTTP headers
* **express-rate-limit** - Rate limiting for routes

## Setup
1. **Clone the repository**:
    ```bash
    git clone https://github.com/JheyTim/Task-Management-API.git
    ```
2. **Install dependencies**:
    ```bash
    npm install
    ```
3. **Configure environment variables**:
    ```env
    PORT=3000
    DATABASE_URL=postgres://postgres:password@localhost:5432/task_management_db
    JWT_SECRET=your_jwt_token
    REFRESH_TOKEN_SECRET=your_jwt_refresh_token
    ```
4. **Start the server**:
    ```bash
    npm start
    ```
## API Endpoints

### Authentication
* POST /auth/register - Register a new user.
* POST /auth/login - Login and receive an access token.
* POST /auth/refresh - Refresh an access token.
* POST /auth/setup-2fa - Set up two-factor authentication.
* POST /auth/verify-2fa - Verify two-factor authentication code.

### Tasks
* POST /tasks - Create a new task (authenticated).
* GET /tasks - Get all tasks for the authenticated user.
* PUT /tasks/:id - Update a task (authenticated).
* DELETE /tasks/:id - Delete a task (authenticated).

### Security
* **Password Hashing**: All passwords are hashed using bcrypt before storage.
* **JWT Authentication**: Access tokens have a short expiry, and refresh tokens ensure session continuity.
* **Rate Limiting**: Login attempts are rate-limited to prevent brute-force attacks.
* **Secure Headers**: Helmet adds HTTP headers for enhanced security.
* **CORS**: Configured to restrict access to trusted domains only.