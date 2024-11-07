import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../components/Employeelist.css';

const Employeelist = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  // Sorting function
  const sortedEmployees = [...employees].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Filter employees by search term
  const filteredEmployees = sortedEmployees.filter(employee =>
    employee.name.toLowerCase().includes(search.toLowerCase()) ||
    employee.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/employees/${id}`);
      setEmployees(employees.filter(emp => emp._id !== id));
      alert('Employee deleted');
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  return (
    <div className="empcontainer">
      <h2>Employee Directory</h2>
      <div className="search-bar">
        <input className="search"
          type="text"
          placeholder="Search by name, email, mobile number, etc."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="employee-count">Total Employees: {filteredEmployees.length}</span>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('_id')}>Unique ID</th>
            <th>Image</th>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(employee => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td>
                {employee.image && (
                  <img
                    src={`http://localhost:5000/uploads/${employee.image}`}
                    alt={employee.name}
                    className="employee-image"
                  />
                )}
              </td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobileNo}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{Array.isArray(employee.course) ? employee.course.join(', ') : employee.course}</td>

              <td>
                <button onClick={() => {
                  navigate(`/edit-employee/${employee._id}`);
                }} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(employee._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employeelist;
