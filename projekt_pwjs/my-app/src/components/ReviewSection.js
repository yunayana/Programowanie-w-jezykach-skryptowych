import React, { useEffect, useState } from "react";
import { useBooks } from "./BookContext";
import BooksShelf from "./BookShelf";
import "./notes-review.css";

const Reviews = () => {
  const { books } = useBooks();
  const [selectedBookId, setSelectedBookId] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState({});

  const allBooks = [...books.wantToRead, ...books.reading, ...books.read];

  useEffect(() => {
    fetch("http://localhost:3001/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  const handleAddReview = async () => {
    if (!selectedBookId || !reviewText.trim() || rating < 1 || rating > 5) return;

    await fetch("http://localhost:3001/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId: selectedBookId, review: reviewText.trim(), rating }),
    });

    setReviews((prev) => ({
      ...prev,
      [selectedBookId]: { review: reviewText.trim(), rating },
    }));

    setReviewText("");
    setRating(0);
  };

  return (
    <div className="reviews-container">
      <h2>Recenzje książek</h2>

      <BooksShelf
        books={allBooks}
        selectedBookId={selectedBookId}
        onSelectBook={setSelectedBookId}
      />

      {selectedBookId && (
        <>
          <div className="reviews-list">
            <h3>Twoja recenzja:</h3>
            {reviews[selectedBookId] ? (
              <div>
                <p>Ocena: {reviews[selectedBookId].rating} / 5</p>
                <p>{reviews[selectedBookId].review}</p>
              </div>
            ) : (
              <p>Brak recenzji.</p>
            )}
          </div>

          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Napisz recenzję..."
          />
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            placeholder="Ocena (1-5)"
          />
          <button onClick={handleAddReview}>Dodaj recenzję</button>
        </>
      )}
    </div>
  );
};

export default Reviews;
