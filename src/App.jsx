import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChatPage from "./pages/ChatPage";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Only allow access to Chat if logged in */}
        <Route 
          path="/" 
          element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;