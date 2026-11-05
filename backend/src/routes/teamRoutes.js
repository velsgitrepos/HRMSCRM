const express = require('express');
const router = express.Router();
const {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require('../controllers/teamController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getTeamMembers);
router.post('/', protect, upload.single('image'), createTeamMember);
router.put('/:id', protect, upload.single('image'), updateTeamMember);
router.delete('/:id', protect, deleteTeamMember);

module.exports = router;
