import React from "react";


// Example data for charts
const dailyData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "XP",
      data: [100, 150, 120, 80, 200, 180, 220],
      borderColor: "#4ade80",
      backgroundColor: "rgba(74, 222, 128, 0.3)",
      tension: 0.4,
    },
  ],
};

const weeklyData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "XP",
      data: [450, 600, 700, 800],
      borderColor: "#60a5fa",
      backgroundColor: "rgba(96, 165, 250, 0.3)",
      tension: 0.4,
    },
  ],
};

const monthlyData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "XP",
      data: [1200, 1500, 1700, 1600, 1800, 2000],
      borderColor: "#f472b6",
      backgroundColor: "rgba(244, 114, 182, 0.3)",
      tension: 0.4,
    },
  ],
};

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        Gamified Learning Dashboard
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Stats & Performance */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <StatsCard title="Total XP" value={1200} icon="🏆" />
            <StatsCard title="Current Streak" value="7 Days" icon="🔥" />
            <StatsCard title="Quizzes Today" value={3} icon="📝" />
          </div>

          <div className="flex flex-col gap-6 mt-6">
            <PerformanceChart type="Daily XP" data={dailyData} />
            <PerformanceChart type="Weekly XP" data={weeklyData} />
            <PerformanceChart type="Monthly XP" data={monthlyData} />
          </div>
        </div>

        {/* Right: Forest */}
        <div className="lg:w-1/3 flex flex-col items-center gap-4">
          <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">
            Your Learning Forest
          </h3>
          <Forest streak={7} />
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
            Grow 1 tree for every day of learning. Complete 30 days to finish your forest!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
