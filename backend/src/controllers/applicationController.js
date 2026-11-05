const { Application, Career } = require('../models');

// @desc    Submit job application (Candidate)
// @route   POST /api/applications
// @access  Public
const submitApplication = async (req, res) => {
  try {
    const { jobId, name, email, phone } = req.body;

    if (!jobId || !name || !email || !phone) {
      return res.status(400).json({ message: 'All fields (Job, Name, Email, Phone) are required.' });
    }

    // Check if job exists in MySQL
    const jobExists = await Career.findByPk(jobId);
    if (!jobExists) {
      return res.status(404).json({ message: 'Target job posting not found.' });
    }

    // Check duplicate application (same email for same jobId)
    const existingApplication = await Application.findOne({
      where: {
        jobId,
        email: email.trim().toLowerCase(),
      },
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job.' });
    }

    const application = await Application.create({
      jobId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully.',
      application,
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Failed to submit application. Please try again later.' });
  }
};

// @desc    Get all job applications (Admin)
// @route   GET /api/applications
// @access  Private (Admin)
const getApplications = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 200, 500);
    const applications = await Application.findAll({
      limit,
      include: [
        {
          model: Career,
          as: 'job',
          attributes: ['id', 'jobTitle', 'location', 'employmentType'],
        },
      ],
      order: [['applied_at', 'DESC']],
    });

    // Map jobId object for backward compatibility with frontend if needed
    const formatted = applications.map((app) => {
      const json = app.toJSON();
      if (json.job) {
        json.jobId = {
          _id: json.job.id,
          id: json.job.id,
          jobTitle: json.job.jobTitle,
          location: json.job.location,
          employmentType: json.job.employmentType,
        };
      }
      return json;
    });

    res.status(200).json(formatted);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Failed to fetch job applications.' });
  }
};

// @desc    Update application status (Admin)
// @route   PUT /api/applications/:id/status
// @access  Private (Admin)
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Applied', 'Shortlisted', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const application = await Application.findByPk(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found.' });
    }

    await application.update({ status });

    res.status(200).json({
      success: true,
      message: 'Application status updated.',
      application,
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ message: 'Failed to update application status.' });
  }
};

// @desc    Delete application (Admin)
// @route   DELETE /api/applications/:id
// @access  Private (Admin)
const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found.' });
    }

    await application.destroy();
    res.status(200).json({ message: 'Application deleted successfully.' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ message: 'Failed to delete application.' });
  }
};

module.exports = {
  submitApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
};
