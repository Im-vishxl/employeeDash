import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../components/Navbar.css';

const Navbar = () => {
  const username = sessionStorage.getItem('username');
  const navigate = useNavigate(); 

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    navigate('/login'); 
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/employees">Employee List</Link></li>
        <li><Link to="/employee-add">Add employee</Link></li>
        <div className="user-log">
          <li>{username && `${username}`}</li>
          {username && <li><button onClick={handleLogout}>Logout</button></li>}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
