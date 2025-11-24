import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // 🔥 Redirect to home and refresh UI
      navigate("/", { replace: true });
      window.location.reload(); // forces header refresh

    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && email && password) {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300 flex items-center justify-center p-4 relative overflow-hidden">

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-center relative">
            <div className="inline-block mb-4">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <span className="text-5xl">🦊</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
            <p className="text-purple-100">Let's continue your learning journey</p>
          </div>

          {/* BODY */}
          <div className="p-8 space-y-6">
            
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <span className="text-xl">📧</span>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <span className="text-xl">🔒</span>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-gray-300"
                />
                <span className="text-gray-700">Remember me</span>
              </label>

              <button
                onClick={() => navigate("/forgot-password")}
                className="text-purple-500 hover:text-purple-600 font-medium"
              >
                Forgot?
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 flex items-center gap-2">
                <span className="text-xl">⚠️</span>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading || !email || !password}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Logging in...
                </>
              ) : (
                <>
                  <span>Login</span>
                  <span className="text-xl">🚀</span>
                </>
              )}
            </button>

            {/* Signup Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-purple-500 hover:text-purple-600 font-bold"
                >
                  Sign up for free! 🎉
                </button>
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
