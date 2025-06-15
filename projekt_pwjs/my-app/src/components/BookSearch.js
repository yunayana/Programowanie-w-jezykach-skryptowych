import React, { useState } from "react";
import { useBooks } from "./BookContext";
import "./BookSearch.css";

const BookSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [listSelections, setListSelections] = useState({});
  const { addBook } = useBooks();

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setResults(data.items || []);

      // Domyślnie ustawiamy „chcę przeczytać” dla każdej znalezionej książki
      const initialSelections = {};
      (data.items || []).forEach((item) => {
        initialSelections[item.id] = "wantToRead";
      });
      setListSelections(initialSelections);
    } catch (error) {
      console.error("Błąd podczas wyszukiwania:", error);
    }
  };

  const handleAddBook = (book) => {
    const list = listSelections[book.id] || "wantToRead";

    const simplifiedBook = {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || [],
      thumbnail: book.volumeInfo.imageLinks?.thumbnail || "",
      totalPages: book.volumeInfo.pageCount || 0,
      pagesRead: 0,
      review: null,
      notes: [],
    };


    addBook(simplifiedBook, list);
  };

  const handleSelectionChange = (bookId, list) => {
    setListSelections((prev) => ({
      ...prev,
      [bookId]: list,
    }));
  };

  return (
    <section className="book-search">
      <h2>Wyszukaj książkę</h2>
      <div className="search-controls">
        <input
          type="text"
          placeholder="Tytuł, autor lub ISBN"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Szukaj</button>
      </div>

      {results.length > 0 && (
        <ul className="results-grid">
          {results.map((book) => {
            const info = book.volumeInfo;
            return (
              <li key={book.id} className="book-item">
                {info.imageLinks?.thumbnail ? (
                  <img src={info.imageLinks.thumbnail} alt={info.title} />
                ) : (
                  <div className="no-thumbnail" />
                )}
                <h3>{info.title}</h3>
                <p>{info.authors?.join(", ") || "Brak autora"}</p>

                <div className="book-controls">
                  <select
                    value={listSelections[book.id] || "wantToRead"}
                    onChange={(e) =>
                      handleSelectionChange(book.id, e.target.value)
                    }
                  >
                    <option value="wantToRead">Chcę przeczytać</option>
                    <option value="reading">Czytam</option>
                    <option value="read">Przeczytane</option>
                  </select>
                  <button onClick={() => handleAddBook(book)}>
                    Dodaj do biblioteki
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default BookSearch;
