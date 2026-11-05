const { Career } = require('../models');

// @desc    Get all jobs (Open first, sorted by creation date)
// @route   GET /api/careers
// @access  Public
const getCareers = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 100, 200);
    const jobs = await Career.findAll({
      limit,
      order: [
        ['status', 'ASC'],
        ['created_at', 'DESC'],
      ],
    });
    res.json(jobs);
  } catch (error) {
    console.error('Error retrieving jobs:', error.message);
    res.status(500).json({ message: 'Server error retrieving jobs' });
  }
};

// @desc    Create a new job
// @route   POST /api/careers
// @access  Private
const createCareer = async (req, res) => {
  const { jobTitle, location, experience, employmentType, description, applyEmail, status } = req.body;

  try {
    if (!jobTitle || !location || !experience || !description || !applyEmail) {
      return res.status(400).json({ message: 'Please provide Job Title, Location, Experience, Description, and Apply Email' });
    }

    const savedJob = await Career.create({
      jobTitle,
      location,
      experience,
      employmentType: employmentType || 'Full-time',
      description,
      applyEmail,
      status: status || 'Open',
    });

    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating job', error: error.message });
  }
};

// @desc    Update a job
// @route   PUT /api/careers/:id
// @access  Private
const updateCareer = async (req, res) => {
  const { jobTitle, location, experience, employmentType, description, applyEmail, status } = req.body;
  const jobId = req.params.id;

  try {
    const job = await Career.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    await job.update({
      jobTitle: jobTitle !== undefined ? jobTitle : job.jobTitle,
      location: location !== undefined ? location : job.location,
      experience: experience !== undefined ? experience : job.experience,
      employmentType: employmentType !== undefined ? employmentType : job.employmentType,
      description: description !== undefined ? description : job.description,
      applyEmail: applyEmail !== undefined ? applyEmail : job.applyEmail,
      status: status !== undefined ? status : job.status,
    });

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating job', error: error.message });
  }
};

// @desc    Delete a job
// @route   DELETE /api/careers/:id
// @access  Private
const deleteCareer = async (req, res) => {
  const jobId = req.params.id;

  try {
    const job = await Career.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    await job.destroy();
    res.json({ message: 'Job posting deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting job', error: error.message });
  }
};

module.exports = {
  getCareers,
  createCareer,
  updateCareer,
  deleteCareer,
};
