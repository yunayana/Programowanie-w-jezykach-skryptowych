import React, { useState } from "react";
import "./IntroOverlay.css";
import MatrixRain from "./MatrixRain";

export default function IntroOverlay({ onClose }) {
  const [isHiding, setIsHiding] = useState(false);

  const handleClick = () => {
    setIsHiding(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div
      className={`intro-overlay ${isHiding ? "hide" : ""}`}
      onClick={handleClick}
    >
      <MatrixRain />

      <div className="content-container">
        <img src="/mojelogo.png" alt="Logo" className="logo" />

<div className="soul-reader-reveal">
  {"SoulReader".split("").map((char, i) => (
    <span
      key={i}
      className="reveal-char"
      style={{ animationDelay: `${i * 0.5}s` }}
    >
      {char}
    </span>
  ))}
</div>


        <div className="shutter-edge" />
      </div>
    </div>
  );
}
