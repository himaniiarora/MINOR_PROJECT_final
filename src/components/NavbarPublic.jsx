import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavbarPublic = () => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 text-gray-800"
      }`}
    >
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-4 bg-white/80 dark:bg-gray-800/80 shadow-md fixed w-full top-0 z-50 backdrop-blur">
        <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400">
          LevelUp
        </h1>

        <ul className="hidden md:flex gap-8 font-medium">
          <li
            onClick={() => scrollToSection("home")}
            className="hover:text-blue-600 cursor-pointer"
          >
            Home
          </li>
          <li>
            <Link to="/flashcard" className="hover:text-purple-600">
              Flashcards
            </Link>
          </li>
          <li>
            <Link to="/quiz" className="hover:text-purple-600">
              Quizzes
            </Link>
          </li>
          <li>
            <Link to="/growzone" className="hover:text-purple-600">
              GrowZone
            </Link>
          </li>
        </ul>

        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>

          {/* Login button */}
          <Link
            to="/login"
            className="px-4 py-2 border-2 border-blue-500 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-700 transition"
          >
            Login
          </Link>

          {/* Get Started button */}
          <Link
            to="/signup"
            className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-5 py-2 rounded-lg shadow font-semibold"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavbarPublic;
