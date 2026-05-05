import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

export default function BalanceCard({
  title,
  amount,
  icon: Icon,
  color,
  trend,
}) {
  const isPositive = trend >= 0;

  const gradientColors = {
    green: "from-emerald-500 to-teal-500",
    blue: "from-blue-500 to-indigo-500",
    red: "from-red-500 to-pink-500",
    purple: "from-purple-500 to-violet-500",
  };

  const iconColors = {
    green: "bg-gradient-to-br from-emerald-400 to-teal-500",
    blue: "bg-gradient-to-br from-blue-400 to-indigo-500",
    red: "bg-gradient-to-br from-red-400 to-pink-500",
    purple: "bg-gradient-to-br from-purple-400 to-violet-500",
  };

  const gradient = gradientColors[color?.split("-")[1]] || gradientColors.blue;
  const iconBg = iconColors[color?.split("-")[1]] || iconColors.blue;

  return (
    <div className="card p-6 relative overflow-hidden group">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {title}
          </p>
          <p
            className={`text-4xl font-bold mt-2 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
          >
            ${amount.toFixed(2)}
          </p>
          {trend !== undefined && (
            <div
              className={`flex items-center gap-1 mt-3 text-sm font-medium ${isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
            >
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{Math.abs(trend).toFixed(1)}%</span>
            </div>
          )}
        </div>
        <div
          className={`p-4 rounded-2xl bg-gradient-to-br ${iconBg} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
}
