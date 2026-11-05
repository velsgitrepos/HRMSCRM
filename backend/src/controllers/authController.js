const jwt = require('jsonwebtoken');
const { Admin } = require('../models');

const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is missing.');
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Auth Admin & get token
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide all credentials' });
    }

    const admin = await Admin.findOne({ where: { username } });

    if (admin && (await admin.comparePassword(password))) {
      res.json({
        _id: admin.id,
        id: admin.id,
        username: admin.username,
        token: generateToken(admin.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Get Admin profile (verify token)
// @route   GET /api/auth/profile
// @access  Private
const getAdminProfile = async (req, res) => {
  try {
    if (req.admin) {
      res.json({
        _id: req.admin.id,
        id: req.admin.id,
        username: req.admin.username,
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Profile error:', error.message);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
};

module.exports = {
  loginAdmin,
  getAdminProfile,
};
