import { Lightbulb } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

export default function SmartSuggestion({ userId }) {
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSuggestion = async () => {
    setLoading(true);
    try {
      const response = await api.getSmartSuggestion(userId);
      if (response.success) {
        setSuggestion(response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch suggestion');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchSuggestion();
  }, [userId]);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Smart Suggestion
        </h3>
        <button
          onClick={fetchSuggestion}
          disabled={loading}
          className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>
      
      {suggestion ? (
        <div>
          <p className="text-gray-700 dark:text-gray-300 mb-3">{suggestion.message}</p>
          {suggestion.task && (
            <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
              <p className="font-medium text-primary-900 dark:text-primary-100">
                {suggestion.task.title}
              </p>
              <div className="flex items-center gap-2 mt-2 text-sm text-primary-700 dark:text-primary-300">
                <span>{suggestion.task.duration} min</span>
                {suggestion.task.subjectId && (
                  <>
                    <span>•</span>
                    <span 
                      className="px-2 py-0.5 rounded text-white text-xs"
                      style={{ backgroundColor: suggestion.task.subjectId.color }}
                    >
                      {suggestion.task.subjectId.name}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">Loading suggestion...</p>
      )}
    </div>
  );
}
