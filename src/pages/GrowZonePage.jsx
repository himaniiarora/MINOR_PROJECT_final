import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// Forest Component
const Forest = ({ streak = 0 }) => {
  const [animatedTrees, setAnimatedTrees] = useState(0);
  const totalTrees = 30;

  useEffect(() => {
    if (streak > 0) {
      let count = 0;
      const interval = setInterval(() => {
        if (count < streak && count < totalTrees) {
          count++;
          setAnimatedTrees(count);
        } else {
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [streak]);

  const Tree = ({ grown, delay }) => (
    <div
      className={`transition-all duration-500 ${
        grown ? "scale-100 opacity-100" : "scale-50 opacity-30"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <svg width="40" height="50" viewBox="0 0 40 50">
        <rect x="16" y="30" width="8" height="20" fill="#8b4513" />
        <polygon points="20,10 10,25 30,25" fill={grown ? "#10b981" : "#d1d5db"} />
        <polygon points="20,18 12,30 28,30" fill={grown ? "#059669" : "#9ca3af"} />
        <polygon points="20,25 14,35 26,35" fill={grown ? "#047857" : "#6b7280"} />
      </svg>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-sky-200 to-green-100 rounded-2xl p-8 h-full">
      <div className="relative mb-6">
        <div className="absolute top-0 right-8">
          <div className="w-16 h-16 bg-yellow-300 rounded-full animate-pulse shadow-lg shadow-yellow-200"></div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Growth Forest</h3>
        <p className="text-gray-600">
          {streak} day{streak !== 1 ? "s" : ""} streak • {totalTrees - streak} trees to go!
        </p>
      </div>
      <div className="grid grid-cols-6 gap-4 place-items-center mt-8">
        {Array.from({ length: totalTrees }).map((_, index) => (
          <Tree key={index} grown={index < animatedTrees} delay={index * 50} />
        ))}
      </div>
      <div className="mt-6 h-8 bg-gradient-to-t from-green-800 to-green-600 rounded-lg"></div>
      {streak >= 7 && (
        <div className="mt-6 flex gap-3 justify-center flex-wrap">
          {streak >= 7 && (
            <div className="bg-yellow-100 px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
              <span className="text-2xl">🌱</span>
              <span className="text-sm font-semibold text-yellow-800">7 Day Streak!</span>
            </div>
          )}
          {streak >= 14 && (
            <div className="bg-green-100 px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
              <span className="text-2xl">🌳</span>
              <span className="text-sm font-semibold text-green-800">14 Day Streak!</span>
            </div>
          )}
          {streak >= 30 && (
            <div className="bg-emerald-100 px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
              <span className="text-2xl">🏆</span>
              <span className="text-sm font-semibold text-emerald-800">Forest Complete!</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Progress Charts Component
const ProgressCharts = ({ weeklyData = [], monthlyData = [], timeSpent = {} }) => {
  const [activeView, setActiveView] = useState("weekly");

  const defaultWeeklyData =
    weeklyData.length > 0
      ? weeklyData
      : [
          { day: "Mon", quizScore: 75, timeSpent: 45, quizzesTaken: 3 },
          { day: "Tue", quizScore: 82, timeSpent: 60, quizzesTaken: 4 },
          { day: "Wed", quizScore: 78, timeSpent: 38, quizzesTaken: 2 },
          { day: "Thu", quizScore: 88, timeSpent: 72, quizzesTaken: 5 },
          { day: "Fri", quizScore: 85, timeSpent: 55, quizzesTaken: 3 },
          { day: "Sat", quizScore: 90, timeSpent: 80, quizzesTaken: 6 },
          { day: "Sun", quizScore: 79, timeSpent: 42, quizzesTaken: 2 },
        ];

  const defaultMonthlyData =
    monthlyData.length > 0
      ? monthlyData
      : [
          { week: "Week 1", avgScore: 78, totalTime: 210, totalQuizzes: 15 },
          { week: "Week 2", avgScore: 82, totalTime: 245, totalQuizzes: 18 },
          { week: "Week 3", avgScore: 85, totalTime: 268, totalQuizzes: 20 },
          { week: "Week 4", avgScore: 88, totalTime: 290, totalQuizzes: 22 },
        ];

  const timeDistribution = [
    { name: "Quizzes", value: timeSpent.quizzes || 180, color: "#3b82f6" },
    { name: "Flashcards", value: timeSpent.flashcards || 120, color: "#10b981" },
    { name: "Reading", value: timeSpent.reading || 90, color: "#f59e0b" },
  ];

  const totalTime = timeDistribution.reduce((acc, item) => acc + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{payload[0].payload.day || payload[0].payload.week}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">Your Progress</h3>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveView("weekly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeView === "weekly" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setActiveView("monthly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeView === "monthly" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-xl">
          <p className="text-sm text-blue-600 font-medium">Total Time</p>
          <p className="text-3xl font-bold text-blue-700">{Math.floor(totalTime / 60)}h {totalTime % 60}m</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl">
          <p className="text-sm text-green-600 font-medium">Avg Score</p>
          <p className="text-3xl font-bold text-green-700">
            {activeView === "weekly"
              ? Math.round(defaultWeeklyData.reduce((acc, d) => acc + d.quizScore, 0) / defaultWeeklyData.length)
              : Math.round(defaultMonthlyData.reduce((acc, d) => acc + d.avgScore, 0) / defaultMonthlyData.length)}
            %
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl">
          <p className="text-sm text-purple-600 font-medium">Quizzes Done</p>
          <p className="text-3xl font-bold text-purple-700">
            {activeView === "weekly"
              ? defaultWeeklyData.reduce((acc, d) => acc + d.quizzesTaken, 0)
              : defaultMonthlyData.reduce((acc, d) => acc + d.totalQuizzes, 0)}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Time Distribution</h4>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={timeDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {timeDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          {activeView === "weekly" ? "Weekly Performance" : "Monthly Performance"}
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          {activeView === "weekly" ? (
            <BarChart data={defaultWeeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="quizScore" fill="#3b82f6" name="Quiz Score (%)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="timeSpent" fill="#10b981" name="Time Spent (min)" radius={[8, 8, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={defaultMonthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="avgScore"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Avg Score (%)"
                dot={{ fill: "#3b82f6", r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="totalTime"
                stroke="#10b981"
                strokeWidth={3}
                name="Total Time (min)"
                dot={{ fill: "#10b981", r: 5 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Activity Heatmap</h4>
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 30 }).map((_, index) => {
            const intensity = Math.floor(Math.random() * 4);
            const colors = ["bg-gray-100", "bg-green-200", "bg-green-400", "bg-green-600"];
            return (
              <div
                key={index}
                className={`w-8 h-8 rounded ${colors[intensity]} hover:ring-2 ring-blue-500 transition-all cursor-pointer`}
                title={`Day ${index + 1}`}
              />
            );
          })}
        </div>
        <p className="text-sm text-gray-500 mt-3">Last 30 days of activity</p>
      </div>
    </div>
  );
};

// Main GrowZone Component
const GrowZone = ({ userId }) => {
  const [streak, setStreak] = useState(0);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [timeSpent, setTimeSpent] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, [userId]);

  const loadUserData = async () => {
    setIsLoading(true);
    setTimeout(() => {
      const calculatedStreak = 10;
      setStreak(calculatedStreak);

      const weekly = [
        { day: "Mon", quizScore: 75, timeSpent: 45, quizzesTaken: 3 },
        { day: "Tue", quizScore: 82, timeSpent: 60, quizzesTaken: 4 },
        { day: "Wed", quizScore: 78, timeSpent: 38, quizzesTaken: 2 },
        { day: "Thu", quizScore: 88, timeSpent: 72, quizzesTaken: 5 },
        { day: "Fri", quizScore: 85, timeSpent: 55, quizzesTaken: 3 },
        { day: "Sat", quizScore: 90, timeSpent: 80, quizzesTaken: 6 },
        { day: "Sun", quizScore: 79, timeSpent: 42, quizzesTaken: 2 },
      ];
      setWeeklyData(weekly);

      const monthly = [
        { week: "Week 1", avgScore: 78, totalTime: 210, totalQuizzes: 15 },
        { week: "Week 2", avgScore: 82, totalTime: 245, totalQuizzes: 18 },
        { week: "Week 3", avgScore: 85, totalTime: 268, totalQuizzes: 20 },
        { week: "Week 4", avgScore: 88, totalTime: 290, totalQuizzes: 22 },
      ];
      setMonthlyData(monthly);

      const time = { quizzes: 240, flashcards: 180, reading: 120 };
      setTimeSpent(time);

      setIsLoading(false);
    }, 1000);
  };

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your growth journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">GrowZone</h1>
          <p className="text-gray-600 text-lg">Track your learning journey and watch your forest grow! 🌱</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ProgressCharts weeklyData={weeklyData} monthlyData={monthlyData} timeSpent={timeSpent} />
          </div>
          <div className="lg:sticky lg:top-6 h-fit">
            <Forest streak={streak} />
            <div className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-2xl text-white shadow-lg">
              <h3 className="text-xl font-bold mb-2">Keep Growing! 🚀</h3>
              <p className="text-purple-100 mb-4">
                {streak < 7 && "You're off to a great start! Keep learning to grow more trees."}
                {streak >= 7 && streak < 14 && "Amazing! You're building a great habit. Keep it up!"}
                {streak >= 14 && streak < 30 && "Incredible progress! You're halfway to a complete forest!"}
                {streak >= 30 && "🎉 Congratulations! You've grown a complete forest!"}
              </p>
              <div className="flex gap-3">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <p className="text-xs text-purple-100">Streak</p>
                  <p className="text-lg font-bold">{streak} days</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <p className="text-xs text-purple-100">Total Trees</p>
                  <p className="text-lg font-bold">30</p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => navigate("/quiz")}
                  className="bg-white/80 hover:bg-white text-blue-600 font-semibold px-4 py-2 rounded-xl shadow-md flex items-center justify-center gap-2 transition"
                >
                  📝 Take a Quiz
                </button>
                <button
                  onClick={() => navigate("/flashcard")}
                  className="bg-white/80 hover:bg-white text-green-600 font-semibold px-4 py-2 rounded-xl shadow-md flex items-center justify-center gap-2 transition"
                >
                  🃏 Practice Flashcards
                </button>
                <button
                  onClick={() => navigate("/growzone")}
                  className="bg-white/80 hover:bg-white text-purple-600 font-semibold px-4 py-2 rounded-xl shadow-md flex items-center justify-center gap-2 transition"
                >
                  📊 View Detailed Stats
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowZone;
