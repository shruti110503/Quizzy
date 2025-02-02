# Interactive Quiz Application

A dynamic, gamified quiz application built with React, TypeScript, and Framer Motion. The application features real-time scoring, animations, and an engaging user interface.

![Quiz App Screenshot](https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.1)

## Features

- 🎮 Interactive quiz interface with gamification elements
- ⏱️ Timed questions with bonus points
- 🔥 Streak system for consecutive correct answers
- 🎯 Real-time feedback on answers
- 📊 Comprehensive score summary
- ✨ Smooth animations and transitions
- 📱 Responsive design for all devices

## Demo Video

[View Demo on YouTube](https://youtu.be/your-demo-video)

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/quiz-app.git
cd quiz-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # React components
│   ├── QuizCard.tsx    # Question display component
│   ├── StartScreen.tsx # Initial screen component
│   └── QuizSummary.tsx # Results screen component
├── types.ts            # TypeScript interfaces
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## Features in Detail

### Quiz Flow
1. **Start Screen**
   - Displays quiz title and description
   - Shows game rules and instructions
   - Start button to begin the quiz

2. **Question Screen**
   - Timer countdown for each question
   - Multiple choice answers
   - Visual feedback for correct/incorrect answers
   - Current streak display
   - Points indicator

3. **Summary Screen**
   - Total score calculation
   - Accuracy percentage
   - Average time per question
   - Best streak achieved
   - Option to restart the quiz

### Gamification Elements

1. **Scoring System**
   - Base points for correct answers
   - Time bonus: faster answers earn more points
   - Streak bonus: consecutive correct answers multiply points

2. **Visual Feedback**
   - Color-coded answers (green for correct, red for incorrect)
   - Animated transitions between questions
   - Streak counter with visual indicator

3. **Time Management**
   - 30-second timer per question
   - Time bonus points for quick answers
   - Automatic progression when time expires

## Code Examples

### Scoring System
```typescript
const calculateScore = (isCorrect: boolean, timeLeft: number, streak: number) => {
  if (!isCorrect) return 0;
  
  const basePoints = question.points;
  const timeBonus = Math.max(0, Math.floor(timeLeft * 2));
  const streakBonus = Math.floor(streak / 3) * 50;
  
  return basePoints + timeBonus + streakBonus;
};
```

### Timer Implementation
```typescript
useEffect(() => {
  let timer: number;
  if (gameState === 'playing' && timeLeft > 0 && selectedAnswer === null) {
    timer = window.setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
  }
  return () => clearInterval(timer);
}, [gameState, timeLeft, selectedAnswer]);
```

## Screenshots

### Start Screen
![Start Screen](https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.1)

### Question Screen
![Question Screen](https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.1)

### Results Screen
![Results Screen](https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.1)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons provided by [Lucide Icons](https://lucide.dev)
- UI inspiration from modern quiz applications
- Special thanks to all contributors