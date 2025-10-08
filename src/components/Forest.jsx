import React from "react";

function Forest({ streak }) {
  const totalTrees = 30;
  return (
    <div className="grid grid-cols-5 gap-2 p-4 bg-blue-100 dark:bg-gray-900 rounded-xl shadow-inner">
      {Array.from({ length: totalTrees }).map((_, idx) => (
        <div
          key={idx}
          className={`h-16 w-8 bg-green-500 rounded-t-lg transition-transform duration-700 ${
            idx < streak ? "scale-y-100" : "scale-y-0 opacity-50"
          }`}
          style={{ transformOrigin: "bottom" }}
        ></div>
      ))}
    </div>
  );
}

export default Forest;
