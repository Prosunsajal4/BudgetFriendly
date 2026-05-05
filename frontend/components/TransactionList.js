import { useState } from "react";
import { Trash2, Edit2, ArrowUp, ArrowDown } from "lucide-react";
import { api } from "../services/api";
import toast from "react-hot-toast";
import ConfirmModal from "./ConfirmModal";

export default function TransactionList({
  transactions,
  userId,
  onDelete,
  onEdit,
}) {
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    transactionId: null,
  });

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, transactionId: id });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.transactionId) return;

    try {
      const response = await api.deleteTransaction(deleteModal.transactionId);
      if (response.success) {
        toast.success("Transaction deleted successfully");
        if (onDelete) onDelete();
      } else {
        toast.error(response.message || "Failed to delete transaction");
      }
    } catch (error) {
      toast.error("Failed to delete transaction");
    } finally {
      setDeleteModal({ isOpen: false, transactionId: null });
    }
  };

  const handleCloseModal = () => {
    setDeleteModal({ isOpen: false, transactionId: null });
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="card p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30">
            <ArrowDown className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            No transactions yet. Add your first transaction!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction._id}
          className="card p-4 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-2xl shadow-md transform group-hover:scale-110 transition-transform duration-300 ${
                  transaction.type === "income"
                    ? "bg-gradient-to-br from-emerald-400 to-teal-500"
                    : "bg-gradient-to-br from-red-400 to-pink-500"
                }`}
              >
                {transaction.type === "income" ? (
                  <ArrowUp className="w-5 h-5 text-white" />
                ) : (
                  <ArrowDown className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {transaction.category}
                </p>
                {transaction.note && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {transaction.note}
                  </p>
                )}
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p
                className={`text-xl font-bold ${
                  transaction.type === "income"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}$
                {transaction.amount.toFixed(2)}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit && onEdit(transaction)}
                  className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteClick(transaction._id)}
                  className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 dark:text-gray-400 dark:hover:text-red-400 transition-all duration-300 hover:scale-110"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Delete Transaction"
        message="Are you sure you want to delete this transaction? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}
