import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Clock, Target } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import type { UserProgress } from '../types';

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('user_progress')
        .select(`
          *,
          categories (
            name,
            description
          )
        `)
        .eq('user_id', user.id);

      if (!error && data) {
        setProgress(data);
      }
      setLoading(false);
    };

    fetchProgress();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
              <Trophy className="w-12 h-12 text-purple-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user?.username}</h1>
              <p className="text-gray-600">{user?.rank}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <Star className="w-5 h-5 text-yellow-500 mb-2" />
              <div className="text-2xl font-bold">{user?.points}</div>
              <div className="text-gray-600 text-sm">Total Points</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Target className="w-5 h-5 text-green-500 mb-2" />
              <div className="text-2xl font-bold">
                {progress.reduce((acc, curr) => acc + curr.correct_answers, 0)}
              </div>
              <div className="text-gray-600 text-sm">Correct Answers</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Clock className="w-5 h-5 text-blue-500 mb-2" />
              <div className="text-2xl font-bold">
                {progress.reduce((acc, curr) => acc + curr.questions_answered, 0)}
              </div>
              <div className="text-gray-600 text-sm">Questions Answered</div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {progress.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 p-4 rounded-lg"
              >
                <h3 className="font-semibold mb-2">{p.category_id}</h3>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Score: {p.total_points}</span>
                  <span>Correct: {p.correct_answers}/{p.questions_answered}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}