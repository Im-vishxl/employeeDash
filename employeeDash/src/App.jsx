import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard'; 
import AddEmployee from './components/Addemployee';
import Employeelist from './components/Employeelist';
import Editemployee from './components/Editemployee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/employee-add"
          element={
            <>
              <Navbar />
              <AddEmployee />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/employees"
          element={
            <>
              <Navbar />
              <Employeelist />
            </>
          }
        />
        <Route
          path="/edit-employee/:employeeId"
          element={
            <>
              <Navbar />
              <Editemployee />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
