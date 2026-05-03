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
      <div className="card p-8 text-center text-gray-500 dark:text-gray-400">
        No transactions yet. Add your first transaction!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction._id}
          className="card p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${
                  transaction.type === "income"
                    ? "bg-green-100 dark:bg-green-900/30"
                    : "bg-red-100 dark:bg-red-900/30"
                }`}
              >
                {transaction.type === "income" ? (
                  <ArrowUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                ) : (
                  <ArrowDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {transaction.category}
                </p>
                {transaction.note && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {transaction.note}
                  </p>
                )}
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p
                className={`text-lg font-semibold ${
                  transaction.type === "income"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}$
                {transaction.amount.toFixed(2)}
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => onEdit && onEdit(transaction)}
                  className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteClick(transaction._id)}
                  className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
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
