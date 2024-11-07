# Employee Dashboard

An Employee Dashboard application built with the MERN stack (MongoDB, Express, React, Node.js) to manage employee information. It enables users to view, add, update, and delete employee records, making it easier to organize and access employee data.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Employee Management**: Add, edit, delete, and view employee information.
- **Form Validation**: Includes client-side form validation.
- **File Upload**: Allows for uploading and displaying employee profile pictures.
- **Search and Sort**: Search employees by keywords and sort based on fields.

## Technologies Used

- **Frontend**: React, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API**: RESTful API with Axios for HTTP requests
- **Routing**: React Router

## Getting Started

Follow these steps to set up the project on your local machine.

### Prerequisites

Ensure that you have the following installed:

- **Node.js** (version 14 or higher)
- **MongoDB** (you can use MongoDB Atlas or local MongoDB server)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Im-vishxl/employeeDash.git
    cd employeeDash
    ```

2. **Install server dependencies**:

    ```bash
    cd server
    npm install
    ```

3. **Install client dependencies**:

    ```bash
    cd ../client
    npm install
    ```

4. **Set up environment variables**:

    In the `server` folder, create a `.env` file and add your MongoDB connection string and other environment variables:

    ```plaintext
    MONGODB_URI=your_mongodb_connection_string
    PORT=5000
    ```

5. **Add the file upload directory**:

    Create an `uploads` folder in the `server` directory to store employee images.

### Running the Application

1. **Start the server**:

    Open a terminal, navigate to the `server` directory, and start the server:

    ```bash
    npm start
    ```

2. **Start the client**:

    Open a new terminal, navigate to the `client` directory, and start the client:

    ```bash
    npm start
    ```

3. **Access the application**:

    Open your web browser and go to [http://localhost:3000](http://localhost:3000) to access the Employee Dashboard.

## API Endpoints

The following endpoints are available for managing employees:

| Endpoint               | Method | Description                    |
|------------------------|--------|--------------------------------|
| `/api/employees`       | GET    | Fetch all employees            |
| `/api/employees/:id`   | GET    | Fetch a single employee by ID  |
| `/api/employees`       | POST   | Add a new employee             |
| `/api/employees/:id`   | PUT    | Update an employee by ID       |
| `/api/employees/:id`   | DELETE | Delete an employee by ID       |

## Screenshots

### Dashboard View

Displays the employee list with options to view, edit, or delete each employee.

### Add/Edit Employee Form

Form for adding or editing employee details, including fields for name, email, mobile number, designation, gender, courses, and an option to upload a profile picture.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add Your Feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## Author

Developed by Vishal.
---

Feel free to customize any sections based on your project needs.
