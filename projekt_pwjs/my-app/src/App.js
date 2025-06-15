import { useState } from "react";
import IntroOverlay from "./IntroOverlay";
import { AuthProvider, useAuth } from "./pages/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/Home";
import "./App.css";

function AppContent() {
  const { currentUser } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };

  if (overlayVisible) {
    return <IntroOverlay onClose={handleCloseOverlay} />;
  }

  if (!currentUser) {
    return showRegister ? (
      <RegisterPage onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <LoginPage onSwitchToRegister={() => setShowRegister(true)} />
    );
  }

  return <HomePage />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
