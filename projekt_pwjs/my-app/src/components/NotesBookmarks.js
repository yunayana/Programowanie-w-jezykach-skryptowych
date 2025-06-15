import React, { useEffect, useState } from "react";
import { useBooks } from "./BookContext";
import BooksShelf from "./BookShelf"; // import nowego komponentu
import "./notes-review.css";

const NotesBookmarks = () => {
  const { books } = useBooks();
  const [selectedBookId, setSelectedBookId] = useState("");
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState({});

  const allBooks = [...books.wantToRead, ...books.reading, ...books.read];
  const selectedBook = allBooks.find((b) => b.id === selectedBookId);

  useEffect(() => {
    fetch("http://localhost:3001/api/notes")
      .then((res) => {
        if (!res.ok) throw new Error("Brak dostępu do notatek lub brak zalogowania");
        return res.json();
      })
      .then((data) => setNotes(data))
      .catch(() => setNotes({}));
  }, []);

  const handleAddNote = async () => {
    if (!selectedBookId) {
      alert("Wybierz książkę.");
      return;
    }
    if (!newNote.trim()) {
      alert("Notatka nie może być pusta.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: selectedBookId, note: newNote.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setNotes(data.notes);
        setNewNote("");
      } else {
        alert("Nie udało się dodać notatki.");
      }
    } catch (error) {
      console.error("Błąd podczas dodawania notatki:", error);
    }
  };

  const currentNotes = Array.isArray(notes[selectedBookId]) ? notes[selectedBookId] : [];

  return (
    <div className="notes-container">
      <h2>Notatki do książek</h2>

      <BooksShelf
        books={allBooks}
        selectedBookId={selectedBookId}
        onSelectBook={setSelectedBookId}
      />

      {selectedBookId && (
        <>
          <div className="notes-list">
            <h3>Notatki:</h3>
            {currentNotes.length === 0 ? (
              <p>Brak notatek dla tej książki.</p>
            ) : (
              <ul>
                {currentNotes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            )}
          </div>

          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Dodaj nową notatkę..."
          />
          <button onClick={handleAddNote}>Dodaj notatkę</button>
        </>
      )}
    </div>
  );
};

export default NotesBookmarks;
