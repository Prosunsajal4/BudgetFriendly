import { CheckCircle2, Circle, Clock } from 'lucide-react';

export default function TaskCard({ task, onComplete, planId }) {
  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className={`card p-4 mb-3 transition-all duration-200 hover:shadow-md ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onComplete(planId, task._id)}
          className="mt-1 flex-shrink-0"
        >
          {task.completed ? (
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          ) : (
            <Circle className="w-6 h-6 text-gray-400 hover:text-primary-500 transition-colors" />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
              {task.title}
            </h3>
            <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
          </div>
          
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{task.duration} min</span>
            </div>
            {task.subjectId && (
              <span 
                className="px-2 py-0.5 rounded text-white text-xs"
                style={{ backgroundColor: task.subjectId.color }}
              >
                {task.subjectId.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
