import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { api } from "../services/api";
import toast from "react-hot-toast";
import TransactionList from "../components/TransactionList";
import LoadingSkeleton from "../components/LoadingSkeleton";

export default function History() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    if (savedUserId) {
      setUserId(savedUserId);
      fetchHistory(savedUserId);
    } else {
      router.push("/");
    }
  }, []);

  const fetchHistory = async (id) => {
    try {
      const response = await api.getTransactions(id);
      if (response.success) {
        setTransactions(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    fetchHistory(userId);
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/")}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Transaction History
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View all your past transactions
          </p>
        </div>
      </div>

      {/* History */}
      <TransactionList
        transactions={transactions}
        userId={userId}
        onDelete={handleDelete}
      />
    </div>
  );
}
