import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const avatars = [
  "🦊", "🐼", "🦁", "🐨",
  "🐸", "🦄", "🐱", "🐶",
  "🐰", "🐻"
];

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [selectedAvatar, setSelectedAvatar] = useState("🦊");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password) => password.length >= 6;

  // Handle field changes
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Main Signup Logic
  const handleSignUp = async () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Create account in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // Update Firebase Auth Profile
      await updateProfile(user, {
        displayName: formData.name,
        photoURL: selectedAvatar,
      });

      // Create Firestore user document
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        avatar: selectedAvatar,
        createdAt: new Date(),
      });

      // redirect after successful signup
      navigate("/");
    } catch (err) {
      let msg = err.message;

      if (msg.includes("email-already-in-use")) {
        msg = "This email is already registered.";
      }

      setErrors({ general: msg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Your Account
        </h2>

        {/* Avatar Selector */}
        <p className="font-medium text-gray-700 mb-2">Choose Your Avatar</p>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {avatars.map((avatar, index) => (
            <button
              key={index}
              onClick={() => setSelectedAvatar(avatar)}
              className={`p-3 rounded-xl text-2xl transition-all 
                ${selectedAvatar === avatar ? "bg-blue-200 scale-110" : "bg-gray-100"}`}
            >
              {avatar}
            </button>
          ))}
        </div>

        {/* Input Fields */}
        <div className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border rounded-md"
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-md"
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-md"
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-md"
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Error Message */}
        {errors.general && (
          <p className="text-red-600 text-center mt-3">{errors.general}</p>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSignUp}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-md mt-5 font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-medium cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
