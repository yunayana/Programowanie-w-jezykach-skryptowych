import "./BottomNav.css";
import { useState } from "react";
import {
  FiBook,
  FiUser,
  FiBarChart2,
  FiBookmark
} from "react-icons/fi";

import BookSearch from "../components/BookSearch";
import BookList from "../components/BookList";
import Profile from "../components/Profile";
import ReadingProgress from "../components/ReadingProgress";
import ReviewSection from "../components/ReviewSection";
import NotesBookmarks from "../components/NotesBookmarks";
import UserStats from "../components/UserStats";

import { BooksProvider } from "../components/BookContext";
import { AuthProvider } from "../pages/AuthContext";

const tabs = [
  { key: "books", icon: <FiBook />, label: "Książki" },
  { key: "profile", icon: <FiUser />, label: "Profil" },
  { key: "progressStats", icon: <FiBarChart2 />, label: "Postępy" },
  { key: "notesReviews", icon: <FiBookmark />, label: "Notatki i Recenzje" } // zmieniłem ikonę na zakładkę dla notatek
];

function HomePage() {
  const [activeTab, setActiveTab] = useState("books");

  const renderContent = () => {
    switch (activeTab) {
      case "books":
        return <BookSearch />;
      case "profile":
        return <Profile />;
      case "progressStats":
        return (
          <>
            <div className="section">
              <ReadingProgress />
            </div>
            <div className="section">
              <BookList />
            </div>
            <div className="section">
              <UserStats />
            </div>
          </>
        );
      case "notesReviews":
        return (
          <>
            <div className="section">
              <NotesBookmarks />
            </div>
            <div className="section">
              <ReviewSection />
            </div>
          </>
        );
      default:
        return null;
    }
  };

 const isProgressTab = activeTab === "progressStats";

return (
  <AuthProvider>
    <BooksProvider>
      <div
        style={{
          paddingBottom: "70px",
          minHeight: "100vh",
          backgroundColor: "#fff",
        }}
      >
        <header
          className="header-title"
          style={{
            backgroundColor: isProgressTab ? "#dcd9e8" : "transparent",
            transition: "background-color 0.3s ease",
          }}
        >
          SoulReader
        </header>

        <main
          style={{
            padding: "1rem",
            backgroundColor: isProgressTab ? "#dcd9e8" : "transparent",
            color: "#333",
            minHeight: "calc(100vh - 65px - 4rem)",
            transition: "background-color 0.3s ease",
          }}
        >
          {renderContent()}
        </main>

        <nav className="bottom-nav">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={activeTab === tab.key ? "active" : ""}
              title={tab.label}
              aria-label={tab.label}
              type="button"
            >
              {tab.icon}
            </button>
          ))}
        </nav>
      </div>
    </BooksProvider>
  </AuthProvider>
);
}


export default HomePage;
