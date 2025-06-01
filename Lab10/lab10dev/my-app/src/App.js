
import React from "react";
import ClickCounter from "./ClickCounter";
import PrimeCalculator from "./PrimeCalculator";
import FormReducer from "./FormReducer";
import ThemeSwitcher from "./ThemeSwitcher";
import { ThemeProvider } from "./ThemeContext";
import LayoutEffectExample from "./LayoutEffectExample";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <h1>Lab10</h1>
        <h2>Ćwiczenie 1: useRef do przechowania wartości bez re-renderu</h2>
        <ClickCounter />
        <hr />
        <h2>Ćwiczenie 2: useMemo do optymalizacji obliczeń</h2>
        <PrimeCalculator />
        <hr />
        <h2>Ćwiczenie 3: useReducer – zarządzanie stanem formularza</h2>
        <FormReducer />
        <hr />
        <h2>Ćwiczenie 4: useContext – theme aplikacji</h2>
        <ThemeSwitcher />
        <hr />
        <h2>Ćwiczenie 5: useLayoutEffect – pomiar wysokości komponentu</h2>
        <LayoutEffectExample />
      </div>
    </ThemeProvider>
  );
}

export default App;
