import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const UserMenu = () => {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docSnap = await getDoc(doc(db, "users", currentUser.uid));
        if (docSnap.exists()) {
          setUser({ uid: currentUser.uid, ...docSnap.data() });
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
    window.location.href = "/"; // redirect to home after logout
  };

  if (!user) {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => (window.location.href = "/login")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Log In
        </button>
        <button
          onClick={() => (window.location.href = "/signup")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Get Started
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg text-2xl"
      >
        {user.avatar || "👤"}
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 flex flex-col gap-2 z-50">
          <div className="font-semibold">{user.name}</div>
          <button
            onClick={() => (window.location.href = "/growzone")}
            className="text-left px-2 py-1 hover:bg-gray-100 rounded"
          >
            See Your Progress
          </button>
          <button
            onClick={handleLogout}
            className="text-left px-2 py-1 hover:bg-gray-100 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
