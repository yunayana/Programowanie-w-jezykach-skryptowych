import React, { useState } from "react";
import { useBooks } from "./BookContext";
import "./ReadingProgress.css"; // Zakładam, że masz plik CSS dla stylów



const ReadingProgress = () => {
  const { books, updateBookProgress } = useBooks();
  const [editing, setEditing] = useState({});

  const handlePageChange = (bookId, field, value) => {
    const numericValue = value === "" ? "" : Math.max(0, Number(value));
    setEditing((prev) => ({
      ...prev,
      [bookId]: {
        ...prev[bookId],
        [field]: numericValue,
      },
    }));
  };

  const saveProgress = (bookId) => {
    const edited = editing[bookId];
    if (!edited) return;

    if (
      edited.pagesRead != null &&
      edited.totalPages != null &&
      edited.pagesRead > edited.totalPages
    ) {
      alert(
        "Liczba przeczytanych stron nie może przekraczać całkowitej liczby stron."
      );
      return;
    }

    const book = books.reading.find((b) => b.id === bookId);
    if (!book) return;

    const newData = {
      ...book,
      ...edited,
      pagesRead: edited.pagesRead === "" ? 0 : edited.pagesRead,
      totalPages: edited.totalPages === "" ? book.totalPages : edited.totalPages,
    };

    updateBookProgress(bookId, "reading", newData);

    setEditing((prev) => {
      const copy = { ...prev };
      delete copy[bookId];
      return copy;
    });
  };

  const longestReadBook = books.read.reduce((maxBook, book) => {
    if (!maxBook) return book;
    return (book.pagesRead || 0) > (maxBook.pagesRead || 0) ? book : maxBook;
  }, null);

  return (
    <div className="reading-progress-container space-y-6">
      <h2 className="section-title">Postępy czytania</h2>

      {/* Podsumowanie */}
      {longestReadBook && (
        <section className="summary-box">
          <h3 className="summary-title">Najdłuższa przeczytana książka</h3>
          <p>
            <strong>{longestReadBook.title}</strong> — {longestReadBook.pagesRead} przeczytanych stron
          </p>
        </section>
      )}

      {/* Wykres postępów */}
      {books.reading.length > 0 && (
        <section className="progress-chart-section">
          <h3 className="section-subtitle">Postępy czytania - wykres</h3>
          <div className="progress-chart-list">
            {books.reading.map((book) => {
              const pagesRead = book.pagesRead || 0;
              const totalPages = book.totalPages || 1;
              const progress = Math.min(100, Math.round((pagesRead / totalPages) * 100));
              return (
                <div key={book.id} className="progress-bar-item">
                  <div className="progress-bar-label" title={book.title}>
                    {book.title}
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${progress}%` }}
                      title={`${progress}%`}
                    />
                  </div>
                  <div className="progress-bar-percent">{progress}%</div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Lista książek z edycją */}
      {books.reading.length === 0 ? (
        <p className="empty-state-text">Nie czytasz teraz żadnej książki.</p>
      ) : (
        books.reading.map((book) => {
          const { id, title, authors, thumbnail, pagesRead = 0, totalPages = 0 } = book;
          const edited = editing[id] || {};
          const currentRead =
            edited.pagesRead !== undefined && edited.pagesRead !== ""
              ? edited.pagesRead
              : pagesRead;
          const currentTotal =
            edited.totalPages !== undefined && edited.totalPages !== ""
              ? edited.totalPages
              : totalPages;
          const progress =
            currentTotal > 0
              ? Math.min(100, Math.round((currentRead / currentTotal) * 100))
              : 0;

          return (
            <article key={id} className="book-card">
              <div className="book-card-content">
                {thumbnail && (
                  <img src={thumbnail} alt={title} className="book-thumbnail" />
                )}
                <div className="book-info">
                  <h3 className="book-title">{title}</h3>
                  <p className="book-authors">{authors?.join(", ")}</p>

                  <div className="book-progress-edit">
                    <div className="input-group">
                      <label htmlFor={`pagesRead-${id}`}>Przeczytane strony:</label>
                      <input
                        id={`pagesRead-${id}`}
                        type="number"
                        min={0}
                        value={currentRead}
                        onChange={(e) => handlePageChange(id, "pagesRead", e.target.value)}
                        className="input-number"
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor={`totalPages-${id}`}>Liczba stron:</label>
                      <input
                        id={`totalPages-${id}`}
                        type="number"
                        min={1}
                        value={currentTotal}
                        onChange={(e) => handlePageChange(id, "totalPages", e.target.value)}
                        className="input-number"
                      />
                    </div>

                    <button
                      className="save-button"
                      onClick={() => saveProgress(id)}
                      aria-label={`Zapisz postęp dla książki ${title}`}
                    >
                      Zapisz postęp
                    </button>
                  </div>

                  <div className="progress-bar-small">
                    <div
                      className="progress-bar-fill-small"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="progress-percent-text">{progress}% przeczytane</p>
                </div>
              </div>
            </article>
          );
        })
      )}
    </div>
  );
};

export default ReadingProgress;
