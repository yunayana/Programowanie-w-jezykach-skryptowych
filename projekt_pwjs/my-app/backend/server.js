const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, "./data.json");

app.use(cors());
app.use(express.json());

// Serwowanie avatarów
app.use("/avatars", express.static(path.join(__dirname, "../public/avas")));

const avas = ["ava1.png", "ava2.png", "ava3.png", "ava4.png"];

// Wczytywanie danych
function loadData() {
  try {
    if (!fs.existsSync(DATA_FILE)) return { users: [], currentUser: null };
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

    data.users = data.users.map((user) => ({
      ...user,
      books: user.books || { wantToRead: [], reading: [], read: [] },
      notes: user.notes || {},
      reviews: user.reviews || {},
    }));

    if (data.currentUser) {
      const foundUser = data.users.find((u) => u.id === data.currentUser.id);
      data.currentUser = foundUser || null;
    }

    return data;
  } catch (error) {
    console.error("Błąd odczytu:", error);
    return { users: [], currentUser: null };
  }
}

// Zapis danych
function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    console.log("✅ Dane zapisane do data.json");
  } catch (error) {
    console.error("❌ Błąd zapisu:", error);
  }
}

// API: Użytkownicy
app.get("/api/users", (req, res) => {
  const data = loadData();
  res.json(data.users);
});

app.get("/api/currentUser", (req, res) => {
  const data = loadData();
  res.json(data.currentUser || null);
});

app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  const data = loadData();

  if (!username || !password) {
    return res.status(400).json({ error: "Brak danych logowania." });
  }

  if (data.users.find((u) => u.username === username)) {
    return res.status(400).json({ error: "Użytkownik już istnieje." });
  }

  const newUser = {
    id: Date.now(),
    username,
    password,
    avatar: avas[Math.floor(Math.random() * avas.length)],
    bio: "",
    following: [],
    books: { wantToRead: [], reading: [], read: [] },
    notes: {},
    reviews: {},
  };

  data.users.push(newUser);
  data.currentUser = newUser;

  saveData(data);
  res.json({ success: true, user: newUser });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const data = loadData();
  const user = data.users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Niepoprawne dane logowania." });
  }

  data.currentUser = user;
  saveData(data);
  res.json({ success: true, user });
});

app.post("/api/logout", (req, res) => {
  const data = loadData();
  data.currentUser = null;
  saveData(data);
  res.json({ success: true });
});

app.post("/api/profile/bio", (req, res) => {
  const { bio } = req.body;
  const data = loadData();
  const currentUser = data.currentUser;

  if (!currentUser) return res.status(401).json({ error: "Brak zalogowania." });

  if (typeof bio !== "string") {
    return res.status(400).json({ error: "Niepoprawne dane bio." });
  }

  currentUser.bio = bio;

  data.users = data.users.map(u => u.id === currentUser.id ? currentUser : u);
  data.currentUser = currentUser;

  saveData(data);
  res.json({ success: true, bio });
});


// API: Follow/Unfollow
app.post("/api/follow", (req, res) => {
  const { userIdToFollow } = req.body;
  const data = loadData();
  const currentUser = data.currentUser;

  if (!currentUser) return res.status(401).json({ error: "Brak zalogowania." });

  if (currentUser.following.includes(userIdToFollow)) {
    return res.json({ success: false, message: "Już obserwujesz." });
  }

  currentUser.following.push(userIdToFollow);
  data.users = data.users.map((u) => (u.id === currentUser.id ? currentUser : u));
  data.currentUser = currentUser;

  saveData(data);
  res.json({ success: true });
});

app.post("/api/unfollow", (req, res) => {
  const { userIdToUnfollow } = req.body;
  const data = loadData();
  const currentUser = data.currentUser;

  if (!currentUser) return res.status(401).json({ error: "Brak zalogowania." });

  currentUser.following = currentUser.following.filter((id) => id !== userIdToUnfollow);
  data.users = data.users.map((u) => (u.id === currentUser.id ? currentUser : u));
  data.currentUser = currentUser;

  saveData(data);
  res.json({ success: true });
});

// API: Książki
app.get("/api/books", (req, res) => {
  const data = loadData();
  const currentUser = data.currentUser;

  if (!currentUser) return res.status(401).json({ error: "Brak zalogowania." });

  res.json(currentUser.books || { wantToRead: [], reading: [], read: [] });
});

app.post("/api/books", (req, res) => {
  const { books } = req.body;
  const data = loadData();
  const currentUser = data.currentUser;

  if (!currentUser) return res.status(401).json({ error: "Brak zalogowania." });

  data.users = data.users.map((u) => (u.id === currentUser.id ? { ...u, books } : u));
  data.currentUser.books = books;

  saveData(data);
  res.json({ success: true, books });
});

// API: Notatki
app.get("/api/notes", (req, res) => {
  const data = loadData();
  const currentUser = data.currentUser;

  if (!currentUser) return res.status(401).json({ error: "Brak zalogowania." });

  res.json(currentUser.notes || {});
});

app.post("/api/notes", (req, res) => {
  const { bookId, note } = req.body;
  const data = loadData();
  const currentUser = data.currentUser;

  if (!currentUser || !bookId || !note) {
    return res.status(400).json({ error: "Niepoprawne dane notatki." });
  }

  if (!currentUser.notes) {
    currentUser.notes = {};
  }

  if (!Array.isArray(currentUser.notes[bookId])) {
    currentUser.notes[bookId] = [];
  }

  currentUser.notes[bookId].push(note);

  data.users = data.users.map((u) => (u.id === currentUser.id ? currentUser : u));
  data.currentUser = currentUser;

  saveData(data);

  res.json({ success: true, notes: currentUser.notes });
});

// API: Recenzje
app.get("/api/reviews", (req, res) => {
  const data = loadData();
  const currentUser = data.currentUser;

  if (!currentUser) return res.status(401).json({ error: "Brak zalogowania." });

  res.json(currentUser.reviews || {});
});

app.post("/api/reviews", (req, res) => {
  const { bookId, review, rating } = req.body;
  const data = loadData();
  const currentUser = data.currentUser;

  if (!currentUser || !bookId || !review || typeof rating !== "number") {
    return res.status(400).json({ error: "Niepoprawne dane recenzji." });
  }

  currentUser.reviews[bookId] = { review, rating };

  data.users = data.users.map((u) => (u.id === currentUser.id ? currentUser : u));
  data.currentUser = currentUser;

  saveData(data);
  res.json({ success: true });
});

// NOWE API: Pobranie książek i recenzji innego użytkownika po userId
app.get("/api/users/:userId/books-and-reviews", (req, res) => {
  const data = loadData();
  const userId = Number(req.params.userId);
  const user = data.users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "Użytkownik nie znaleziony." });
  }

  res.json({
    books: user.books || { wantToRead: [], reading: [], read: [] },
    reviews: user.reviews || {},
  });
});

// Start serwera
app.listen(PORT, () => {
  console.log(`✅ Serwer działa na http://localhost:${PORT}`);
});
