import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import "./AuthPages.css";

function LoginPage({ onSwitchToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result.error) {
      setError(result.error);
    } else {
      setError("");
    }
  };

  return (
    <div className="auth-container">
      <h2>Logowanie</h2>
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
        <button type="submit">Zaloguj się</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        Nie masz konta?
        <button onClick={onSwitchToRegister}>Zarejestruj się</button>
      </p>
    </div>
  );
}

export default LoginPage;
