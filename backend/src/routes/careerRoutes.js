const express = require('express');
const router = express.Router();
const {
  getCareers,
  createCareer,
  updateCareer,
  deleteCareer,
} = require('../controllers/careerController');
const { protect } = require('../middleware/auth');

router.get('/', getCareers);
router.post('/', protect, createCareer);
router.put('/:id', protect, updateCareer);
router.delete('/:id', protect, deleteCareer);

module.exports = router;
