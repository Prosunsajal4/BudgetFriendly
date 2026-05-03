# � Personal Finance Tracker SaaS

A production-level Personal Finance Tracker application with advanced features, built with Next.js (frontend), Express.js (backend), and MongoDB.

## ✨ Features

### � Income & Expense Tracking

- Add transactions with amount, category, note, and date
- Track income and expenses separately
- Automatic balance calculation

### 📊 Smart Dashboard

- Total balance overview
- Total income and expense summaries
- Visual balance cards with emoji indicators

### � Analytics Dashboard

- Spending over time visualization (bar chart)
- Category-wise distribution (pie chart)
- Smart insights based on spending patterns
- Weekly and monthly views

### ⚠️ Budget System

- Set monthly budget limits
- Real-time budget tracking
- Percentage usage display
- Alerts when approaching or exceeding budget

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

### 🎨 Modern UI/UX

- Clean, SaaS-style design (Notion/Linear inspired)
- Dark/Light mode support
- Smooth transitions and hover effects
- Fully responsive design
- Toast notifications
- Loading skeletons
- Empty states

## 🏗️ Tech Stack

### Frontend

- **Next.js 14** (JavaScript only)
- **React 18**
- **TailwindCSS** for styling
- **Recharts** for analytics charts
- **Lucide React** for icons
- **React Hot Toast** for notifications

### Backend

- **Node.js** with Express.js
- **MongoDB** (Atlas or local)
- **Mongoose** for ODM
- **date-fns** for date utilities
- **Axios** for API calls
- **MongoDB** with **Mongoose**
- **CORS** enabled
- **dotenv** for environment variables

## 📁 Project Structure

```
BudgetFriendly/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── planController.js    # Plan logic
│   │   ├── subjectController.js # Subject logic
│   │   └── userController.js    # User logic
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Subject.js           # Subject schema
│   │   ├── StudyPlan.js         # Study plan schema
│   │   └── StudySession.js      # Study session schema
│   ├── routes/
│   │   ├── planRoutes.js        # Plan endpoints
│   │   ├── subjectRoutes.js     # Subject endpoints
│   │   └── userRoutes.js        # User endpoints
│   ├── server.js                # Express server
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── components/
    │   ├── AnalyticsChart.js    # Charts component
    │   ├── LoadingSkeleton.js   # Loading states
    │   ├── PlanHistory.js       # History component
    │   ├── ProgressBar.js       # Progress indicator
    │   ├── SmartSuggestion.js   # AI suggestion
    │   ├── StreakCard.js        # Streak display
    │   ├── SubjectManager.js    # Subject CRUD
    │   └── TaskCard.js          # Task component
    ├── hooks/
    │   └── useTheme.js          # Theme toggle
    ├── lib/
    │   └── utils.js             # Utility functions
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
    └── .env.example
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
cp .env.example .env
```

4. Update `.env` with your MongoDB URI:

**Option A: MongoDB Atlas (Recommended - Free)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account
2. Create a new cluster (free tier)
3. Create a database user with username and password
4. Click "Connect" → "Connect your application"
5. Copy the connection string and replace `username:password` with your credentials
6. Update `.env`:

```
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/smart-study-planner?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

**Option B: Local MongoDB**

1. Install MongoDB locally on your machine
2. Start MongoDB service
3. Update `.env`:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-study-planner
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

5. Start the backend server:

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

### Plans

- `POST /api/plans/generate-plan` - Generate a new study plan
- `GET /api/plans/today-plan/:userId` - Get today's plan
- `POST /api/plans/complete-task/:planId/:taskId` - Complete a task
- `GET /api/plans/analytics/:userId` - Get analytics data
- `GET /api/plans/streak/:userId` - Get user streak
- `GET /api/plans/:userId` - Get all plans
- `GET /api/plans/:userId/:date` - Get plan by date
- `GET /api/plans/smart-suggestion/:userId` - Get smart suggestion

### Subjects

- `GET /api/subjects/:userId` - Get all subjects
- `POST /api/subjects` - Create a subject
- `DELETE /api/subjects/:id` - Delete a subject

### Users

- `POST /api/users` - Create a user
- `GET /api/users/:userId` - Get user by ID

## 🎯 Usage

1. **Create an Account**: Fill in your name, email, and password on the welcome screen
2. **Add Subjects**: Use the Subjects panel to add your study subjects with colors
3. **Generate Plan**: Click "Generate Plan" to create today's study schedule
4. **Complete Tasks**: Check off tasks as you complete them
5. **Track Progress**: View your streak, completion rate, and analytics
6. **Get Suggestions**: Use the "Smart Suggestion" feature to know what to study next

## 🎨 Features in Detail

### Daily Streak

- Automatically tracks consecutive study days
- Resets if you miss a day
- Displayed prominently on the dashboard

### Smart Suggestion

- Analyzes incomplete tasks
- Prioritizes by importance (high > medium > low)
- Shows subject and duration

### Analytics

- Daily study time bar chart
- Subject distribution pie chart
- Overall completion rate progress bar
- Filterable by 7, 14, or 30 days

### History

- View all past study plans
- See completion statistics per plan
- Organized by date

## 🔧 Configuration

### MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in backend `.env` file

### Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use default connection string: `mongodb://localhost:27017/smart-study-planner`

## 📝 Database Schema

### User

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  streak: Number (default: 0),
  lastStudyDate: Date,
  createdAt: Date
}
```

### Subject

```javascript
{
  name: String,
  color: String (default: '#3B82F6'),
  userId: ObjectId (ref: User),
  createdAt: Date
}
```

### StudyPlan

```javascript
{
  userId: ObjectId (ref: User),
  date: Date,
  tasks: [{
    subjectId: ObjectId (ref: Subject),
    title: String,
    duration: Number (minutes),
    completed: Boolean,
    priority: String (low/medium/high)
  }],
  totalDuration: Number,
  completionRate: Number,
  createdAt: Date
}
```

### StudySession

```javascript
{
  userId: ObjectId (ref: User),
  subjectId: ObjectId (ref: Subject),
  taskId: ObjectId,
  duration: Number (minutes),
  date: Date,
  completed: Boolean,
  createdAt: Date
}
```

## 🚀 Deployment

### Backend (e.g., Render, Railway, Heroku)

1. Push backend code to your repository
2. Connect to deployment platform
3. Set environment variables
4. Deploy

### Frontend (e.g., Vercel, Netlify)

1. Push frontend code to your repository
2. Connect to deployment platform
3. Set `NEXT_PUBLIC_API_URL` to your deployed backend URL
4. Deploy

## 🤝 Contributing

This is a portfolio-ready project. Feel free to extend it with:

- User authentication with JWT
- Email notifications
- Calendar integration
- Pomodoro timer
- Study reminders
- Social features

## 📄 License

ISC

## 👨‍💻 Author

Built as a production-level SaaS application for portfolio demonstration.

---

**Note**: This project uses JavaScript only (no TypeScript) as per requirements.
