const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Employee = require('./models/Employee');
const authRoutes = require('./routes/Auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/employeeDb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Custom Register Route
app.post('/api/auth/register', async (req, res) => {
  const { f_sno, f_userName, f_Pwd } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(f_Pwd, 10);
    const user = new User({ f_sno, f_userName, f_Pwd: hashedPassword });
    await user.save();
    res.send({ message: 'Test user created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error creating user', error });
  }
});


// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// API endpoint to fetch employee by ID
app.get('/api/auth/employees/:id', (req, res) => {
  Employee.findById(req.params.id)
    .then(employee => {
      if (!employee) return res.status(404).json({ message: 'Employee not found' });
      res.json(employee);
    })
    .catch(error => res.status(500).json({ message: 'Server error', error }));
});


// API route to add employee
app.post('/api/auth/add-employee', upload.single('image'), async (req, res) => {
  const { name, email, mobileNo, designation, gender, course } = req.body;
  const image = req.file ? '/uploads/' + req.file.filename : null;
  
  try {
    const newEmployee = new Employee({
      name,
      email,
      mobileNo,
      designation,
      gender,
      course: Array.isArray(course) ? course : [course],
      image,
    });
    await newEmployee.save();
    res.status(201).send("Employee added successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// API endpoint for editing employees with file upload
app.put('/api/auth/employees/:id', upload.single('image'), (req, res) => {
  const { name, email, mobileNo, designation, gender, course } = req.body;
  const updatedEmployee = {
    name,
    email,
    mobileNo,
    designation,
    gender,
    course: Array.isArray(course) ? course : [course],
    image: req.file ? '/uploads/' + req.file.filename : null,
  };

  Employee.findByIdAndUpdate(req.params.id, updatedEmployee, { new: true })
    .then(employee => res.json(employee))
    .catch(err => res.status(500).json({ error: err.message }));
});


// API route to get all employees
app.get('/api/auth/employees', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ name: 1 });
    res.status(200).json(employees);
    console.log('Image path in frontend:', employee.image);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error });
  }
});


// API route to delete an employee
app.delete('/api/auth/employees/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error });
  }
});


// Main Auth Routes
app.use('/api/auth', authRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
