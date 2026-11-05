const { Team } = require('../models');
const fs = require('fs');
const path = require('path');

// Helper function to delete file
const deleteFile = (filePath) => {
  if (!filePath) return;
  const absolutePath = path.join(__dirname, '../../public', filePath);
  fs.unlink(absolutePath, (err) => {
    if (err) {
      console.error(`Failed to delete file: ${filePath}`, err);
    } else {
      console.log(`Deleted file: ${filePath}`);
    }
  });
};

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
const getTeamMembers = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 100);
    const team = await Team.findAll({
      limit,
      order: [['created_at', 'DESC']],
    });
    res.json(team);
  } catch (error) {
    console.error('Error retrieving team:', error.message);
    res.status(500).json({ message: 'Server error retrieving team' });
  }
};

// @desc    Create a new team member
// @route   POST /api/team
// @access  Private
const createTeamMember = async (req, res) => {
  const { name, designation, experience, linkedinUrl, whatsappNumber } = req.body;

  try {
    if (!name || !designation || !experience) {
      if (req.file) {
        deleteFile(`/uploads/${req.file.filename}`);
      }
      return res.status(400).json({ message: 'Please provide Name, Designation, and Experience' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newMember = await Team.create({
      name,
      designation,
      experience,
      linkedinUrl: linkedinUrl || '',
      whatsappNumber: whatsappNumber || '',
      imageUrl,
    });

    res.status(201).json(newMember);
  } catch (error) {
    if (req.file) {
      deleteFile(`/uploads/${req.file.filename}`);
    }
    res.status(500).json({ message: 'Server error creating team member', error: error.message });
  }
};

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Private
const updateTeamMember = async (req, res) => {
  const { name, designation, experience, linkedinUrl, whatsappNumber } = req.body;
  const memberId = req.params.id;

  try {
    const member = await Team.findByPk(memberId);
    if (!member) {
      if (req.file) {
        deleteFile(`/uploads/${req.file.filename}`);
      }
      return res.status(404).json({ message: 'Team member not found' });
    }

    let updatedImageUrl = member.imageUrl;
    // Check if new image uploaded
    if (req.file) {
      const oldImageUrl = member.imageUrl;
      updatedImageUrl = `/uploads/${req.file.filename}`;
      if (oldImageUrl) {
        deleteFile(oldImageUrl);
      }
    }

    await member.update({
      name: name || member.name,
      designation: designation || member.designation,
      experience: experience || member.experience,
      linkedinUrl: linkedinUrl !== undefined ? linkedinUrl : member.linkedinUrl,
      whatsappNumber: whatsappNumber !== undefined ? whatsappNumber : member.whatsappNumber,
      imageUrl: updatedImageUrl,
    });

    res.json(member);
  } catch (error) {
    if (req.file) {
      deleteFile(`/uploads/${req.file.filename}`);
    }
    res.status(500).json({ message: 'Server error updating team member', error: error.message });
  }
};

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private
const deleteTeamMember = async (req, res) => {
  const memberId = req.params.id;

  try {
    const member = await Team.findByPk(memberId);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    // Delete image file if it exists
    if (member.imageUrl) {
      deleteFile(member.imageUrl);
    }

    await member.destroy();
    res.json({ message: 'Team member removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting team member', error: error.message });
  }
};

module.exports = {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
