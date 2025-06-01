import React from "react";

export default function Counter4({ products, onRemove }) {
  console.log("Counter4 render");

  return (
    <ul>
      {products.map((product) => (
        <li key={product}>
          {product}{" "}
          <button onClick={() => onRemove(product)}>
            Usuń
          </button>
        </li>
      ))}
    </ul>
  );
}
