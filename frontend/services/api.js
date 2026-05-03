const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = {
  // Transactions
  createTransaction: async (data) => {
    const response = await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getTransactions: async (userId, filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await fetch(
      `${API_URL}/transactions/${userId}${params ? "?" + params : ""}`,
    );
    return response.json();
  },

  updateTransaction: async (id, data) => {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  deleteTransaction: async (id) => {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },

  getAnalytics: async (userId, period = "month") => {
    const response = await fetch(
      `${API_URL}/transactions/analytics/${userId}?period=${period}`,
    );
    return response.json();
  },

  getDashboard: async (userId) => {
    const response = await fetch(`${API_URL}/transactions/dashboard/${userId}`);
    return response.json();
  },

  // Budget
  setBudget: async (data) => {
    const response = await fetch(`${API_URL}/budget`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getBudget: async (userId, month) => {
    const response = await fetch(`${API_URL}/budget/${userId}/${month}`);
    return response.json();
  },

  // Users
  createUser: async (data) => {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getUser: async (userId) => {
    const response = await fetch(`${API_URL}/users/${userId}`);
    return response.json();
  },
};
