# Personal Finance Tracker

A modern, production-level Personal Finance Tracker application with advanced features, built with Next.js (frontend), Express.js (backend), and MongoDB.

## ✨ Features

### 💰 Income & Expense Tracking

- Add transactions with amount, category, note, and date
- Track income and expenses separately
- Automatic balance calculation
- Edit and delete transactions

### 📊 Smart Dashboard

- Total balance overview with gradient styling
- Total income and expense summaries
- Visual balance cards with modern icons
- Real-time data refresh

### 📈 Analytics Dashboard

- Spending over time visualization (bar chart)
- Category-wise distribution (pie chart)
- Smart insights based on spending patterns
- Weekly and monthly views
- Summary statistics cards

### 💵 Budget System

- Set monthly budget limits
- Real-time budget tracking
- Percentage usage display with gradient progress bar
- Alerts when approaching or exceeding budget
- Visual budget status indicators

### 🤖 Smart Insights

- Automatic spending analysis
- Alerts for excessive spending categories
- Comparison with previous month
- Savings rate tracking

### 📅 Transaction History

- View all past transactions
- Search by note or category
- Filter by category
- Edit and delete transactions
- Modern card-based layout

### 🎨 Modern UI/UX

- Clean, modern SaaS-style design
- Glassmorphism effects throughout
- Gradient color schemes (blue to indigo)
- Dark/Light mode support with theme toggle
- Smooth transitions and hover effects
- Fully responsive design (mobile-first)
- Toast notifications
- Loading skeletons
- Empty states
- Custom modals and confirmations

### 🧭 Navigation

- Fixed glassmorphism navbar
- Mobile hamburger menu
- Theme toggle button
- Notifications bell with indicator
- Profile dropdown menu
- Active route indicators

### 📋 Footer

- Professional footer with newsletter signup
- Contact information section
- Quick links and resources
- Social media links
- Back to top button
- Responsive 5-column layout

## 🏗️ Tech Stack

### Frontend

- **Next.js 14** (JavaScript only)
- **React 18**
- **TailwindCSS** for styling
- **Recharts** for analytics charts
- **Lucide React** for icons
- **React Hot Toast** for notifications
- **date-fns** for date utilities

### Backend

- **Node.js** with Express.js
- **MongoDB** (Atlas or local)
- **Mongoose** for ODM
- **bcryptjs** for password hashing
- **jsonwebtoken** for JWT authentication
- **CORS** enabled
- **dotenv** for environment variables

## 📁 Project Structure

```
BudgetFriendly/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── transactionController.js  # Transaction logic
│   │   ├── budgetController.js       # Budget logic
│   │   └── userController.js         # User logic
│   ├── models/
│   │   ├── Transaction.js       # Transaction schema
│   │   ├── Budget.js            # Budget schema
│   │   └── User.js              # User schema
│   ├── routes/
│   │   ├── transactionRoutes.js # Transaction endpoints
│   │   ├── budgetRoutes.js      # Budget endpoints
│   │   └── userRoutes.js        # User endpoints
│   ├── api/
│   │   └── index.js             # Serverless entry point
│   ├── server.js                # Express server
│   ├── vercel.json              # Vercel configuration
│   ├── package.json
│   └── .env.example

└── frontend/
    ├── components/
    │   ├── Navbar.js            # Navigation component
    │   ├── Footer.js            # Footer component
    │   ├── BalanceCard.js       # Balance display card
    │   ├── TransactionForm.js   # Add transaction form
    │   ├── TransactionList.js   # Transaction list
    │   ├── BudgetCard.js        # Budget management
    │   ├── AnalyticsChart.js    # Charts component
    │   ├── ConfirmModal.js      # Confirmation modal
    │   └── LoadingSkeleton.js   # Loading states
    ├── hooks/
    │   └── useTheme.js          # Theme toggle hook
    ├── pages/
    │   ├── _app.js              # App wrapper
    │   ├── _document.js         # HTML structure
    │   ├── index.js             # Dashboard
    │   ├── analytics.js         # Analytics page
    │   └── history.js           # History page
    ├── services/
    │   └── api.js               # API service
    ├── styles/
    │   └── globals.css          # Global styles
    ├── package.json
    ├── tailwind.config.js
    ├── next.config.js
    └── .env.local
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finance-tracker
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

4. Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the Next.js development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📡 API Endpoints

### Transactions

- `POST /api/transactions` - Create a transaction
- `GET /api/transactions/:userId` - Get all transactions
- `PUT /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction
- `GET /api/transactions/analytics/:userId` - Get analytics data
- `GET /api/transactions/dashboard/:userId` - Get dashboard summary

### Budget

- `POST /api/budget` - Set monthly budget
- `GET /api/budget/:userId/:month` - Get budget for a month

### Users

- `POST /api/users` - Create a user
- `GET /api/users/:userId` - Get user by ID

## 🎯 Usage

1. **Create an Account**: Fill in your name, email, and password on the welcome screen
2. **Add Transactions**: Use the transaction form to add income or expenses
3. **Set Budget**: Set your monthly budget to track spending
4. **View Analytics**: Explore spending patterns with charts and insights
5. **Track History**: View and manage all your past transactions
6. **Toggle Theme**: Switch between light and dark mode
7. **Mobile Access**: Fully responsive for mobile devices

## 📝 Database Schema

### User

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Transaction

```javascript
{
  userId: ObjectId (ref: User),
  type: String (income/expense),
  amount: Number,
  category: String,
  note: String,
  date: Date,
  createdAt: Date
}
```

### Budget

```javascript
{
  userId: ObjectId (ref: User),
  month: String (YYYY-MM),
  monthlyBudget: Number,
  spent: Number,
  createdAt: Date
}
```

## 🚀 Deployment

### Backend (Vercel)

1. Push backend code to GitHub
2. Import project to Vercel
3. Set environment variables (MONGODB_URI, JWT_SECRET)
4. Deploy

### Frontend (Vercel)

1. Push frontend code to GitHub
2. Import project to Vercel
3. Set `NEXT_PUBLIC_API_URL` to your deployed backend URL
4. Deploy

## 🎨 UI Features

### Modern Design

- Gradient backgrounds (blue to indigo)
- Glassmorphism effects
- Smooth animations and transitions
- Hover effects on interactive elements
- Shadow depth for cards and buttons

### Responsive Design

- Mobile-first approach
- Hamburger menu for mobile navigation
- Stacked layouts on small screens
- Touch-friendly buttons and inputs
- Responsive typography

### Dark Mode

- Seamless theme switching
- Persistent theme preference
- Optimized colors for both modes

## 🤝 Contributing

This is a portfolio-ready project. Feel free to extend it with:

- User authentication with JWT
- Email notifications for budget alerts
- Export reports (PDF, CSV)
- Recurring transactions
- Multiple currencies support
- Bank account integration
- Investment tracking

## 📄 License

ISC

## 👨‍💻 Author

Built as a production-level SaaS application for portfolio demonstration.

---

**Note**: This project uses JavaScript only (no TypeScript) as per requirements.
