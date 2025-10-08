import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import hero from "../assets/hero.png";

const features = [
    {
        title: "Create & Manage Flashcards",
        desc: "Easily build, organize, and review your own flashcards for any subject.",
        icon: "📘",
    },
    {
        title: "Take Quizzes & Get Instant Feedback",
        desc: "Challenge yourself with quizzes and receive instant, actionable feedback.",
        icon: "🧠",
    },
    {
        title: "Track Progress via Dashboard",
        desc: "Visualize your learning journey with charts and analytics.",
        icon: "📊",
    },
    {
        title: "Earn Badges & XP",
        desc: "Stay motivated by collecting badges and XP as you learn.",
        icon: "🏆",
    },
];

const howItWorksSteps = [
    { label: "Create Flashcards", color: "bg-blue-500" },
    { label: "Take Quiz", color: "bg-purple-500" },
    { label: "View Progress", color: "bg-blue-400" },
    { label: "Earn Badges", color: "bg-purple-400" },
];


const Home = () => {
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const darkStepColors = ["bg-blue-700", "bg-purple-700", "bg-blue-600", "bg-purple-600"];

    return (
        <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 text-white-800"}`}>
            {/* Navbar */}
            <nav className="flex justify-between items-center px-6 md:px-12 py-4 bg-white/80 dark:bg-gray-800/80 shadow-md fixed w-full top-0 z-50 backdrop-blur">
                <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400">
                    LevelUp
                </h1>
                <ul className="hidden md:flex gap-8 font-medium">
                    <li onClick={() => scrollToSection("home")} className="hover:text-blue-600 cursor-pointer">Home</li>
                    <li onClick={() => scrollToSection("features")} className="hover:text-purple-500 cursor-pointer">Features</li>
                    <li onClick={() => scrollToSection("howItWorks")} className="hover:text-blue-500 cursor-pointer">How It Works</li>
                    <li>
                        <Link to="/dashboard" className="hover:text-purple-600">Dashboard</Link>
                    </li>
                </ul>
                <div className="flex items-center gap-4">
                    <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        {darkMode ? "🌞" : "🌙"}
                    </button>
                    <motion.button whileHover={{ scale: 1.07 }} className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-5 py-2 rounded-lg shadow font-semibold">
                        Get Started
                    </motion.button>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-24 mt-20">
                <div className="md:w-1/2 space-y-6">
                    <h2 className={`${darkMode ? "text-white" : "text-gray-800"} text-4xl md:text-5xl font-extrabold leading-tight`}>
                        Unlock Your Potential with
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400">LevelUp</span>
                    </h2>
                    <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-lg opacity-90`}>
                        Create flashcards, take quizzes, track your progress, and earn badges. Make learning fun, engaging, and effective!
                    </p>
                    <div className="flex gap-4">
                        <motion.button whileHover={{ scale: 1.07 }} className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
                            Start Learning
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.07 }} className="border-2 border-blue-500 text-blue-600 px-6 py-3 rounded-xl font-semibold bg-white hover:bg-blue-50 transition">
                            Try Demo
                        </motion.button>
                    </div>
                </div>
                <motion.div className="md:w-1/2 mt-12 md:mt-0 flex justify-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                    <img src={hero} alt="Learning Illustration" className="w-full max-w-md rounded-2xl shadow-2xl border-4 border-white" />
                </motion.div>
            </section>

            {/* Our Impact Section */}
            <section className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} py-12 text-center`}>
                <h3 className="text-3xl font-bold mb-6">Our Impact</h3>
                <div className="flex flex-wrap justify-center gap-8 text-2xl font-semibold">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>🎓 5000+ Learners</motion.div>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}>🧠 10K+ Flashcards</motion.div>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}>📊 100+ Quizzes Daily</motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className={`py-20 px-6 md:px-12 ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-100 via-purple-100 to-blue-50"}`}>
                <h3 className={`${darkMode ? "text-white" : "text-gray-800"} text-3xl md:text-4xl font-bold text-center mb-12`}>Platform Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f) => (
                        <motion.div key={f.title} whileHover={{ y: -8 }} className={`p-7 rounded-2xl shadow hover:shadow-xl transition flex flex-col items-center text-center ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"}`}>
                            <div className="text-4xl mb-3">{f.icon}</div>
                            <h4 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">{f.title}</h4>
                            <p className="opacity-80">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* How It Works Section */}
            <section id="howItWorks" className="py-16 px-6 md:px-12">
                <h3 className={`${darkMode ? "text-white" : "text-gray-800"} text-3xl font-bold text-center mb-8`}>How It Works</h3>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
                    {howItWorksSteps.map((step, idx) => (
                        <motion.div key={step.label} whileHover={{ scale: 1.08 }} className={`flex items-center justify-center px-6 py-4 rounded-xl shadow-md font-semibold text-lg transition ${darkMode ? darkStepColors[idx] : step.color} text-white`}>
                            {step.label}
                            {idx < howItWorksSteps.length - 1 && <span className="mx-4 text-2xl text-gray-400 hidden md:inline">→</span>}
                        </motion.div>
                    ))}
                </div>
                <p className={`${darkMode ? "text-gray-300" : "text-gray-500"} text-center mt-6 text-base md:text-lg`}>
                    Create Flashcards &rarr; Take Quiz &rarr; View Progress &rarr; Earn Badges
                </p>
            </section>

            {/* Dashboard Section */}
            <section id="dashboard" className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} py-16 px-6 md:px-12 text-center`}>
                <h3 className="text-3xl font-bold mb-6">Dashboard (Coming Soon)</h3>
                <p className="text-lg opacity-80">Your personalized dashboard will show your learning progress, XP points, badges, and quiz statistics.</p>
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-blue-600 to-purple-500 text-white text-center py-6 mt-auto">
                <p>© {new Date().getFullYear()} LevelUp. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;

