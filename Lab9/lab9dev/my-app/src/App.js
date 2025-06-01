import React, { useState, useCallback } from "react";
import Counter2 from "./Counter2";
import Counter3 from "./Counter3";
import Counter4 from "./Counter4";
import "./App.css";

function Exercise1() {
  return (
    <div style={{ marginBottom: 30 }}>
      <h2>Ćwiczenie 1: Prosta referencja do funkcji (inline)</h2>
      <button onClick={() => console.log("Kliknięto przycisk!")}>
        Kliknij mnie
      </button>
    </div>
  );
}

function Exercise2() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ marginBottom: 30 }}>
      <h2>Ćwiczenie 2: Problem z nową referencją funkcji</h2>
      <button onClick={() => setCount((c) => c + 1)}>Zwiększ: {count}</button>
      <Counter2 onLog={() => console.log("Licznik:", count)} />
    </div>
  );
}

function Exercise3() {
  const [count, setCount] = useState(0);
  const onLog = useCallback(() => {
    console.log("Licznik:", count);
  }, [count]);

  return (
    <div style={{ marginBottom: 30 }}>
      <h2>Ćwiczenie 3: useCallback dla stałej referencji funkcji</h2>
      <button onClick={() => setCount((c) => c + 1)}>Zwiększ: {count}</button>
      <Counter3 onLog={onLog} />
    </div>
  );
}

function Exercise4() {
  const [products, setProducts] = useState(["Jabłko", "Gruszka", "Banan"]);

  const removeProduct = useCallback((item) => {
    setProducts((prev) => prev.filter((p) => p !== item));
  }, []);

  return (
    <div style={{ marginBottom: 30 }}>
      <h2>Ćwiczenie 4: useCallback z tablicą produktów</h2>
      <Counter4 products={products} onRemove={removeProduct} />
    </div>
  );
}

export default function App() {
  return (
     <div className="App">
      <div className="App-header">
      <Exercise1 />
      <Exercise2 />
      <Exercise3 />
      <Exercise4 />
    </div>
    </div>
  );
}
