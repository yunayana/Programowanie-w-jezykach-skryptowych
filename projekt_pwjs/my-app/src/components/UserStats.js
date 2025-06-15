import React from "react";
import { useBooks } from "./BookContext";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import "./UserStats.css";

const COLORS = ["#8e79e0", "#5b5e91", "#3c3f63"]; // przeczytane, do przeczytania, czytam

function UserStats() {
  const { books } = useBooks();

  const wantToRead = books?.wantToRead || [];
  const reading = books?.reading || [];
  const read = books?.read || [];

  const wantToReadCount = wantToRead.length;
  const readingCount = reading.length;
  const readCount = read.length;

  console.log("wantToReadCount:", wantToReadCount);
  console.log("wantToRead array:", wantToRead);

  console.log("readingCount:", readingCount);
  console.log("readCount:", readCount);

  const readAndReading = [...reading, ...read];

  const totalPagesRead = readAndReading.reduce(
    (sum, book) => sum + (book.pagesRead || 0),
    0
  );

  const avgPagesPerBook = readCount > 0 ? Math.round(totalPagesRead / readCount) : 0;

  const authorCount = {};
  readAndReading.forEach((book) => {
    (book.authors || []).forEach((author) => {
      authorCount[author] = (authorCount[author] || 0) + 1;
    });
  });

  let favoriteAuthor = null;
  let maxCount = 0;
  for (const [author, count] of Object.entries(authorCount)) {
    if (count > maxCount) {
      maxCount = count;
      favoriteAuthor = author;
    }
  }

  // Filtrujemy dane tylko z wartościami > 0, żeby nie było problemów z wykresem
      const data = [
        { name: "Przeczytane", value: readCount, color: COLORS[0] },
        { name: "Chcę przeczytać", value: wantToReadCount, color: COLORS[1] },
        { name: "Czytam", value: readingCount, color: COLORS[2] },
      ].filter(entry => entry.value > 0);

  console.log("Data for PieChart:", data);

  return (
    <div className="user-stats-container">
      <h2>Statystyki czytelnictwa</h2>

        <p>
          Chcę przeczytać: <strong>{wantToReadCount}</strong>{" "}
          {wantToReadCount === 1 ? "książkę" : "książek"}
        </p>
        <p>
          Czytam: <strong>{readingCount}</strong>{" "}
          {readingCount === 1 ? "książkę" : "książek"}
        </p>
        <p>
          Przeczytane: <strong>{readCount}</strong>{" "}
          {readCount === 1 ? "książka" : "książek"}
        </p>

      <p className="mt-2">
        Przeczytałeś już <strong>{totalPagesRead.toLocaleString()}</strong> stron!
        {readCount > 0 && (
          <>
            <br />
            Średnio <strong>{avgPagesPerBook}</strong> stron na przeczytaną książkę.
          </>
        )}
      </p>

      {favoriteAuthor && (
        <p className="mt-2">
          Najczęściej czytasz książki: <strong>{favoriteAuthor}</strong>
        </p>
      )}

      {data.length > 0 ? (
        <div className="user-stats-chart">
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={false}
              labelLine={false}
              fontSize={14}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </div>
      ) : (
        <p>Brak danych do wyświetlenia na wykresie.</p>
      )}
    </div>
  );
}

export default UserStats;
