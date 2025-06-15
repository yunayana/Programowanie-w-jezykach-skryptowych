import React from "react";
import "./book-shelf.css";

const BooksShelf = ({ books, selectedBookId, onSelectBook }) => {
  return (
    <div className="books-shelf">
      {books.map((book) => (
        <div
          key={book.id}
          className={`book-tile ${selectedBookId === book.id ? "selected" : ""}`}
          onClick={() => onSelectBook(book.id)}
          title={book.title}
        >
          {book.thumbnail ? (
            <img
              src={book.thumbnail}
              alt={`Okładka książki ${book.title}`}
              className="book-cover"
            />
          ) : (
            <div className="no-thumbnail">Brak okładki</div>
          )}
          <div className="book-title">{book.title}</div>
        </div>
      ))}
    </div>
  );
};

export default BooksShelf;
