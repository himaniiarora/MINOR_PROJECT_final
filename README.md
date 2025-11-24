# 🎓 Interactive Learning Platform

A modern, gamified web application built with React for creating flashcards, taking quizzes, and tracking learning progress.

## 🌟 Features

- **Flashcard Management**: Create, edit, and delete flashcards organized by subjects
- **Interactive Quizzes**: Test knowledge with dynamic quizzes and instant feedback
- **Gamification**: Earn XP, level up, maintain study streaks, and unlock badges
- **Forest Garden**: Visual 30-day streak tracker with growing trees
- **Analytics Dashboard**: Track progress with interactive charts and statistics
- **Modern UI**: Smooth animations, responsive design, gradient themes

## 🛠️ Tech Stack

- **Frontend**: React.js (Hooks, Context API)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Storage**: LocalStorage

## 📦 Installation

\`\`\`bash
# Clone repository
git clone <your-repo-url>
cd interactive-learning-platform

# Install dependencies
npm install

# Start development server
npm start
\`\`\`

## 🚀 Usage

1. **Create Flashcards**: Navigate to Flashcards page and create cards by subject
2. **Take Quizzes**: Select a subject and test your knowledge
3. **Track Progress**: View analytics, streaks, and earned badges
4. **Grow Your Forest**: Study daily to grow trees in your learning forest

## 🎯 Gamification System

- **XP System**: Earn 10 XP per correct answer + streak bonuses
- **Levels**: Level up every 100 XP
- **Streaks**: Study daily to maintain and grow your streak
- **Badges**: Unlock 6 different achievement badges
- **Forest Garden**: Visual representation of 30-day learning journey

## 📊 Project Structure

\`\`\`
src/
├── App.jsx              # Main application component
├── index.js             # Entry point
├── index.css            # Global styles
└── components/          # (All components integrated in App.jsx)
    ├── Flashcards       # Flashcard CRUD operations
    ├── Quiz             # Quiz functionality
    ├── Dashboard        # Analytics & charts
    ├── Achievements     # Badges & forest garden
    └── Gamification     # XP, streaks, levels
\`\`\`

## 🎨 Key Components

- **AppProvider**: Global state management with Context API
- **FlashcardForm**: Modal for creating/editing flashcards
- **QuizPage**: Three-state quiz flow (setup → active → results)
- **ForestGarden**: 30-day tree growth visualization
- **DashboardPage**: Charts showing activity and performance
- **XPBar & StreakCounter**: Gamification UI elements

## 📝 Future Enhancements

- [ ] Firebase integration for cloud sync
- [ ] User authentication
- [ ] Collaborative flashcard sharing
- [ ] Spaced repetition algorithm
- [ ] Mobile app version
- [ ] Export/import flashcard sets

## 👨‍💻 Developer

**Your Name**  
BCA 5th Semester Project (2025-2026)  
[GitHub](https://github.com/yourusername) | [LinkedIn](https://linkedin.com/in/yourprofile)

## 📄 License

MIT License - Feel free to use this project for learning purposes
\`\`\`

## 🎨 **Design Enhancements Already Included:**

1. **Gradient Backgrounds** - Purple/Pink/Blue theme
2. **Smooth Animations** - Framer Motion for all interactions
3. **Interactive Cards** - Flip animation on flashcards
4. **Progress Indicators** - Visual XP bar, quiz progress
5. **Responsive Design** - Mobile-friendly layouts
6. **Icon Integration** - Lucide React icons throughout
7. **Chart Visualizations** - Bar, Line, and Pie charts
8. **Gamification UI** - Badges, streaks, forest garden

## 📋 **Additional Tips for Presentation:**

### **Demo Flow:**
1. Start on Home page → Show overview
2. Create flashcards → Demonstrate CRUD
3. Take a quiz → Show scoring & XP gain
4. View Dashboard → Explain analytics
5. Show Achievements → Forest garden & badges

### **Highlight These Points:**
- ✅ Clean, modular code structure
- ✅ Reusable components
- ✅ Custom hooks for localStorage
- ✅ Context API for state management
- ✅ Responsive and animated UI
- ✅ Complete CRUD operations
- ✅ Gamification for user engagement

### **For Your Project Report:**
- Include screenshots of all pages
- Explain the folder structure
- Document the component hierarchy
- Add flowcharts for quiz logic
- Include ER diagrams if adding backend later
