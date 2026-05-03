import { Flame } from 'lucide-react';

export default function StreakCard({ streak }) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Daily Streak</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
            {streak} days
          </p>
        </div>
        <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
          <Flame className="w-8 h-8 text-orange-500" />
        </div>
      </div>
    </div>
  );
}
