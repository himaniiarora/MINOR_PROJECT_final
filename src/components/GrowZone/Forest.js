import React, { useEffect, useState } from 'react';

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

  const getTreeColor = (index) => {
    if (index < animatedTrees) {
      return '#10b981'; // Green for grown trees
    }
    return '#d1d5db'; // Gray for ungrown trees
  };

  const Tree = ({ grown, delay }) => (
    <div
      className={`transition-all duration-500 ${grown ? 'scale-100 opacity-100' : 'scale-50 opacity-30'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <svg width="40" height="50" viewBox="0 0 40 50">
        {/* Tree trunk */}
        <rect x="16" y="30" width="8" height="20" fill="#8b4513" />
        {/* Tree leaves - 3 triangular layers */}
        <polygon points="20,10 10,25 30,25" fill={grown ? '#10b981' : '#d1d5db'} />
        <polygon points="20,18 12,30 28,30" fill={grown ? '#059669' : '#9ca3af'} />
        <polygon points="20,25 14,35 26,35" fill={grown ? '#047857' : '#6b7280'} />
      </svg>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-sky-200 to-green-100 rounded-2xl p-8 h-full">
      {/* Sky and sun */}
      <div className="relative mb-6">
        <div className="absolute top-0 right-8">
          <div className="w-16 h-16 bg-yellow-300 rounded-full animate-pulse shadow-lg shadow-yellow-200"></div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Growth Forest</h3>
        <p className="text-gray-600">
          {streak} day{streak !== 1 ? 's' : ''} streak • {totalTrees - streak} trees to go!
        </p>
      </div>

      {/* Forest grid */}
      <div className="grid grid-cols-6 gap-4 place-items-center mt-8">
        {Array.from({ length: totalTrees }).map((_, index) => (
          <Tree 
            key={index} 
            grown={index < animatedTrees} 
            delay={index * 50}
          />
        ))}
      </div>

      {/* Ground */}
      <div className="mt-6 h-8 bg-gradient-to-t from-green-800 to-green-600 rounded-lg"></div>

      {/* Achievement badges */}
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

export default Forest;