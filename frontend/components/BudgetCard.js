import { Target, AlertTriangle, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "../services/api";
import toast from "react-hot-toast";

export default function BudgetCard({ userId }) {
  const [budget, setBudget] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [monthlyBudget, setMonthlyBudget] = useState("");

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
      console.error("Failed to fetch budget");
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
        toast.success("Budget set successfully!");
        setShowForm(false);
        fetchBudget();
      }
    } catch (error) {
      toast.error("Failed to set budget");
    }
  };

  const percentageUsed =
    budget && budget.percentageUsed ? parseFloat(budget.percentageUsed) : 0;
  const isOverBudget = percentageUsed > 100;
  const isNearLimit = percentageUsed > 80 && percentageUsed <= 100;

  if (!budget && !showForm) {
    return (
      <div className="card p-8">
        <div className="text-center">
          <div className="p-4 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 inline-block mb-4">
            <Target className="w-12 h-12 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">
            Set your monthly budget
          </p>
          <button onClick={() => setShowForm(true)} className="btn-primary">
            Set Budget
          </button>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Set Monthly Budget
        </h3>
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
            <button type="submit" className="btn-primary flex-1">
              Save
            </button>
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
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500">
            <Target className="w-5 h-5 text-white" />
          </div>
          Monthly Budget
        </h3>
        <button
          onClick={() => setShowForm(true)}
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium hover:underline transition-all"
        >
          Edit
        </button>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-3">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Spent
          </span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            ${(budget.spent || 0).toFixed(2)} / $
            {(budget.monthlyBudget || 0).toFixed(2)}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
          <div
            className={`h-full transition-all duration-700 ease-out rounded-full ${
              isOverBudget
                ? "bg-gradient-to-r from-red-500 to-pink-500"
                : isNearLimit
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                  : "bg-gradient-to-r from-emerald-500 to-teal-500"
            }`}
            style={{ width: `${Math.min(percentageUsed, 100)}%` }}
          />
        </div>
        <p className="text-right text-sm mt-2 font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
          {percentageUsed.toFixed(1)}%
        </p>
      </div>

      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-600">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Remaining
        </span>
        <span
          className={`text-2xl font-bold ${
            (budget.remaining || 0) >= 0
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent"
          }`}
        >
          ${(budget.remaining || 0).toFixed(2)}
        </span>
      </div>

      {isOverBudget && (
        <div className="mt-6 flex items-start gap-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border border-red-200 dark:border-red-800/50">
          <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm font-medium text-red-700 dark:text-red-300">
            You've exceeded your budget by $
            {Math.abs(budget.remaining || 0).toFixed(2)}!
          </p>
        </div>
      )}

      {isNearLimit && !isOverBudget && (
        <div className="mt-6 flex items-start gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800/50">
          <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
            You've used {percentageUsed.toFixed(0)}% of your budget.
          </p>
        </div>
      )}

      {percentageUsed < 80 && budget.remaining >= 0 && (
        <div className="mt-6 flex items-start gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800/50">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            You're on track with your budget!
          </p>
        </div>
      )}
    </div>
  );
}
