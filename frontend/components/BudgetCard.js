import { Target, AlertTriangle, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function BudgetCard({ userId }) {
  const [budget, setBudget] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [monthlyBudget, setMonthlyBudget] = useState('');

  useEffect(() => {
    fetchBudget();
  }, [userId]);

  const fetchBudget = async () => {
    const month = new Date().toISOString().slice(0, 7);
    try {
      const response = await api.getBudget(userId, month);
      if (response.success) {
        setBudget(response.data);
        setMonthlyBudget(response.data.monthlyBudget.toString());
      }
    } catch (error) {
      console.error('Failed to fetch budget');
    }
  };

  const handleSetBudget = async (e) => {
    e.preventDefault();
    const month = new Date().toISOString().slice(0, 7);
    
    try {
      const response = await api.setBudget({
        userId,
        monthlyBudget: parseFloat(monthlyBudget),
        month,
      });

      if (response.success) {
        toast.success('Budget set successfully!');
        setShowForm(false);
        fetchBudget();
      }
    } catch (error) {
      toast.error('Failed to set budget');
    }
  };

  const percentageUsed = budget ? parseFloat(budget.percentageUsed) : 0;
  const isOverBudget = percentageUsed > 100;
  const isNearLimit = percentageUsed > 80 && percentageUsed <= 100;

  if (!budget && !showForm) {
    return (
      <div className="card p-6">
        <div className="text-center">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">Set your monthly budget</p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            Set Budget
          </button>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Set Monthly Budget</h3>
        <form onSubmit={handleSetBudget} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Monthly Budget ($)
            </label>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              className="input"
              placeholder="1000"
              required
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn-primary flex-1">Save</button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-primary-500" />
          Monthly Budget
        </h3>
        <button
          onClick={() => setShowForm(true)}
          className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          Edit
        </button>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Spent</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            ${budget.spent.toFixed(2)} / ${budget.monthlyBudget.toFixed(2)}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isOverBudget ? 'bg-red-500' : isNearLimit ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(percentageUsed, 100)}%` }}
          />
        </div>
        <p className="text-right text-sm mt-1 font-medium">
          {percentageUsed.toFixed(1)}%
        </p>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <span className="text-sm text-gray-600 dark:text-gray-400">Remaining</span>
        <span className={`text-lg font-bold ${
          budget.remaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>
          ${budget.remaining.toFixed(2)}
        </span>
      </div>

      {isOverBudget && (
        <div className="mt-4 flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-300">
            You've exceeded your budget by ${Math.abs(budget.remaining).toFixed(2)}!
          </p>
        </div>
      )}

      {isNearLimit && !isOverBudget && (
        <div className="mt-4 flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            You've used {percentageUsed.toFixed(0)}% of your budget.
          </p>
        </div>
      )}

      {percentageUsed < 80 && budget.remaining >= 0 && (
        <div className="mt-4 flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-700 dark:text-green-300">
            You're on track with your budget!
          </p>
        </div>
      )}
    </div>
  );
}
