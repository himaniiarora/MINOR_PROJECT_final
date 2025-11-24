import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { signOut } from 'firebase/auth';

// Signup
export const signupUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Create user document in Firestore
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    streak: 0,
    weeklyData: [],
    monthlyData: []
  });

  return user;
};

// Login
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};


export const getCurrentUser = () => {
  return auth.currentUser; // Firebase user object or null
};

export const isLoggedIn = () => !!auth.currentUser;

export const logout = async () => {
  await signOut(auth);
  window.location.href = '/login';
};


