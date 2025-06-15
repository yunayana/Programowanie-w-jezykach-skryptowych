import React, { createContext, useState, useContext, useEffect } from "react";

const initialState = {
  wantToRead: [],
  reading: [],
  read: [],
};

const BooksContext = createContext();

const saveBooksToServer = async (updatedBooks) => {
  try {
    const response = await fetch("http://localhost:3001/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ books: updatedBooks }),
    });

    if (!response.ok) {
      throw new Error("Błąd zapisu książek.");
    }

    const data = await response.json();
    console.log("✔️ Zapisano książki na serwerze:", data);
    return data.books;
  } catch (error) {
    console.error("❌ Błąd zapisu książek:", error);
    return null;
  }
};

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState(initialState);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/books");
        if (res.ok) {
          const data = await res.json();
          const loadedBooks = data || initialState;
          console.log("📚 Załadowano książki z serwera:", loadedBooks);
          setBooks(loadedBooks);
        }
      } catch (error) {
        console.error("❌ Błąd pobierania książek:", error);
      }
    };

    fetchBooks();
  }, []);

  const addBook = (book, list = "wantToRead") => {
    const bookWithPages = {
      ...book,
      totalPages:
        typeof book.totalPages === "number" && book.totalPages > 0
          ? book.totalPages
          : 0,
      pagesRead: 0,
    };

    const updated = {
      ...books,
      [list]: [...books[list], bookWithPages],
    };
    setBooks(updated);
    saveBooksToServer(updated);
  };

  const moveBook = (bookId, fromList, toList) => {
    const bookToMove = books[fromList].find((b) => b.id === bookId);
    if (!bookToMove) return;

    const updated = {
      ...books,
      [fromList]: books[fromList].filter((b) => b.id !== bookId),
      [toList]: [...books[toList], bookToMove],
    };
    setBooks(updated);
    saveBooksToServer(updated);
  };

  const updateBookProgress = (bookId, list, newData) => {
    const updatedList = books[list].map((book) =>
      book.id === bookId
        ? {
            ...book,
            ...newData,
            totalPages:
              newData.totalPages !== undefined
                ? newData.totalPages
                : book.totalPages,
          }
        : book
    );

    const updatedBooks = {
      ...books,
      [list]: updatedList,
    };

    setBooks(updatedBooks);

    saveBooksToServer(updatedBooks).then((savedBooks) => {
      if (savedBooks) {
        setBooks(savedBooks);
      }
    });
  };

  return (
    <BooksContext.Provider
      value={{ books, addBook, moveBook, updateBookProgress, setBooks }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => useContext(BooksContext);
