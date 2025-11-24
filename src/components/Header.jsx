import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showDropdown, setShowDropdown] = useState(false);

  // Hide header on certain pages
  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/flashcard";

  if (hideHeader) return null;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // Emoji check
  const isEmoji = (val) =>
    /^[\u{1F300}-\u{1FAFF}\u{1F100}-\u{1F1FF}]+$/u.test(val || "");

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 text-black dark:text-white shadow-md">

      {/* Logo */}
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        LearnMate
      </h1>

      {/* Navigation */}
      {user && (
        <nav className="hidden md:flex gap-6 font-semibold">
          <button onClick={() => navigate("/")} className="hover:opacity-70">
            Home
          </button>

          <button onClick={() => navigate("/flashcard")} className="hover:opacity-70">
            Flashcards
          </button>

          <button onClick={() => navigate("/quiz")} className="hover:opacity-70">
            Quizzes
          </button>

          <button onClick={() => navigate("/growzone")} className="hover:opacity-70">
            GrowZone
          </button>
        </nav>
      )}

      {/* Right: Profile / Login */}
      {user ? (
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded-full shadow hover:scale-105 transition-transform"
          >
            {isEmoji(user.avatar) ? (
              <span className="text-2xl">{user.avatar}</span>
            ) : user.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <span className="text-2xl">👤</span>
            )}

            <span className="font-semibold">
              {user.name?.split(" ")[0] || "User"}
            </span>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-lg p-2 z-50">

              <p className="px-3 py-2 font-medium border-b dark:border-gray-600">
                {user.name || "User"}
              </p>

              <button
                onClick={() => navigate("/")}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                Home
              </button>

              <button
                onClick={() => navigate("/flashcard")}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                Flashcards
              </button>

              <button
                onClick={() => navigate("/quiz")}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                Quizzes
              </button>

              <button
                onClick={() => navigate("/growzone")}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                GrowZone
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:opacity-80 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="bg-purple-600 text-white px-4 py-2 rounded-full font-semibold hover:opacity-80 transition"
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
