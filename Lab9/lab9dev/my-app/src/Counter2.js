import React from "react";

export default function Counter2({ onLog }) {
  console.log("Counter2 zrenderowany");
  return (
    <button onClick={onLog}>
      Pokaż licznik 
    </button>
  );
}
