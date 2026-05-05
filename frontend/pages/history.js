import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { api } from "../services/api";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-600"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <div>
            <h2 className="text-4xl font-bold gradient-text">
              Transaction History
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium">
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
      <Footer />
    </>
  );
}
