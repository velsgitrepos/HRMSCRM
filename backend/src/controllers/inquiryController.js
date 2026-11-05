const { Inquiry } = require('../models');

// @desc    Submit a client contact inquiry
// @route   POST /api/inquiries
// @access  Public
const createInquiry = async (req, res) => {
  const { name, email, phone, company, requirement, message } = req.body;

  try {
    if (!name || !email || !phone || !company || !requirement || !message) {
      return res.status(400).json({ message: 'All form fields are required' });
    }

    const savedInquiry = await Inquiry.create({
      name,
      email,
      phone,
      company,
      requirement,
      message,
    });

    res.status(201).json({ success: true, data: savedInquiry });
  } catch (error) {
    res.status(500).json({ message: 'Server error saving submission', error: error.message });
  }
};

// @desc    Retrieve all client inquiries (sorted by latest submission date)
// @route   GET /api/inquiries
// @access  Private
const getInquiries = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 200, 500);
    const inquiries = await Inquiry.findAll({
      limit,
      order: [['created_at', 'DESC']],
    });
    res.json(inquiries);
  } catch (error) {
    console.error('Error retrieving inquiries:', error.message);
    res.status(500).json({ message: 'Server error retrieving inquiries' });
  }
};

// @desc    Delete an inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private
const deleteInquiry = async (req, res) => {
  const inquiryId = req.params.id;

  try {
    const inquiry = await Inquiry.findByPk(inquiryId);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry submission not found' });
    }

    await inquiry.destroy();
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting inquiry', error: error.message });
  }
};

module.exports = {
  createInquiry,
  getInquiries,
  deleteInquiry,
};
