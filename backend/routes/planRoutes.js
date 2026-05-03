const express = require('express');
const router = express.Router();
const {
  generatePlan,
  getTodayPlan,
  completeTask,
  getAnalytics,
  getStreak,
  getAllPlans,
  getPlanByDate,
  getSmartSuggestion,
} = require('../controllers/planController');

router.post('/generate-plan', generatePlan);
router.get('/today-plan/:userId', getTodayPlan);
router.post('/complete-task/:planId/:taskId', completeTask);
router.get('/analytics/:userId', getAnalytics);
router.get('/streak/:userId', getStreak);
router.get('/plans/:userId', getAllPlans);
router.get('/plans/:userId/:date', getPlanByDate);
router.get('/smart-suggestion/:userId', getSmartSuggestion);

module.exports = router;
