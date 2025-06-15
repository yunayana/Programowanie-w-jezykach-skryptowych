import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Załaduj dane użytkowników i aktualnego użytkownika przy starcie aplikacji
  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [usersRes, currentUserRes] = await Promise.all([
          fetch("http://localhost:3001/api/users"),
          fetch("http://localhost:3001/api/currentUser"),
        ]);

        if (!usersRes.ok || !currentUserRes.ok) {
          throw new Error("Błąd podczas ładowania danych");
        }

        const usersData = await usersRes.json();
        const currentUserData = await currentUserRes.json();

        setUsers(usersData);
        setCurrentUser(currentUserData);
      } catch (error) {
        console.error("Błąd ładowania danych:", error);
      }
    }

    fetchInitialData();
  }, []);

  async function register(username, password) {
    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || "Błąd rejestracji." };
      }

      setCurrentUser(data.user);
      setUsers((prev) => [...prev, data.user]);
      return { success: true };
    } catch (err) {
      return { error: "Błąd połączenia z serwerem." };
    }
  }

  async function login(username, password) {
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || "Błąd logowania." };
      }

      setCurrentUser(data.user);
      return { success: true };
    } catch (err) {
      return { error: "Błąd połączenia z serwerem." };
    }
  }

  async function logout() {
    try {
      await fetch("http://localhost:3001/api/logout", { method: "POST" });
      setCurrentUser(null);
    } catch (err) {
      console.error("Błąd wylogowania:", err);
    }
  }

  async function followUser(userIdToFollow) {
    try {
      await fetch("http://localhost:3001/api/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIdToFollow }),
      });

      const res = await fetch("http://localhost:3001/api/currentUser");
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data);
      }
    } catch (err) {
      console.error("Błąd podczas follow:", err);
    }
  }

  async function unfollowUser(userIdToUnfollow) {
    try {
      await fetch("http://localhost:3001/api/unfollow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIdToUnfollow }),
      });

      const res = await fetch("http://localhost:3001/api/currentUser");
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data);
      }
    } catch (err) {
      console.error("Błąd podczas unfollow:", err);
    }
  }

  const value = {
    currentUser,
    users,
    register,
    login,
    logout,
    followUser,
    unfollowUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
