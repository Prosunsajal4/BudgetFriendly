import { useState, useEffect } from "react";
import { RefreshCw, BarChart3, History, Search } from "lucide-react";
import { api } from "../services/api";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BalanceCard from "../components/BalanceCard";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import BudgetCard from "../components/BudgetCard";
import LoadingSkeleton from "../components/LoadingSkeleton";

export default function Home() {
  const [userId, setUserId] = useState("");
  const [dashboard, setDashboard] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    if (savedUserId) {
      setUserId(savedUserId);
      fetchData(savedUserId);
    } else {
      setLoading(false);
      setShowSetup(true);
    }
  }, []);

  const fetchData = async (id) => {
    try {
      const [dashboardRes, transactionsRes] = await Promise.all([
        api.getDashboard(id),
        api.getTransactions(id),
      ]);

      if (dashboardRes.success) setDashboard(dashboardRes.data);
      if (transactionsRes.success) setTransactions(transactionsRes.data);
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await api.createUser({ name, email, password });
      if (response.success) {
        const newUserId = response.data.id;
        localStorage.setItem("userId", newUserId);
        setUserId(newUserId);
        setShowSetup(false);
        setLoading(true);
        fetchData(newUserId);
        toast.success("Account created successfully!");
      }
    } catch (error) {
      toast.error("Failed to create account");
    }
  };

  const handleAddTransaction = () => {
    fetchData(userId);
  };

  const handleDeleteTransaction = () => {
    fetchData(userId);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData(userId);
    setRefreshing(false);
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      !searchTerm ||
      t.note?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || t.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "Food",
    "Transport",
    "Study",
    "Entertainment",
    "Shopping",
    "Bills",
    "Healthcare",
    "Other",
  ];

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

  if (showSetup) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 pb-8 flex items-center justify-center">
          <div className="card p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold gradient-text mb-8 text-center">
              Welcome to Personal Finance Tracker
            </h2>
            <form onSubmit={handleCreateUser} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  className="input"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="input"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  className="input"
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Get Started
              </button>
            </form>
          </div>
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
          <div>
            <h2 className="text-4xl font-bold gradient-text">Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="btn-secondary flex items-center gap-2"
          >
            <RefreshCw
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BalanceCard
            title="Total Balance"
            amount={dashboard?.balance || 0}
            icon={() => <span className="text-2xl">💰</span>}
            color="text-gray-900 dark:text-white"
          />
          <BalanceCard
            title="Total Income"
            amount={dashboard?.totalIncome || 0}
            icon={() => <span className="text-2xl">📈</span>}
            color="text-green-600 dark:text-green-400"
          />
          <BalanceCard
            title="Total Expenses"
            amount={dashboard?.totalExpenses || 0}
            icon={() => <span className="text-2xl">📉</span>}
            color="text-red-600 dark:text-red-400"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transactions Column */}
          <div className="lg:col-span-2 space-y-6">
            <TransactionForm userId={userId} onAdd={handleAddTransaction} />

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="input"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <TransactionList
              transactions={filteredTransactions}
              userId={userId}
              onDelete={handleDeleteTransaction}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <BudgetCard userId={userId} />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-4 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
          <a
            href="/analytics"
            className="btn-primary flex items-center gap-2 flex-1 justify-center"
          >
            <BarChart3 className="w-4 h-4" />
            View Analytics
          </a>
          <a
            href="/history"
            className="btn-primary flex items-center gap-2 flex-1 justify-center"
          >
            <History className="w-4 h-4" />
            View History
          </a>
        </div>
        <Footer />
      </div>
    </>
  );
}
