import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import hero from "../assets/hero.png";

const Home = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const features = [
    {
      title: "Flashcards You Create",
      desc: "Build, manage, and review your own flashcards anytime.",
      icon: "📘",
    },
    {
      title: "Smart Quizzes",
      desc: "Practice with quizzes generated from your flashcards.",
      icon: "🧠",
    },
    {
      title: "Progress Tracking",
      desc: "See your study progress using local analytics.",
      icon: "📊",
    },
    {
      title: "Badges & XP",
      desc: "Stay motivated with rewards as you keep learning.",
      icon: "🏆",
    },
  ];

  const steps = [
    { label: "Create Flashcards", color: "bg-blue-600" },
    { label: "Take Quiz", color: "bg-purple-600" },
    { label: "Analyze Progress", color: "bg-blue-500" },
    { label: "Earn Badges", color: "bg-purple-500" },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 text-gray-900"
      }`}
    >
      {/* Global Header */}
      {/* <Header /> */}

      {/* Dark Mode Toggle */}
      <div className="absolute top-24 right-6">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg shadow bg-white text-black font-semibold hover:bg-gray-100 transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-24 mt-20">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Boost Your Learning with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400">
              LevelUp
            </span>
          </h2>

          <p className="text-lg opacity-90">
            Create flashcards → Take quizzes → Track your progress → Earn
            badges.  
            A complete and fun learning journey built just for you.
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.07 }}
              onClick={() => navigate("/flashcard")}
              className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
            >
              Start Learning
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.07 }}
              onClick={() => navigate("/quiz")}
              className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold bg-white hover:bg-blue-50 transition"
            >
              Try Demo
            </motion.button>
          </div>
        </div>

        {/* Right Image */}
        <motion.div
          className="md:w-1/2 mt-12 md:mt-0 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src={hero}
            alt="Learning Illustration"
            className="w-full max-w-md rounded-2xl shadow-2xl border-4 border-white"
          />
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className={`py-20 px-6 md:px-12`}>
        <h3
          className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          What You Can Do
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <motion.div
              key={f.title}
              whileHover={{ y: -8 }}
              className={`p-7 rounded-2xl shadow-lg flex flex-col items-center text-center transition ${
                darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
              }`}
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <h4 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">
                {f.title}
              </h4>
              <p className="opacity-80">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS FLOW */}
      <section className="py-16 px-6 md:px-12">
        <h3
          className={`text-3xl font-bold text-center mb-8 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          How LevelUp Works
        </h3>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.label}
              whileHover={{ scale: 1.08 }}
              className={`px-6 py-4 rounded-xl font-semibold text-lg shadow-md text-white ${step.color}`}
            >
              {step.label}
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-blue-600 to-purple-500 text-white text-center py-6 mt-auto">
        <p>© {new Date().getFullYear()} LevelUp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
