import { motion } from 'framer-motion';
import { Brain, Target, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <motion.h1
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="text-6xl font-bold mb-6"
          >
            Welcome to Quizzy
          </motion.h1>
          <p className="text-xl mb-12">
            Test your knowledge across various topics!
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Brain,
                title: "Multiple Categories",
                description: "Test your knowledge across various topics"
              },
              {
                icon: Target,
                title: "Adaptive Difficulty",
                description: "Choose your challenge level"
              },
              {
                icon: Trophy,
                title: "Score Points",
                description: "Earn points for correct answers"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * (index + 1) }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
              >
                <feature.icon className="w-12 h-12 mb-4 mx-auto text-white" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <Link
            to="/categories"
            className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
          >
            Start Quiz
          </Link>
        </motion.div>
      </div>
    </div>
  );
}