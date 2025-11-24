export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

const STORAGE_KEY = "quiz_history";

// ✅ Save user’s quiz result history
export const saveHist = (result) => {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    existing.push(result);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (error) {
    console.error("Error saving quiz history:", error);
  }
};

// ✅ Load all past quiz history
export const loadHist = () => {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return data || [];
  } catch (error) {
    console.error("Error loading quiz history:", error);
    return [];
  }
};

// ✅ Clear all quiz history (optional utility)
export const clearHist = () => {
  localStorage.removeItem(STORAGE_KEY);
};