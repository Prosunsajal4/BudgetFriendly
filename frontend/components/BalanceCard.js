import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

export default function BalanceCard({ title, amount, icon: Icon, color, trend }) {
  const isPositive = trend >= 0;
  
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className={`text-3xl font-bold mt-1 ${color}`}>
            ${amount.toFixed(2)}
          </p>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{Math.abs(trend).toFixed(1)}%</span>
            </div>
          )}
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full">
          <Icon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
        </div>
      </div>
    </div>
  );
}
