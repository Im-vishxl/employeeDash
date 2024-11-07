import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../components/Editemployee.css';

const Editemployee = () => {
  const { employeeId } = useParams();
  console.log(employeeId);
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobileNo: '',
    designation: '',
    gender: '', 
    course: [], 
    image: null, 
  });

  useEffect(() => {
    // Fetch employee data when component mounts
    axios
    .get(`http://localhost:5000/api/auth/employees/${employeeId}`)
    .then((response) => {
      setEmployee(response.data);
    })
    .catch((error) => {
      console.error('Error fetching employee data:', error);
    });
}, [employeeId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      // Handle checkbox group for course
      setEmployee((prev) => {
        const newCourse = checked
          ? [...prev.course, value]
          : prev.course.filter((course) => course !== value);
        return { ...prev, course: newCourse };
      });
    } else {
      setEmployee((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle file change for image upload
  const handleFileChange = (e) => {
    setEmployee((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('mobileNo', employee.mobileNo);
    formData.append('designation', employee.designation);
    formData.append('gender', employee.gender);
    formData.append('course', employee.course);
  
    // Only append image if it's present
    if (employee.image) {
      formData.append('image', employee.image);
    }
  
    axios
      .put(`http://localhost:5000/api/auth/employees/${employeeId}`, formData)
      .then((response) => {
        console.log('Employee updated:', response.data);
        alert("Employee updated!");
        navigate('/employees'); // Redirect to employee list

      })
      .catch((error) => console.error('Error updating employee:', error));
  };

  return (
    <div className="edit-employee-form">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mobile No:</label>
          <input
            type="text"
            name="mobileNo"
            value={employee.mobileNo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Designation:</label>
          <select
            name="designation"
            value={employee.designation}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="gender">
          <label>Gender:</label>
          <div className="radio-group">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={employee.gender === 'Male'}
              onChange={handleChange}
              required
            />
            <label>Male</label>

            <input
              type="radio"
              name="gender"
              value="Female"
              checked={employee.gender === 'Female'}
              onChange={handleChange}
              required
            />
            <label>Female</label>

            <input
              type="radio"
              name="gender"
              value="Other"
              checked={employee.gender === 'Other'}
              onChange={handleChange}
              required
            />
            <label>Other</label>
          </div>
        </div>

        <div>
          <label>Course:</label>
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="course"
              value="MBA"
              checked={employee.course.includes('MBA')}
              onChange={handleChange}
            />
            <label>MBA</label>

            <input
              type="checkbox"
              name="course"
              value="BCA"
              checked={employee.course.includes('BCA')}
              onChange={handleChange}
            />
            <label>BCA</label>

            <input
              type="checkbox"
              name="course"
              value="BSC"
              checked={employee.course.includes('BSC')}
              onChange={handleChange}
            />
            <label>BSC</label>
          </div>
        </div>

        <div>
          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Editemployee;
