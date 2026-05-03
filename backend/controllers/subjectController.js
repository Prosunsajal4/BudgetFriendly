const Subject = require('../models/Subject');

// Get all subjects for a user
const getSubjects = async (req, res) => {
  try {
    const { userId } = req.params;
    const subjects = await Subject.find({ userId }).sort({ name: 1 });

    res.json({
      success: true,
      data: subjects,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Create a new subject
const createSubject = async (req, res) => {
  try {
    const { userId, name, color } = req.body;

    const subject = await Subject.create({
      userId,
      name,
      color: color || '#3B82F6',
    });

    res.status(201).json({
      success: true,
      data: subject,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Delete a subject
const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByIdAndDelete(id);

    if (!subject) {
      return res.status(404).json({ 
        success: false, 
        message: 'Subject not found' 
      });
    }

    res.json({
      success: true,
      message: 'Subject deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

module.exports = {
  getSubjects,
  createSubject,
  deleteSubject,
};
