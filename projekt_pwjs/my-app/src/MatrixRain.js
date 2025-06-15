import React, { useEffect, useRef } from "react";
import "./MatrixRain.css";

const names = [
  "Orwell", "Austen", "Kafka", "Homer", "Shevchenko", "Plath",
  "Poe", "Remark", "Murakami", "Eco", "Woolf", "Dick", "Bradbury",
  "Atwood", "Huxley", "Camus", "Saramago", "Coetzee", "Rushdie"
];

export default function MatrixRain() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const columns = Math.floor(window.innerWidth / 20);

    const createDrop = () => {
      const name = names[Math.floor(Math.random() * names.length)];
      const column = Math.floor(Math.random() * columns);
      const left = column * 20;

      [...name].forEach((char, index) => {
        const span = document.createElement("span");
        span.innerText = char;
        span.className = "matrix-text";
        const depth = Math.random();
        span.style.left = `${left}px`;
        span.style.top = `-${index * 22}px`; 
        span.style.opacity = depth;
        span.style.filter = `blur(${(1 - depth) * 2}px)`;
        span.style.animationDuration = `${3 + depth * 3}s`;
        span.style.animationDelay = `${index * 0.1}s`;
        container.appendChild(span);

        setTimeout(() => {
          container.removeChild(span);
        }, 6000);
      });
    };

    const interval = setInterval(createDrop, 25);
    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} className="matrix-container" />;
}
