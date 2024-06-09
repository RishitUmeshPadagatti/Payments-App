# Payments App

This is a full-stack banking application built using Node.js, Express, MongoDB, and React. The application allows users to sign up, sign in, view their balance, and transfer money to other users.

## Table of Contents

- [Features](#features)
- [Demonstration](#demonstration)
- [Installation](#installation)
- [Backend Structure](#backend-structure)
- [Frontend Structure](#frontend-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Features

- User authentication (sign up and sign in)
- Secure JWT token generation and validation
- User profile management
- View account balance
- Transfer money between users
- Search for other users

## Demonstration

### Sign Up
![sign up](https://github.com/RishitUmeshPadagatti/Payments-App/assets/150834740/4d861593-2739-45f2-aac4-76e5da79351c)

### Sign In
![sign in](https://github.com/RishitUmeshPadagatti/Payments-App/assets/150834740/a2dc0688-be3b-4d01-8be9-08becdb54813)

### Search and Filter Users
![search and filter](https://github.com/RishitUmeshPadagatti/Payments-App/assets/150834740/3e0df67c-90bb-4dec-bbfb-800ff99b63b6)

### Transfer Money
![transferring money](https://github.com/RishitUmeshPadagatti/Payments-App/assets/150834740/f99ecb86-b604-4ab2-9a70-b8bb6abb3e93)

## Installation

To run this application locally, follow these steps:

### Backend

1. **Clone the repository:**

  ```bash
  git clone https://github.com/RishitUmeshPadagatti/Payments-App.git
  cd Payments-App/backend
  ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up configuration:**

   Edit your JWT password and MongoDB connection string in JWT_PASSWORD and DB_CONNECTION_STRING variables in `config.js` respectively

4. **Start the backend server:**

   ```bash
   node index.js
   ```

### Frontend

1. **In a new terminal navigate to the frontend directory:**

   ```bash
   cd Payments-App/frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the frontend development server:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173/`

## Backend Structure

The backend is built with Node.js and Express, and uses MongoDB for data storage. Below are the key parts of the backend code:

- **User Registration and Login:**
  - Routes: `/signup`, `/signin`
  - Middleware: `authMiddleware` for protected routes
  - Schemas: `signupBodySchema`, `signinBodySchema`, `updateUserDataSchema`

- **Account Management:**
  - Routes: `/balance`, `/transfer`
  - Balance check and money transfer functionalities

### Node Packages Used in Backend

- `cors` - Middleware for enabling Cross-Origin Resource Sharing
- `express` - Web framework for Node.js
- `jsonwebtoken` - For creating and verifying JSON Web Tokens
- `mongoose` - ODM for MongoDB and Node.js
- `zod` - TypeScript-first schema declaration and validation library

### User Routes

- **POST /signup**
  - Registers a new user and creates an associated account with a random balance.

- **POST /signin**
  - Authenticates a user and returns a JWT token.

- **PUT /**
  - Updates user information.

- **GET /bulk**
  - Retrieves a list of users, with an optional search filter.

### Account Routes

- **GET /balance**
  - Retrieves the balance of the authenticated user.

- **POST /transfer**
  - Transfers money from the authenticated user to another user.

## Frontend Structure

The frontend is built with React and includes the following features:

- **User Authentication:**
  - Sign Up and Sign In pages with form validation using `zod`.

- **Dashboard:**
  - Displays the user’s balance and allows searching for other users.

- **Money Transfer:**
  - Allows transferring money to other users.

### Pages

- **Signin**
  - Form for user login with validation and error handling.

- **Signup**
  - Form for user registration with validation and error handling.

- **Dashboard**
  - Displays user balance and a list of other users to transfer money to.

- **SendMoney**
  - Allows authenticated users to transfer money to other users.

### Node Packages Used in Frontend

- `axios` - Promise based HTTP client for the browser and node.js
- `react` - A JavaScript library for building user interfaces
- `react-dom` - Serves as the entry point to the DOM and server renderers for React
- `react-router-dom` - DOM bindings for React Router
- `react-toastify` - React notification made easy
- `uuid` - For creating unique identifiers
- `zod` - TypeScript-first schema declaration and validation library

## API Endpoints

### User Endpoints

- **POST /api/v1/user/signup**
  - Request: `{ username, password, firstname, lastname }`
  - Response: `{ message, token }`

- **POST /api/v1/user/signin**
  - Request: `{ username, password }`
  - Response: `{ token }`

- **PUT /api/v1/user**
  - Request: `{ password?, firstname?, lastname? }`
  - Response: `{ message }`

- **GET /api/v1/user/bulk**
  - Request: `?filter`
  - Response: `{ users }`

### Account Endpoints

- **GET /api/v1/account/balance**
  - Request: `Authorization: Bearer <token>`
  - Response: `{ balance }`

- **POST /api/v1/account/transfer**
  - Request: `{ amount, to }`
  - Response: `{ message }`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you would like to contribute to this project.
