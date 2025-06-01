import React from "react"
function handleClick() {
 console.log("Kliknięto przycisk!")
}
export default function App() {
 return (
 <div>
 <button onClick={handleClick}>Kliknij mnie</button>
 </div>
 )
}