import React, { useState } from 'react';
import axios from 'axios';
import '../components/Addemployee.css';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    designation: '',
    gender: '',
    course: [], 
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      // If checkbox, update the course array based on checked status
      setFormData((prevState) => ({
        ...prevState,
        course: checked
          ? [...prevState.course, value]
          : prevState.course.filter((course) => course !== value),
      }));
    } else {
      // Handle other input types (text, radio, etc.)
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation for mobile number (example: check if it's 10 digits)
    if (!/^\d{10}$/.test(formData.mobileNo)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    const formDataToSend = new FormData();

    // Add form fields to the FormData object
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('mobileNo', formData.mobileNo);
    formDataToSend.append('designation', formData.designation);
    formDataToSend.append('gender', formData.gender);
    
    // Add each selected course to FormData
    formData.course.forEach((course) => {
      formDataToSend.append('course', course);
    });

    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/add-employee', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data); // Handle success response
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error while submitting the form.');
    }
    setFormData({
      name: '',
      email: '',
      mobileNo: '',
      designation: '',
      gender: '',
      course: [], // Set course as an array for multiple selections
      image: null, 
    });
  };

  return (
    <div className="add-employee-form">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mobile No:</label>
          <input
            type="text"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Designation:</label>
          <select
            name="designation"
            value={formData.designation}
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
              checked={formData.gender === "Male"}
              onChange={handleChange}
              required
            />
            <label>Male</label>

            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
              required
            />
            <label>Female</label>

            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === "Other"}
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
              checked={formData.course.includes("MBA")}
              onChange={handleChange}
            />
            <label>MBA</label>

            <input
              type="checkbox"
              name="course"
              value="BCA"
              checked={formData.course.includes("BCA")}
              onChange={handleChange}
            />
            <label>BCA</label>

            <input
              type="checkbox"
              name="course"
              value="BSC"
              checked={formData.course.includes("BSC")}
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

export default AddEmployee;
