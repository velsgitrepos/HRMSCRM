const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { loginAdmin, getAdminProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Brute-force protection: Maximum 5 login attempts per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts from this IP. Please try again after 15 minutes.' },
});

router.post('/login', loginLimiter, loginAdmin);
router.get('/profile', protect, getAdminProfile);

module.exports = router;
