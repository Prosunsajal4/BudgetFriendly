import { Calendar, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function PlanHistory({ userId }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.getAllPlans(userId);
        if (response.success) {
          setPlans(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch plans:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchPlans();
  }, [userId]);

  if (loading) {
    return <div className="card p-6">Loading history...</div>;
  }

  if (plans.length === 0) {
    return (
      <div className="card p-6 text-center text-gray-500 dark:text-gray-400">
        No study plans yet. Start by creating your first plan!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {plans.map((plan) => (
        <div key={plan._id} className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-900 dark:text-white">
                {new Date(plan.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{plan.totalDuration} min total</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {plan.tasks.filter(t => t.completed).length} / {plan.tasks.length} tasks completed
            </span>
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
              {plan.completionRate.toFixed(0)}% complete
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
