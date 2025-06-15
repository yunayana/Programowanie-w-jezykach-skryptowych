import React, { useState, useEffect } from "react";
import { useAuth } from "../pages/AuthContext";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import BooksShelf from "./BookShelf";
import "./Profile.css";

const BACKEND_URL = "http://localhost:3001";

const Profile = () => {
  const {
    currentUser,
    users,
    logout,
    followUser,
    unfollowUser,
  } = useAuth();

  const [showRegister, setShowRegister] = useState(false);
  const [selectedUserBooksAndReviews, setSelectedUserBooksAndReviews] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [bio, setBio] = useState("");
  const [editingBio, setEditingBio] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setBio(currentUser.bio || "");
    }
  }, [currentUser]);

  if (!currentUser) {
    return showRegister ? (
      <RegisterPage onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <LoginPage onSwitchToRegister={() => setShowRegister(true)} />
    );
  }

  const avatarUrl = (avatarFileName) =>
    avatarFileName
      ? `${BACKEND_URL}/avatars/${avatarFileName}`
      : `${BACKEND_URL}/avatars/default.png`;

  const saveBio = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/profile/bio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio }),
      });
      if (!res.ok) throw new Error("Błąd zapisu bio");
      const data = await res.json();
      if (data.success) {
        setEditingBio(false);
      }
    } catch (error) {
      alert("Nie udało się zapisać bio.");
    }
  };

  const handleViewUserBooks = async (userId) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/users/${userId}/books-and-reviews`);
      if (!res.ok) throw new Error("Błąd pobierania danych");
      const data = await res.json();
      setSelectedUserBooksAndReviews(data);
      setSelectedUserId(userId);
    } catch (error) {
      alert("Nie udało się pobrać danych użytkownika.");
      setSelectedUserBooksAndReviews(null);
      setSelectedUserId(null);
    }
  };

  const others = users.filter((u) => u.id !== currentUser.id);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          className="avatar"
          src={avatarUrl(currentUser.avatar)}
          alt="avatar"
        />
        <div className="profile-info">
          <h2>{currentUser.username}</h2>
          {editingBio ? (
            <>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
              />
              <button className="btn-save default" onClick={saveBio}>Zapisz bio</button>
              <button
                className="btn-cancel default"
                onClick={() => {
                  setEditingBio(false);
                  setBio(currentUser.bio || "");
                }}
              >
                Anuluj
              </button>
            </>
          ) : (
            <>
              <p>{bio || "Brak opisu"}</p>
              <button className="btn-edit default" onClick={() => setEditingBio(true)}>Edytuj bio</button>
            </>
          )}
          <button className="btn-logout logout" onClick={logout}>Wyloguj</button>
        </div>
      </div>

      <div className="profile-body">
        <div className="main-content">
          <h3>Wszyscy użytkownicy</h3>
          <ul>
            {others.map((user) => {
              const isFollowing = currentUser.following.includes(user.id);
              return (
                <li key={user.id}>
                  <img
                    className="avatar-small"
                    src={avatarUrl(user.avatar)}
                    alt="avatar"
                  />
                  <b>{user.username}</b>
                  {isFollowing ? (
                    <button className="unfollow" onClick={() => unfollowUser(user.id)}>Przestań obserwować</button>
                  ) : (
                    <button className="follow" onClick={() => followUser(user.id)}>Obserwuj</button>
                  )}
                  <button className="view-books" onClick={() => handleViewUserBooks(user.id)}>Zobacz książki i recenzje</button>
                </li>
              );
            })}
          </ul>

          {selectedUserBooksAndReviews && (
            <div className="user-books-reviews">
              <h3>
                Książki i recenzje użytkownika {users.find((u) => u.id === selectedUserId)?.username}
              </h3>
              {["wantToRead", "reading", "read"].map((key) => (
                <div key={key}>
                  <h4>
                    {key === "wantToRead"
                      ? "Chce przeczytać:"
                      : key === "reading"
                      ? "W trakcie czytania:"
                      : "Przeczytane:"}
                  </h4>
                  {selectedUserBooksAndReviews.books[key].length === 0 ? (
                    <p>Brak książek</p>
                  ) : (
                    <>
                      <BooksShelf books={selectedUserBooksAndReviews.books[key]} />
                      {selectedUserBooksAndReviews.books[key].map((book) =>
                        selectedUserBooksAndReviews.reviews[book.id] ? (
                          <p key={book.id}>
                            <b>{book.title}</b>: {selectedUserBooksAndReviews.reviews[book.id].review}
                          </p>
                        ) : null
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sidebar">
          <h3>Obserwowani</h3>
          {currentUser.following.length === 0 && <p>Nie obserwujesz nikogo.</p>}
          <ul>
            {currentUser.following.map((followedId) => {
              const user = users.find((u) => u.id === followedId);
              if (!user) return null;

              return (
                <li key={user.id}>
                  <img className="avatar-small" src={avatarUrl(user.avatar)} alt="avatar" />
                  <b>{user.username}</b>
                  <button className="unfollow" onClick={() => unfollowUser(user.id)}>✕</button>
                  <button className="view-books" onClick={() => handleViewUserBooks(user.id)}>📚</button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
