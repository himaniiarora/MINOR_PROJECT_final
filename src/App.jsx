import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";        
import Dashboard from "./pages/Dashboard";
import FlashcardPage from "./pages/FlashcardPage";  
import Quiz from "./components/quiz";
import GrowZonePage from "./pages/GrowZonePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";

const AppContent = () => {
  const location = useLocation();
  
  // Hide Header on login and signup pages
  const hideHeaderRoutes = ['/login', '/signup','/flashcard'];
  const showHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/flashcard" element={<FlashcardPage />} />
        <Route path="/growzone" element={<GrowZonePage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
