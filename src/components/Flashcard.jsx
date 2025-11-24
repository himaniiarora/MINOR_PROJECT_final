import React, { useState } from "react";
import { RotateCw, MessageSquare, Sparkles, Brain, Zap } from "lucide-react";

const Flashcard = ({ card, onAddComment, comment }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState(comment || "");
  const [savedComments, setSavedComments] = useState([]);

  const difficultyColors = {
    easy: "bg-green-500",
    medium: "bg-yellow-500",
    hard: "bg-red-500",
  };

  const difficultyIcons = {
    easy: <Sparkles className="w-4 h-4" />,
    medium: <Brain className="w-4 h-4" />,
    hard: <Zap className="w-4 h-4" />,
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() === "") return;
    setSavedComments([...savedComments, commentText]); // ✅ Save comment locally
    onAddComment && onAddComment(card.id, commentText);
    setShowCommentInput(false);
    setCommentText(""); // clear textarea after saving
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div
        className={`relative w-full h-[360px] sm:h-[400px] cursor-pointer transition-transform duration-700 transform-style-3d group ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* FRONT SIDE */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-fuchsia-600 via-pink-500 to-purple-600 rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
          <div className="flex justify-between items-start">
            <div
              className={`${difficultyColors[card.difficulty]} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 shadow-lg`}
            >
              {difficultyIcons[card.difficulty]}
              {card.difficulty.toUpperCase()}
            </div>
            <RotateCw className="w-5 h-5 text-white opacity-70" />
          </div>
          <p className="text-white text-xl sm:text-2xl font-bold text-center leading-snug">
            {card.question}
          </p>
          <div className="text-center text-sm text-white opacity-70">
            Click to reveal answer
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 rounded-2xl shadow-lg p-6 flex flex-col justify-between rotate-y-180 hover:scale-[1.02] transition-transform duration-300">
          <div className="flex justify-between items-start">
            <div
              className={`${difficultyColors[card.difficulty]} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 shadow-lg`}
            >
              {difficultyIcons[card.difficulty]}
              {card.difficulty.toUpperCase()}
            </div>
            <RotateCw className="w-5 h-5 text-white opacity-70" />
          </div>
          <p className="text-white text-lg sm:text-xl font-semibold text-center leading-snug">
            {card.answer}
          </p>

          {/* Show last comment on back */}
          {savedComments.length > 0 && (
            <div className="bg-white rounded-lg p-2 mb-2 text-black text-xs italic">
              “{savedComments[savedComments.length - 1]}”
            </div>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowCommentInput(!showCommentInput);
            }}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1.5 rounded-lg flex items-center justify-center gap-2 text-sm transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            {savedComments.length > 0 ? "Edit Comment" : "Add Comment"}
          </button>
        </div>
      </div>

      {/* COMMENT BOX */}
      {showCommentInput && (
        <div
          className="bg-white rounded-lg p-3 mb-3 shadow-md"
          onClick={(e) => e.stopPropagation()}
        >
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add your thoughts or notes..."
            className="w-full p-2 border border-gray-600 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
            rows="3"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleCommentSubmit}
              className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-1.5 rounded-lg transition-all text-sm"
            >
              Save
            </button>
            <button
              onClick={() => setShowCommentInput(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg transition-all text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Show all saved comments below */}
      {savedComments.length > 0 && (
        <div className="mt-3 w-full space-y-2">
          {savedComments.map((c, i) => (
            <div
              key={i}
              className="bg-gray-100 border border-gray-300 rounded-lg p-3 text-black text-sm"
            >
              {c}
            </div>
          ))}
        </div>
      )}

      {/* CSS for 3D flip */}
      <style jsx>{`
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Flashcard;
