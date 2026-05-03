import { useState, useEffect } from "react";
import { ArrowLeft, Download } from "lucide-react";
import { useRouter } from "next/router";
import { api } from "../services/api";
import toast from "react-hot-toast";
import AnalyticsChart from "../components/AnalyticsChart";
import LoadingSkeleton from "../components/LoadingSkeleton";

export default function Analytics() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("month");

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    if (savedUserId) {
      setUserId(savedUserId);
      fetchAnalytics(savedUserId);
    } else {
      router.push("/");
    }
  }, []);

  const fetchAnalytics = async (id, periodRange = period) => {
    try {
      const response = await api.getAnalytics(id, periodRange);
      if (response.success) {
        setAnalytics(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  };

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
    setLoading(true);
    fetchAnalytics(userId, newPeriod);
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Analytics Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track your spending habits
            </p>
          </div>
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {["week", "month"].map((p) => (
          <button
            key={p}
            onClick={() => handlePeriodChange(p)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
              period === p
                ? "bg-primary-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Summary Stats */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Balance
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
              ${analytics.balance.toFixed(2)}
            </p>
          </div>
          <div className="card p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Income
            </p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
              ${analytics.totalIncome.toFixed(2)}
            </p>
          </div>
          <div className="card p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Expenses
            </p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-1">
              ${analytics.totalExpenses.toFixed(2)}
            </p>
          </div>
        </div>
      )}

      {/* Charts */}
      {analytics && (
        <AnalyticsChart
          spendingOverTime={analytics.spendingOverTime}
          categoryDistribution={analytics.categoryDistribution}
          insights={analytics.insights}
        />
      )}
    </div>
  );
}
