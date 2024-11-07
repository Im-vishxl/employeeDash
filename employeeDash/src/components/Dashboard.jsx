import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const storedUsername = sessionStorage.getItem('username'); // Retrieve username from sessionStorage
    
    if (!token) {
      // Redirect to login if there's no token
      navigate('/login');
    } else {
      // Set the username if token exists
      setUsername(storedUsername || 'User');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Remove token and username from sessionStorage on logout
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    
    // Redirect to login page after logout
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>Welcome, {username}!</p>
    </div>
  );
};

export default Dashboard;
