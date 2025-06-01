import { useTheme } from "./ThemeContext";

export default function ThemeSwitcher() {
  const { dark, toggleTheme } = useTheme();

  return (
    <div
      style={{
        background: dark ? "#333" : "#fff",
        color: dark ? "#fff" : "#000",
        padding: "1rem",
        minHeight: "100vh"
      }}
    >
      <h2>Ćwiczenie 4: Motyw aplikacji</h2>
      <button onClick={toggleTheme}>Przełącz motyw</button>
    </div>
  );
}