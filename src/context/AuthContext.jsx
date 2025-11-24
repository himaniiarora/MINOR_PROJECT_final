import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          // Merge Firebase Auth + Firestore
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            name: snap.data().name || "",
            avatar: snap.data().avatar || "🦊",
          });
        } else {
          // If user doc missing → still allow login
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName || "",
            avatar: "🦊",
          });
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
