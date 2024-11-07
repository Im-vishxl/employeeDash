import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../components/Home.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      // Redirect to login if there's no token
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <div className="welcome">Welcome to the Dashboard!</div>
      <div className="btns">
        <button onClick={() => navigate('/employees')}>View Employees</button>
        <button onClick={() => navigate('/employee-add')}>Add Employees</button>
      </div>
      
    </div>
  );
};

export default Home;
