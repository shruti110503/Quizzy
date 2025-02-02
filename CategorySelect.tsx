import { motion } from 'framer-motion';
import { BookOpen, Gauge } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';

export default function CategorySelect() {
  const { categories, setSelectedCategory, setDifficulty } = useGameStore();
  const navigate = useNavigate();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Choose Your Challenge</h1>
          <p className="text-gray-600">Select a category and difficulty to begin</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Gauge className="w-5 h-5" />
            Difficulty Level
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {['easy', 'medium', 'hard'].map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level as 'easy' | 'medium' | 'hard')}
                className="p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <span className="capitalize font-semibold">{level}</span>
              </button>
            ))}
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Categories
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategorySelect(category)}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-left"
            >
              <h3 className="text-lg font-semibold">{category}</h3>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}