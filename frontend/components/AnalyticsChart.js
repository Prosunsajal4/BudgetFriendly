import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
];

export default function AnalyticsChart({
  spendingOverTime,
  categoryDistribution,
  insights,
}) {
  const pieData = Object.entries(categoryDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Spending Over Time */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Spending Over Time
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={spendingOverTime}>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-gray-200 dark:stroke-gray-700"
            />
            <XAxis
              dataKey="date"
              className="text-gray-600 dark:text-gray-400 text-xs"
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis className="text-gray-600 dark:text-gray-400 text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgb(255, 255, 255)",
                border: "1px solid rgb(229, 231, 235)",
                borderRadius: "8px",
              }}
              formatter={(value) => [`$${value.toFixed(2)}`, "Spent"]}
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Distribution */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Category Distribution
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgb(255, 255, 255)",
                border: "1px solid rgb(229, 231, 235)",
                borderRadius: "8px",
              }}
              formatter={(value) => [`$${value.toFixed(2)}`, "Amount"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Smart Insights */}
      {insights && insights.length > 0 && (
        <div className="card p-6 lg:col-span-2">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            💡 Smart Insights
          </h3>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
              >
                <p className="text-blue-900 dark:text-blue-100">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
