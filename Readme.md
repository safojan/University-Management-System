# University Management System

## Introduction

The University Management System is a web-based application designed to streamline the administrative tasks of Universitys, enhance communication among administrators, teachers, and students, and provide an efficient platform for managing University activities. It enables users to manage classes, subjects, attendance, notices, and more through an intuitive interface.

## Features

- **Admin Dashboard**: Manage classes, subjects, teachers, and students.
- **Teacher Dashboard**: View assigned classes and subjects, manage student attendance and grades.
- **Student Dashboard**: Access class details, subjects, attendance records, and notices.
- **Authentication**: Secure login for administrators, teachers, and students.
- **Notices**: Create and view important announcements.
- **Attendance Management**: Track and update student attendance.
- **Complaints System**: Students can submit complaints which are handled by the administration.

## Technologies Used

- **Frontend**: React.js, Redux, Material-UI, Styled-components, Framer Motion.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose.
- **Others**: Axios for API requests, bcrypt for password hashing, dotenv for environment variables.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** installed on your machine. [Download Node.js](https://nodejs.org/)
- **MongoDB** installed and running locally or have access to a MongoDB database URI. [Download MongoDB](https://www.mongodb.com/)
- **Git** installed for cloning the repository (optional). [Download Git](https://git-scm.com/)

## Setup and Installation

### Clone the Repository

```bash
git clone https://github.com/Rayyan9477/University-management-system.git
cd University-management-system
```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory and add the following:

   ```env
   MONGO_URL=your_mongodb_connection_string
   ```

   Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

4. Start the backend server:

   ```bash
   npm start
   ```

   The backend server should now be running on `http://localhost:5000`.

### Frontend Setup

1. Open a new terminal window and navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Start the frontend application:

   ```bash
   npm start
   ```

   The frontend application should now be running on `http://localhost:3000`.

## Usage

- **Admin Login**: Navigate to `http://localhost:3000/Adminlogin` to access the admin login page.
- **Teacher Login**: Navigate to `http://localhost:3000/Teacherlogin` to access the teacher login page.
- **Student Login**: Navigate to `http://localhost:3000/Studentlogin` to access the student login page.
- **Admin Registration**: Admins can register at `http://localhost:3000/adminregister`.

## Project Structure

### Frontend

- `src/`: Contains all the React components, pages, and Redux setup.
- `public/`: Contains the public HTML file and assets.

### Backend

- `models/`: Mongoose schemas for administrators, teachers, students, classes, subjects, etc.
- `controllers/`: Express.js controllers handling requests and business logic.
- `routes/`: Defines all API endpoints.
- `index.js`: Entry point for the backend server.

## Important Scripts

### Backend

- **Start the backend server:**

  ```bash
  npm start
  ```

### Frontend

- **Start the frontend development server:**

  ```bash
  npm start
  ```

- **Build the frontend application for production:**

  ```bash
  npm run build
  ```

## Dependencies

### Backend Dependencies

- **express**: Web framework for Node.js.
- **mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.
- **bcrypt**: Library for hashing passwords.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **dotenv**: Module to load environment variables.
- **nodemon**: Utility that monitors for any changes in your source and automatically restarts the server.

### Frontend Dependencies

- **react**: JavaScript library for building user interfaces.
- **react-dom**: Serves as the entry point to the DOM and server renderers.
- **react-router-dom**: Declarative routing for React.
- **redux**: Predictable state container for JavaScript apps.
- **react-redux**: Official React bindings for Redux.
- **@mui/material**: Material Design components for React.
- **axios**: Promise-based HTTP client for the browser and Node.js.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Inspired by the need for efficient University management solutions.
- Built using the Create React App template.
- Icons and illustrations from Material-UI Icons and Lucide Icons.