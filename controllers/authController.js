const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

// User registration route
exports.userRegistration = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await User.create({ username, email, password, role });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

// User login route
exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};
