import { doc, getDoc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

// Get user data
export const getUserData = async (uid) => {
  const docSnap = await getDoc(doc(db, "users", uid));
  if (docSnap.exists()) return docSnap.data();
  return null;
};

// Update streak
export const updateStreak = async (uid) => {
  await updateDoc(doc(db, "users", uid), {
    streak: increment(1)
  });
};

// Add weekly/monthly data
export const addWeeklyData = async (uid, newData) => {
  await updateDoc(doc(db, "users", uid), {
    weeklyData: arrayUnion(newData)
  });
};

export const addMonthlyData = async (uid, newData) => {
  await updateDoc(doc(db, "users", uid), {
    monthlyData: arrayUnion(newData)
  });
};

/**
 * Track quiz activity for a user
 * @param {string} uid - User ID
 * @param {object} quizData - Quiz info like { quizId, score, correctAnswers, totalQuestions, date }
 */
export const trackQuizActivity = async (uid, quizData) => {
  if (!uid || !quizData) return;

  const userRef = doc(db, "users", uid);
  try {
    await updateDoc(userRef, {
      quizHistory: arrayUnion({
        ...quizData,
        timestamp: new Date().toISOString()
      })
    });
  } catch (err) {
    console.error("Failed to track quiz activity:", err);
  }
};
