const StudyPlan = require('../models/StudyPlan');
const Subject = require('../models/Subject');
const User = require('../models/User');
const { startOfDay, endOfDay, subDays, isSameDay } = require('date-fns');

// Generate a new study plan
const generatePlan = async (req, res) => {
  try {
    const { userId, date, subjects } = req.body;
    
    // Get user's subjects
    const userSubjects = await Subject.find({ userId });
    
    if (userSubjects.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please add subjects first' 
      });
    }

    // Generate tasks based on subjects
    const tasks = subjects || userSubjects.map(subject => ({
      subjectId: subject._id,
      title: `Study ${subject.name}`,
      duration: 60, // default 60 minutes
      completed: false,
      priority: 'medium',
    }));

    const totalDuration = tasks.reduce((sum, task) => sum + task.duration, 0);

    const studyPlan = await StudyPlan.create({
      userId,
      date: new Date(date),
      tasks,
      totalDuration,
    });

    await studyPlan.populate('tasks.subjectId');

    res.json({
      success: true,
      data: studyPlan,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get today's plan
const getTodayPlan = async (req, res) => {
  try {
    const { userId } = req.params;
    const today = startOfDay(new Date());
    const endOfToday = endOfDay(new Date());

    let plan = await StudyPlan.findOne({
      userId,
      date: { $gte: today, $lte: endOfToday },
    }).populate('tasks.subjectId');

    // If no plan exists, create one automatically
    if (!plan) {
      const userSubjects = await Subject.find({ userId });
      
      if (userSubjects.length > 0) {
        const tasks = userSubjects.map(subject => ({
          subjectId: subject._id,
          title: `Study ${subject.name}`,
          duration: 60,
          completed: false,
          priority: 'medium',
        }));

        const totalDuration = tasks.reduce((sum, task) => sum + task.duration, 0);

        plan = await StudyPlan.create({
          userId,
          date: today,
          tasks,
          totalDuration,
        });

        await plan.populate('tasks.subjectId');
      }
    }

    res.json({
      success: true,
      data: plan,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Complete a task
const completeTask = async (req, res) => {
  try {
    const { planId, taskId } = req.params;

    const plan = await StudyPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ 
        success: false, 
        message: 'Plan not found' 
      });
    }

    const task = plan.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    task.completed = !task.completed;

    // Calculate completion rate
    const completedTasks = plan.tasks.filter(t => t.completed).length;
    plan.completionRate = (completedTasks / plan.tasks.length) * 100;

    await plan.save();
    await plan.populate('tasks.subjectId');

    // Update user streak
    if (task.completed) {
      await updateUserStreak(plan.userId);
    }

    res.json({
      success: true,
      data: plan,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get analytics
const getAnalytics = async (req, res) => {
  try {
    const { userId } = req.params;
    const days = parseInt(req.query.days) || 7;

    const startDate = startOfDay(subDays(new Date(), days - 1));
    const endDate = endOfDay(new Date());

    const plans = await StudyPlan.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    }).populate('tasks.subjectId');

    // Calculate daily study time
    const dailyStudyTime = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = startOfDay(subDays(new Date(), i));
      const endOfDate = endOfDay(date);
      
      const plan = plans.find(p => 
        p.date >= date && p.date <= endOfDate
      );

      const completedDuration = plan 
        ? plan.tasks
            .filter(t => t.completed)
            .reduce((sum, t) => sum + t.duration, 0)
        : 0;

      dailyStudyTime.push({
        date: date.toISOString().split('T')[0],
        duration: completedDuration,
      });
    }

    // Calculate subject-wise distribution
    const subjectDistribution = {};
    plans.forEach(plan => {
      plan.tasks.forEach(task => {
        if (task.completed) {
          const subjectName = task.subjectId?.name || 'Unknown';
          subjectDistribution[subjectName] = 
            (subjectDistribution[subjectName] || 0) + task.duration;
        }
      });
    });

    // Calculate overall completion rate
    const totalTasks = plans.reduce((sum, plan) => sum + plan.tasks.length, 0);
    const totalCompleted = plans.reduce(
      (sum, plan) => sum + plan.tasks.filter(t => t.completed).length,
      0
    );
    const completionRate = totalTasks > 0 
      ? (totalCompleted / totalTasks) * 100 
      : 0;

    res.json({
      success: true,
      data: {
        dailyStudyTime,
        subjectDistribution,
        completionRate,
        totalStudyTime: Object.values(subjectDistribution).reduce((a, b) => a + b, 0),
      },
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get user streak
const getStreak = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Check if streak needs to be updated
    const today = startOfDay(new Date());
    const lastStudy = user.lastStudyDate ? startOfDay(user.lastStudyDate) : null;

    if (lastStudy && !isSameDay(today, lastStudy)) {
      const yesterday = startOfDay(subDays(new Date(), 1));
      
      if (!isSameDay(lastStudy, yesterday)) {
        // Streak is broken
        user.streak = 0;
        await user.save();
      }
    }

    res.json({
      success: true,
      data: {
        streak: user.streak,
        lastStudyDate: user.lastStudyDate,
      },
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Update user streak helper function
async function updateUserStreak(userId) {
  const user = await User.findById(userId);
  if (!user) return;

  const today = startOfDay(new Date());
  const lastStudy = user.lastStudyDate ? startOfDay(user.lastStudyDate) : null;

  if (!lastStudy || !isSameDay(today, lastStudy)) {
    const yesterday = startOfDay(subDays(new Date(), 1));
    
    if (lastStudy && isSameDay(lastStudy, yesterday)) {
      // Consecutive day, increment streak
      user.streak += 1;
    } else if (!lastStudy || !isSameDay(today, lastStudy)) {
      // First study or new streak
      user.streak = 1;
    }
    
    user.lastStudyDate = new Date();
    await user.save();
  }
}

// Get all plans
const getAllPlans = async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit) || 30;

    const plans = await StudyPlan.find({ userId })
      .sort({ date: -1 })
      .limit(limit)
      .populate('tasks.subjectId');

    res.json({
      success: true,
      data: plans,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get plan by date
const getPlanByDate = async (req, res) => {
  try {
    const { userId, date } = req.params;
    const targetDate = startOfDay(new Date(date));
    const endOfDate = endOfDay(new Date(date));

    const plan = await StudyPlan.findOne({
      userId,
      date: { $gte: targetDate, $lte: endOfDate },
    }).populate('tasks.subjectId');

    res.json({
      success: true,
      data: plan,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get smart suggestion
const getSmartSuggestion = async (req, res) => {
  try {
    const { userId } = req.params;
    const today = startOfDay(new Date());
    const endOfToday = endOfDay(new Date());

    const plan = await StudyPlan.findOne({
      userId,
      date: { $gte: today, $lte: endOfToday },
    }).populate('tasks.subjectId');

    if (!plan || plan.tasks.length === 0) {
      return res.json({
        success: true,
        data: {
          message: 'No tasks for today. Generate a plan first!',
          task: null,
        },
      });
    }

    // Find incomplete tasks, prioritized by priority
    const incompleteTasks = plan.tasks
      .filter(t => !t.completed)
      .sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });

    if (incompleteTasks.length === 0) {
      return res.json({
        success: true,
        data: {
          message: '🎉 All tasks completed! Great job!',
          task: null,
        },
      });
    }

    const nextTask = incompleteTasks[0];

    res.json({
      success: true,
      data: {
        message: `You should study: ${nextTask.title}`,
        task: nextTask,
      },
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

module.exports = {
  generatePlan,
  getTodayPlan,
  completeTask,
  getAnalytics,
  getStreak,
  getAllPlans,
  getPlanByDate,
  getSmartSuggestion,
};
