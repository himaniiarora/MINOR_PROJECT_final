import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const ProgressCharts = ({ weeklyData = [], monthlyData = [], timeSpent = {} }) => {
  const [activeView, setActiveView] = useState('weekly'); // 'weekly' or 'monthly'

  // Sample data structure - replace with actual data
  const defaultWeeklyData = weeklyData.length > 0 ? weeklyData : [
    { day: 'Mon', quizScore: 75, timeSpent: 45, quizzesTaken: 3 },
    { day: 'Tue', quizScore: 82, timeSpent: 60, quizzesTaken: 4 },
    { day: 'Wed', quizScore: 78, timeSpent: 38, quizzesTaken: 2 },
    { day: 'Thu', quizScore: 88, timeSpent: 72, quizzesTaken: 5 },
    { day: 'Fri', quizScore: 85, timeSpent: 55, quizzesTaken: 3 },
    { day: 'Sat', quizScore: 90, timeSpent: 80, quizzesTaken: 6 },
    { day: 'Sun', quizScore: 79, timeSpent: 42, quizzesTaken: 2 }
  ];

  const defaultMonthlyData = monthlyData.length > 0 ? monthlyData : [
    { week: 'Week 1', avgScore: 78, totalTime: 210, totalQuizzes: 15 },
    { week: 'Week 2', avgScore: 82, totalTime: 245, totalQuizzes: 18 },
    { week: 'Week 3', avgScore: 85, totalTime: 268, totalQuizzes: 20 },
    { week: 'Week 4', avgScore: 88, totalTime: 290, totalQuizzes: 22 }
  ];

  // Pie chart data for time distribution
  const timeDistribution = [
    { name: 'Quizzes', value: timeSpent.quizzes || 180, color: '#3b82f6' },
    { name: 'Flashcards', value: timeSpent.flashcards || 120, color: '#10b981' },
    { name: 'Reading', value: timeSpent.reading || 90, color: '#f59e0b' }
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
      {/* Header with toggle */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">Your Progress</h3>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveView('weekly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeView === 'weekly' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setActiveView('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeView === 'monthly' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-xl">
          <p className="text-sm text-blue-600 font-medium">Total Time</p>
          <p className="text-3xl font-bold text-blue-700">{Math.floor(totalTime / 60)}h {totalTime % 60}m</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl">
          <p className="text-sm text-green-600 font-medium">Avg Score</p>
          <p className="text-3xl font-bold text-green-700">
            {activeView === 'weekly' 
              ? Math.round(defaultWeeklyData.reduce((acc, d) => acc + d.quizScore, 0) / defaultWeeklyData.length)
              : Math.round(defaultMonthlyData.reduce((acc, d) => acc + d.avgScore, 0) / defaultMonthlyData.length)
            }%
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl">
          <p className="text-sm text-purple-600 font-medium">Quizzes Done</p>
          <p className="text-3xl font-bold text-purple-700">
            {activeView === 'weekly'
              ? defaultWeeklyData.reduce((acc, d) => acc + d.quizzesTaken, 0)
              : defaultMonthlyData.reduce((acc, d) => acc + d.totalQuizzes, 0)
            }
          </p>
        </div>
      </div>

      {/* Time Distribution Pie Chart */}
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

      {/* Performance Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          {activeView === 'weekly' ? 'Weekly Performance' : 'Monthly Performance'}
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          {activeView === 'weekly' ? (
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
                dot={{ fill: '#3b82f6', r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="totalTime" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Total Time (min)"
                dot={{ fill: '#10b981', r: 5 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Activity Heatmap Preview */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Activity Heatmap</h4>
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 30 }).map((_, index) => {
            const intensity = Math.floor(Math.random() * 4);
            const colors = ['bg-gray-100', 'bg-green-200', 'bg-green-400', 'bg-green-600'];
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

export default ProgressCharts;