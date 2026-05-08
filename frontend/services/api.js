const API_URL = "https://budgetfriendly.vercel.app/api";

console.log("API URL:", API_URL);

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    console.error("API Error:", response.status, error);
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${error}`,
    );
  }
  return response.json();
};

export const api = {
  // Transactions
  createTransaction: async (data) => {
    const response = await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  getTransactions: async (userId, filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await fetch(
      `${API_URL}/transactions/${userId}${params ? "?" + params : ""}`,
    );
    return handleResponse(response);
  },

  updateTransaction: async (id, data) => {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  deleteTransaction: async (id) => {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },

  getAnalytics: async (userId, period = "month") => {
    const response = await fetch(
      `${API_URL}/transactions/analytics/${userId}?period=${period}`,
    );
    return handleResponse(response);
  },

  getDashboard: async (userId) => {
    const response = await fetch(`${API_URL}/transactions/dashboard/${userId}`);
    return handleResponse(response);
  },

  // Budget
  setBudget: async (data) => {
    const response = await fetch(`${API_URL}/budget`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  getBudget: async (userId, month) => {
    const response = await fetch(`${API_URL}/budget/${userId}/${month}`);
    return handleResponse(response);
  },

  // Users
  createUser: async (data) => {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  getUser: async (userId) => {
    const response = await fetch(`${API_URL}/users/${userId}`);
    return handleResponse(response);
  },
};
