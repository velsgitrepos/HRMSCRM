const jwt = require('jsonwebtoken');
const { Admin } = require('../models');

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('FATAL: JWT_SECRET environment variable is not configured.');
    return res.status(500).json({ message: 'Authentication configuration error' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    req.admin = await Admin.findByPk(decoded.id, {
      attributes: { exclude: ['password'] },
    });

    if (!req.admin) {
      return res.status(401).json({ message: 'Not authorized: Admin record not found' });
    }

    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }
    return res.status(401).json({ message: 'Not authorized: Invalid token' });
  }
};

module.exports = { protect };
