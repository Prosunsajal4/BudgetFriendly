const express = require('express');
const router = express.Router();
const {
  getSubjects,
  createSubject,
  deleteSubject,
} = require('../controllers/subjectController');

router.get('/:userId', getSubjects);
router.post('/', createSubject);
router.delete('/:id', deleteSubject);

module.exports = router;
