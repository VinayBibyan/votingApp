Voting App

A full-stack web application that allows users to sign up, log in, and participate in voting. Admins have additional privileges to manage candidates and oversee the voting process.

Features

General Features

User Signup and Login functionality.

Role-based access control (Admin and Voter roles).

Token-based authentication using JWT.

Responsive frontend built with React and Tailwind CSS.

Voter Features

View the list of candidates.

Vote for a specific candidate (one vote per user).

Check candidate vote counts.

Admin Features

Create, update, or delete candidates.

Manage users and oversee the voting process.

Ensure that only one admin account can exist in the system.

Technologies Used

Frontend

React: For building a dynamic and interactive user interface.

Tailwind CSS: For responsive and modern styling.

Vite: For faster builds and an optimized development experience.

Backend

Node.js: As the runtime environment.

Express.js: For building the RESTful API.

MongoDB Atlas: For managing the database and storing user and voting data.

JWT: For secure token-based authentication.

Project Setup

Prerequisites

Node.js installed on your system.

MongoDB Atlas account for database access.

A package manager (npm or yarn).

Backend Setup

Clone the repository:

git clone <repository_url>
cd backend

Install dependencies:

npm install

Create a .env file in the backend directory and add the following variables:

PORT=3000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secret_key>

Start the server:

npm start

Frontend Setup

Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

Running the Application

Open your browser and navigate to http://localhost:5173 for the frontend.

The backend runs on http://localhost:3000.

API Endpoints

User Endpoints

POST /user/signup: Register a new user.

POST /user/login: Authenticate a user and return a JWT token.

GET /user/profile: Access user profile details (requires authentication).

PATCH /user/profile: Update user profile details.

Voting Endpoints

GET /candidates: Retrieve a list of all candidates.

POST /vote: Vote for a specific candidate (requires authentication).

GET /vote/count: View vote counts for all candidates.

Admin Endpoints

POST /admin/candidate: Create a new candidate.

PUT /admin/candidate/:id: Update candidate details.

DELETE /admin/candidate/:id: Delete a candidate.

Important Notes

Admin Restriction: The system ensures that only one admin account can exist. Attempting to create another admin account will result in an error message.

Authentication: All routes (except signup and login) require a valid JWT token.

Folder Structure

project-root/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── tailwind.config.js
├── README.md

Future Enhancements

Add real-time vote count updates using WebSockets.

Implement email verification during signup.

Add advanced analytics for admins (e.g., voting trends, user engagement).

License

This project is open-source and available under the MIT License.

