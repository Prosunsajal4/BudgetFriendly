const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getAnalytics,
  getDashboard,
} = require("../controllers/transactionController");

router.post("/", createTransaction);
router.get("/analytics/:userId", getAnalytics);
router.get("/dashboard/:userId", getDashboard);
router.get("/:userId", getTransactions);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;
