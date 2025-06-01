import React from "react";

export default function Counter3({ onLog }) {
  console.log("Counter3 zrenderowany");
  return (
    <button onClick={onLog}>
      Pokaż licznik 
    </button>
  );
}
