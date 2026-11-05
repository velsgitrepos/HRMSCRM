const express = require('express');
const router = express.Router();
const {
  submitApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
} = require('../controllers/applicationController');
const { protect } = require('../middleware/auth');

// Public route: Candidates apply for jobs
router.post('/', submitApplication);

// Private routes: Admin manages applications
router.get('/', protect, getApplications);
router.put('/:id/status', protect, updateApplicationStatus);
router.delete('/:id', protect, deleteApplication);

module.exports = router;
