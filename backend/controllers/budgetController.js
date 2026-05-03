const Budget = require('../models/Budget');

// Set or update monthly budget
const setBudget = async (req, res) => {
  try {
    const { userId, monthlyBudget, month } = req.body;

    const budget = await Budget.findOneAndUpdate(
      { userId, month },
      { monthlyBudget },
      { upsert: true, new: true }
    );

    res.status(201).json({
      success: true,
      data: budget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get budget for a specific month
const getBudget = async (req, res) => {
  try {
    const { userId, month } = req.params;

    const budget = await Budget.findOne({ userId, month });

    if (!budget) {
      return res.json({
        success: true,
        data: {
          monthlyBudget: 0,
          spent: 0,
          remaining: 0,
          percentageUsed: 0,
        },
      });
    }

    const remaining = budget.monthlyBudget - budget.spent;
    const percentageUsed = budget.monthlyBudget > 0 
      ? (budget.spent / budget.monthlyBudget) * 100 
      : 0;

    res.json({
      success: true,
      data: {
        monthlyBudget: budget.monthlyBudget,
        spent: budget.spent,
        remaining,
        percentageUsed: percentageUsed.toFixed(1),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  setBudget,
  getBudget,
};
