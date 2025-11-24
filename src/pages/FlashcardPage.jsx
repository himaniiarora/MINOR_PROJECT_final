import React, { useState, useEffect } from "react";
import Flashcard from "../components/Flashcard";
import c from "../data/flashcards/c.json";
import cpp from "../data/flashcards/cpp.json";
import django from "../data/flashcards/django.json";

const subjects = {
  C: c,
  "C++": cpp,
  Django: django,
};

const FlashcardPage = () => {
  const [selectedSubject, setSelectedSubject] = useState("C");
  const [selectedLevel, setSelectedLevel] = useState("easy");
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    setFlashcards(subjects[selectedSubject][selectedLevel]);
  }, [selectedSubject, selectedLevel]);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white transition-all duration-500 overflow-x-hidden">
      {/* Header */}
      <header className="text-center py-10">
        <h1 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
          Interactive Flashcards 💡
        </h1>
        <p className="text-gray-300 text-sm sm:text-base">
          Select a subject and difficulty level to start learning interactively.
        </p>
      </header>

      {/* Subject and Difficulty Buttons */}
      <section className="flex flex-col items-center gap-6 mb-10">
        {/* Subject buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {Object.keys(subjects).map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`px-5 py-2 rounded-full font-semibold shadow-md transition-all duration-300 ${
                selectedSubject === subject
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white scale-105"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Level buttons */}
        <div className="flex justify-center gap-3">
          {["easy", "medium", "hard"].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-all duration-300 ${
                selectedLevel === level
                  ? "bg-blue-600 text-white scale-105"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </section>

      {/* Flashcards Grid */}
      <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 px-8 pb-20 w-full max-w-[1600px] mx-auto">

        {flashcards.map((card, idx) => (
          <Flashcard key={idx} card={card} />
        ))}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} LearnMate – Learn interactively ✨
      </footer>
    </div>
  );
};

export default FlashcardPage;
