const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const { f_userName, f_Pwd } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ f_userName });
    if (!user) return res.status(400).json({ message: "Invalid username or password" });

    // Validate password
    const isMatch = await bcrypt.compare(f_Pwd, user.f_Pwd);
    if (!isMatch) return res.status(400).json({ message: "Invalid username or password" });

    // Generate JWT
    const token = jwt.sign({ id: user._id, username: user.f_userName }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
