import { useState, useEffect } from "react";
import { ArrowLeft, Download } from "lucide-react";
import { useRouter } from "next/router";
import { api } from "../services/api";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
    return (
      <>
        <Navbar />
        <div className="pt-20 pb-8">
          <LoadingSkeleton />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 pb-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-600"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <div>
              <h2 className="text-4xl font-bold gradient-text">
                Analytics Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium">
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
        <div className="flex gap-3">
          {["week", "month"].map((p) => (
            <button
              key={p}
              onClick={() => handlePeriodChange(p)}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 capitalize shadow-md hover:shadow-lg transform hover:scale-105 ${
                period === p
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/30"
                  : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Summary Stats */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Total Balance
              </p>
              <p className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ${analytics.balance.toFixed(2)}
              </p>
            </div>
            <div className="card p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Total Income
              </p>
              <p className="text-4xl font-bold mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                ${analytics.totalIncome.toFixed(2)}
              </p>
            </div>
            <div className="card p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Total Expenses
              </p>
              <p className="text-4xl font-bold mt-2 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
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
        <Footer />
      </div>
    </>
  );
}
