// fetchData.js - funkcje do komunikacji z backendem

export async function fetchData() {
  const response = await fetch("http://localhost:3001/api/data");
  if (!response.ok) throw new Error("Błąd pobierania danych");
  return await response.json();
}

export async function saveData(data) {
  const response = await fetch("http://localhost:3001/api/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Błąd zapisu danych");
  return await response.json();
}

