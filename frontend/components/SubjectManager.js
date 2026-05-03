import { useState, useEffect } from 'react';
import { Plus, Trash2, BookOpen } from 'lucide-react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

export default function SubjectManager({ userId }) {
  const [subjects, setSubjects] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: '', color: '#3B82F6' });
  const [loading, setLoading] = useState(true);

  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', 
    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
  ];

  useEffect(() => {
    fetchSubjects();
  }, [userId]);

  const fetchSubjects = async () => {
    try {
      const response = await api.getSubjects(userId);
      if (response.success) {
        setSubjects(response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch subjects');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    if (!newSubject.name.trim()) return;

    try {
      const response = await api.createSubject({
        userId,
        name: newSubject.name,
        color: newSubject.color,
      });

      if (response.success) {
        setSubjects([...subjects, response.data]);
        setNewSubject({ name: '', color: '#3B82F6' });
        setShowAddForm(false);
        toast.success('Subject added successfully');
      }
    } catch (error) {
      toast.error('Failed to add subject');
    }
  };

  const handleDeleteSubject = async (id) => {
    try {
      const response = await api.deleteSubject(id);
      if (response.success) {
        setSubjects(subjects.filter(s => s._id !== id));
        toast.success('Subject deleted');
      }
    } catch (error) {
      toast.error('Failed to delete subject');
    }
  };

  if (loading) {
    return <div className="card p-6">Loading subjects...</div>;
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary-500" />
          Subjects
        </h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary flex items-center gap-2 text-sm py-1.5 px-3"
        >
          <Plus className="w-4 h-4" />
          Add Subject
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddSubject} className="mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <input
            type="text"
            placeholder="Subject name"
            value={newSubject.name}
            onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
            className="input mb-3"
            autoFocus
          />
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">Color:</span>
            <div className="flex gap-2">
              {colors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setNewSubject({ ...newSubject, color })}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    newSubject.color === color ? 'border-gray-900 scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn-primary flex-1">Add</button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {subjects.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No subjects yet. Add your first subject to get started!
        </p>
      ) : (
        <div className="space-y-2">
          {subjects.map(subject => (
            <div
              key={subject._id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: subject.color }}
                />
                <span className="font-medium text-gray-900 dark:text-white">
                  {subject.name}
                </span>
              </div>
              <button
                onClick={() => handleDeleteSubject(subject._id)}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
