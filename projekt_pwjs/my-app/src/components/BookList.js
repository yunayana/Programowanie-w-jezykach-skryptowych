import React from "react";
import { useBooks } from "./BookContext";
import "./BookList.css"; // Zakładam, że masz plik CSS dla stylów

const BookList = () => {
  const { books, moveBook } = useBooks();

  const renderBooks = (listName, label) => (
    <div>
      <h3 className="section-title">{label}</h3>
      {books[listName].length === 0 ? (
        <p className="empty-state-text">Brak książek.</p>
      ) : (
        <ul className="book-grid">
          {books[listName].map((book) => (
            <li key={book.id} className="book-card">
              {book.thumbnail && (
                <img src={book.thumbnail} alt={book.title} className="book-thumbnail-full" />
              )}
              <h4 className="book-title">{book.title}</h4>
              <p className="text-sm">{book.authors?.join(", ")}</p>
              <div className="button-group">
                {listName !== "wantToRead" && (
                  <button
                    className="bg-yellow-400"
                    onClick={() => moveBook(book.id, listName, "wantToRead")}
                  >
                    Chcę przeczytać
                  </button>
                )}
                {listName !== "reading" && (
                  <button
                    className="bg-blue-400"
                    onClick={() => moveBook(book.id, listName, "reading")}
                  >
                    Czytam
                  </button>
                )}
                {listName !== "read" && (
                  <button
                    className="bg-green-500"
                    onClick={() => moveBook(book.id, listName, "read")}
                  >
                    Przeczytane
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
  <section className="reading-progress-container booklist-section">
    {renderBooks("wantToRead", "Chcę przeczytać")}
    {renderBooks("reading", "Czytam")}
    {renderBooks("read", "Przeczytane")}
  </section>
);

};

export default BookList;
