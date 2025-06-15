import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import "./AuthPages.css";

function RegisterPage({ onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(username, password);
    if (result.error) {
      setError(result.error);
    } else {
      setError("");
      // Możesz tu np. automatycznie przełączyć na ekran logowania:
      // onSwitchToLogin();
    }
  };

  return (
    <div className="auth-container">
      <h2>Rejestracja</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nazwa użytkownika"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Zarejestruj się</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        Masz konto?{" "}
        <button type="button" onClick={onSwitchToLogin}>
          Zaloguj się
        </button>
      </p>
    </div>
  );
}

export default RegisterPage;
