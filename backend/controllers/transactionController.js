const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');
const { startOfDay, endOfDay, startOfMonth, endOfMonth, subMonths, subDays } = require('date-fns');

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { userId, type, amount, category, note, date } = req.body;

    const transaction = await Transaction.create({
      userId,
      type,
      amount,
      category,
      note,
      date: date ? new Date(date) : new Date(),
    });

    // Update budget if it's an expense
    if (type === 'expense') {
      const month = new Date(date || new Date()).toISOString().slice(0, 7);
      await Budget.findOneAndUpdate(
        { userId, month },
        { $inc: { spent: amount } },
        { upsert: true, new: true }
      );
    }

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all transactions for a user
const getTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    const { category, startDate, endDate, search } = req.query;

    let query = { userId };

    if (category) {
      query.category = category;
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    if (search) {
      query.$or = [
        { note: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    const transactions = await Transaction.find(query).sort({ date: -1 });

    res.json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a transaction
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, amount, category, note, date } = req.body;

    const oldTransaction = await Transaction.findById(id);
    if (!oldTransaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    // Update budget if expense amount changed
    if (oldTransaction.type === 'expense' && type !== 'income') {
      const oldMonth = new Date(oldTransaction.date).toISOString().slice(0, 7);
      const oldAmount = oldTransaction.amount;
      
      await Budget.findOneAndUpdate(
        { userId: oldTransaction.userId, month: oldMonth },
        { $inc: { spent: -oldAmount } }
      );
    }

    if (type === 'expense') {
      const newMonth = new Date(date || new Date()).toISOString().slice(0, 7);
      await Budget.findOneAndUpdate(
        { userId: oldTransaction.userId, month: newMonth },
        { $inc: { spent: amount } },
        { upsert: true, new: true }
      );
    }

    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { type, amount, category, note, date: date ? new Date(date) : new Date() },
      { new: true }
    );

    res.json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    // Update budget if it's an expense
    if (transaction.type === 'expense') {
      const month = new Date(transaction.date).toISOString().slice(0, 7);
      await Budget.findOneAndUpdate(
        { userId: transaction.userId, month },
        { $inc: { spent: -transaction.amount } }
      );
    }

    await Transaction.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Transaction deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get analytics data
const getAnalytics = async (req, res) => {
  try {
    const { userId } = req.params;
    const { period } = req.query; // 'week' or 'month'

    let startDate, endDate;
    const now = new Date();

    if (period === 'week') {
      startDate = startOfDay(subDays(now, 6));
      endDate = endOfDay(now);
    } else {
      startDate = startOfMonth(now);
      endDate = endOfMonth(now);
    }

    const transactions = await Transaction.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    });

    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;

    // Category-wise distribution
    const categoryDistribution = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        categoryDistribution[t.category] = (categoryDistribution[t.category] || 0) + t.amount;
      });

    // Spending over time
    const spendingOverTime = [];
    for (let i = 0; i < (period === 'week' ? 7 : 30); i++) {
      const date = period === 'week' 
        ? startOfDay(subDays(now, 6 - i))
        : startOfDay(subDays(now, 29 - i));
      
      const endOfDate = endOfDay(date);
      
      const dailyExpenses = transactions
        .filter(t => t.type === 'expense' && t.date >= date && t.date <= endOfDate)
        .reduce((sum, t) => sum + t.amount, 0);

      spendingOverTime.push({
        date: date.toISOString().split('T')[0],
        amount: dailyExpenses,
      });
    }

    // Smart insights
    const insights = [];
    const previousMonthStart = startOfMonth(subMonths(now, 1));
    const previousMonthEnd = endOfMonth(subMonths(now, 1));
    
    const previousTransactions = await Transaction.find({
      userId,
      date: { $gte: previousMonthStart, $lte: previousMonthEnd },
    });

    const previousExpenses = previousTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    if (totalExpenses > previousExpenses * 1.2) {
      insights.push('⚠️ Your expenses have increased significantly compared to last month.');
    }

    const foodExpense = categoryDistribution['Food'] || 0;
    if (foodExpense > totalExpenses * 0.3) {
      insights.push('🍔 You are spending more than 30% on food. Consider cooking at home more often.');
    }

    if (balance < 0) {
      insights.push('📉 You are spending more than you earn. Review your expenses.');
    } else if (balance > totalIncome * 0.2) {
      insights.push('💰 Great job! You are saving more than 20% of your income.');
    }

    res.json({
      success: true,
      data: {
        balance,
        totalIncome,
        totalExpenses,
        categoryDistribution,
        spendingOverTime,
        insights,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get dashboard summary
const getDashboard = async (req, res) => {
  try {
    const { userId } = req.params;

    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const transactions = await Transaction.find({
      userId,
      date: { $gte: monthStart, $lte: monthEnd },
    });

    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;

    // Get budget
    const month = now.toISOString().slice(0, 7);
    const budget = await Budget.findOne({ userId, month });

    res.json({
      success: true,
      data: {
        balance,
        totalIncome,
        totalExpenses,
        budget: budget ? budget.monthlyBudget : 0,
        spent: budget ? budget.spent : 0,
        remaining: budget ? budget.monthlyBudget - budget.spent : 0,
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
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getAnalytics,
  getDashboard,
};
