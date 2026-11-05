const { Testimonial } = require('../models');
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

// @desc    Get all testimonials (optional filter by ?type=Employer|Candidate)
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = async (req, res) => {
  try {
    const where = {};
    if (req.query.type === 'Employer') {
      where.type = 'Employer';
    } else if (req.query.type === 'Candidate') {
      where.type = 'Candidate';
    }

    const limit = Math.min(parseInt(req.query.limit, 10) || 100, 200);

    const testimonials = await Testimonial.findAll({
      where,
      limit,
      order: [['created_at', 'DESC']],
    });
    res.json(testimonials);
  } catch (error) {
    console.error('Error retrieving testimonials:', error.message);
    res.status(500).json({ message: 'Server error retrieving testimonials' });
  }
};

// @desc    Create a new testimonial
// @route   POST /api/testimonials
// @access  Private
const createTestimonial = async (req, res) => {
  const { clientName, company, rating, review, type } = req.body;

  try {
    if (!clientName || !review) {
      if (req.file) {
        deleteFile(`/uploads/${req.file.filename}`);
      }
      return res.status(400).json({ message: 'Please provide Client Name and Review' });
    }

    const clientImageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newTestimonial = await Testimonial.create({
      clientName,
      company: company || '',
      rating: Number(rating) || 5,
      review,
      clientImageUrl,
      type: type && ['Employer', 'Candidate'].includes(type) ? type : 'Employer',
    });

    res.status(201).json(newTestimonial);
  } catch (error) {
    if (req.file) {
      deleteFile(`/uploads/${req.file.filename}`);
    }
    res.status(500).json({ message: 'Server error creating testimonial', error: error.message });
  }
};

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private
const updateTestimonial = async (req, res) => {
  const { clientName, company, rating, review, type } = req.body;
  const testimonialId = req.params.id;

  try {
    const testimonial = await Testimonial.findByPk(testimonialId);
    if (!testimonial) {
      if (req.file) {
        deleteFile(`/uploads/${req.file.filename}`);
      }
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    let updatedImageUrl = testimonial.clientImageUrl;
    if (req.file) {
      const oldImageUrl = testimonial.clientImageUrl;
      updatedImageUrl = `/uploads/${req.file.filename}`;
      deleteFile(oldImageUrl);
    }

    await testimonial.update({
      clientName: clientName || testimonial.clientName,
      company: company !== undefined ? company : testimonial.company,
      rating: rating !== undefined ? Number(rating) : testimonial.rating,
      review: review || testimonial.review,
      type: type && ['Employer', 'Candidate'].includes(type) ? type : testimonial.type,
      clientImageUrl: updatedImageUrl,
    });

    res.json(testimonial);
  } catch (error) {
    if (req.file) {
      deleteFile(`/uploads/${req.file.filename}`);
    }
    res.status(500).json({ message: 'Server error updating testimonial', error: error.message });
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private
const deleteTestimonial = async (req, res) => {
  const testimonialId = req.params.id;

  try {
    const testimonial = await Testimonial.findByPk(testimonialId);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    deleteFile(testimonial.clientImageUrl);
    await testimonial.destroy();
    res.json({ message: 'Testimonial removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting testimonial', error: error.message });
  }
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
