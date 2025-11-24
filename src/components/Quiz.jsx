import React, { useState, useEffect } from "react";
import { saveHist, loadHist } from "../utils/storage";
import { trackQuizActivity } from '../utils/growzone';

// Import subject-wise quiz JSON files
import cQuiz from "../data/quizzes/cQuizData.json";
import cppQuiz from "../data/quizzes/cppQuizData.json";
import pyQuiz from "../data/quizzes/pyQuizData.json";
import djQuiz from "../data/quizzes/djangoQuizData.json";
import jsQuiz from "../data/quizzes/jsQuizData.json";
import reactQuiz from "../data/quizzes/reactQuizData.json";

// Function to return quiz data
const getQuizData = (subjectId, difficulty) => {
  switch (subjectId) {
    case "c":
      return cQuiz[difficulty];
    case "cpp":
      return cppQuiz[difficulty];
    case "py":
      return pyQuiz[difficulty];
    case "dj":
      return djQuiz[difficulty];
    case "js":
      return jsQuiz[difficulty];
    case "react":
      return reactQuiz[difficulty];
    default:
      return [];
  }
};

const Quiz = () => {
  const [view, setView] = useState("select");
  const [quiz, setQuiz] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [selAns, setSelAns] = useState(null);
  const [score, setScore] = useState(0);
  const [showRes, setShowRes] = useState(false);
  const [time, setTime] = useState(30);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const hist = loadHist() || [];
    setHistory(hist);
  }, []);

  useEffect(() => {
    if (view !== "quiz") return;
    if (time <= 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time, view]);

  const startQ = (subjId, diffId) => {
    const selectedQuiz = getQuizData(subjId, diffId);
    if (!selectedQuiz || selectedQuiz.length === 0) {
      alert("No quiz found!");
      return;
    }
    setQuiz({ s: subjId, d: diffId, qs: selectedQuiz, t: Date.now() });
    setQIndex(0);
    setSelAns(null);
    setScore(0);
    setTime(30);
    setShowRes(false);
    setView("quiz");
  };

  const handleSelect = (optIdx) => {
    if (selAns !== null) return;
    setSelAns(optIdx);
    if (quiz.qs[qIndex].ans === optIdx) setScore(score + 1);
  };

  const handleNext = () => {
    if (qIndex + 1 < quiz.qs.length) {
      setQIndex(qIndex + 1);
      setSelAns(null);
      setTime(30);
    } else {
      const res = {
        subject: quiz.s,
        difficulty: quiz.d,
        score: score,
        total: quiz.qs.length,
        time: Math.floor((Date.now() - quiz.t) / 1000),
        date: new Date().toLocaleString(),
      };
      saveHist(res);
      setHistory([...history, res]);
      setShowRes(true);
      setView("result");
    }
  };

  const resetQuiz = () => {
    setView("select");
    setQuiz(null);
    setQIndex(0);
    setSelAns(null);
    setScore(0);
    setShowRes(false);
  };

  const subjects = [
    { id: "c", name: "C Language" },
    { id: "cpp", name: "C++" },
    { id: "py", name: "Python" },
    { id: "dj", name: "Django" },
    { id: "js", name: "JavaScript" },
    { id: "react", name: "React" },
  ];

  const levels = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  // SELECT VIEW
  if (view === "select") {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-black to-purple-900 text-white flex flex-col items-center p-6">

        <h1 className="text-5xl font-extrabold mb-12 text-purple-300">
          Select Your Quiz
        </h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {subjects.map((subj) =>
            levels.map((lvl) => (
              <button
                key={subj.id + lvl.id}
                onClick={() => startQ(subj.id, lvl.id)}
                className="bg-white/10 border border-white/20 p-8 rounded-2xl shadow-xl hover:bg-white/20 transition-all hover:scale-105"
              >
                <h2 className="text-2xl font-bold text-purple-300">{subj.name}</h2>
                <p className="text-pink-400 mt-1">{lvl.name}</p>
              </button>
            ))
          )}
        </div>

        <div className="mt-16 w-full max-w-3xl bg-white/10 p-6 rounded-xl shadow-xl">
          <h2 className="text-3xl font-bold text-purple-300 mb-4">
            Previous Results
          </h2>

          {history.length === 0 ? (
            <p>No quiz attempts yet.</p>
          ) : (
            <ul className="space-y-4">
              {history.map((h, i) => (
                <li key={i} className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <div className="flex justify-between">
                    <span className="font-semibold">
                      {h.subject.toUpperCase()} ({h.difficulty})
                    </span>
                    <span className="text-pink-400 font-bold">
                      {h.score}/{h.total}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{h.date}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    );
  }

  // QUIZ VIEW
  if (view === "quiz") {
    const q = quiz.qs[qIndex];

    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white flex items-center justify-center p-6">

        <div className="w-full max-w-3xl bg-white/10 border border-white/20 p-10 rounded-2xl shadow-2xl">

          <h2 className="text-2xl font-bold text-purple-300 mb-6">
            Question {qIndex + 1}/{quiz.qs.length}
          </h2>

          <p className="text-xl mb-8">{q.q}</p>

          <div className="space-y-4">
            {q.opt.map((o, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`block w-full p-4 rounded-xl border transition-all font-medium
                ${selAns === null
                    ? "hover:bg-white/10 border-white/20"
                    : i === q.ans
                      ? "bg-green-600 border-green-400"
                      : selAns === i
                        ? "bg-red-600 border-red-400"
                        : "bg-white/10 border-white/20"
                  }`}
              >
                {o}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mt-8">
            <p className="text-pink-400 font-semibold text-lg">
              Time Left: {time}s
            </p>

            <button
              onClick={handleNext}
              className="bg-purple-500 hover:bg-purple-400 text-black font-bold px-8 py-3 rounded-xl shadow-lg"
            >
              {qIndex + 1 === quiz.qs.length ? "Finish" : "Next"}
            </button>
          </div>

        </div>

      </div>
    );
  }

  // RESULT VIEW
  if (view === "result") {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-black to-indigo-900 text-white flex items-center justify-center p-6">

        <div className="bg-white/10 p-10 rounded-2xl shadow-xl text-center max-w-lg border border-white/20">

          <h2 className="text-4xl font-bold text-purple-300 mb-6">
            Quiz Completed!
          </h2>

          <p className="text-xl mb-4">
            Score:{" "}
            <span className="text-pink-400 font-bold">
              {score}/{quiz.qs.length}
            </span>
          </p>

          <p className="text-gray-300 mb-10">
            Time Taken: {Math.floor((Date.now() - quiz.t) / 1000)} seconds
          </p>

          <button
            onClick={resetQuiz}
            className="bg-pink-500 hover:bg-pink-400 text-black font-bold px-8 py-3 rounded-xl shadow-lg"
          >
            Back to Selection
          </button>

        </div>

      </div>
    );
  }

  // When quiz is completed:
  const handleQuizComplete = (score, timeSpent) => {
    const quizResult = {
      score: score,
      date: new Date().toISOString(),
      timestamp: new Date().toISOString(),
      timeSpent: timeSpent || 5, // minutes
      totalQuestions: questions.length,
      correctAnswers: score
    };

    // Save to quiz history (your existing function)
    saveHist(quizResult);

    // Track activity for streak calculation
    trackQuizActivity(quizResult);
  };

  return null;
};

export default Quiz;
