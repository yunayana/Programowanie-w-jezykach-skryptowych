import React, { useState } from 'react';
import ToggleDetails from './ToggleDetails';
import ScoreDisplay from './ScoreDisplay';
import TaskList from './TaskList';
import UserList from './UserList';
import TimerCounter from './TimerCounter';

function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Ćwiczenie 1: Warunkowe renderowanie</h1>
      <ToggleDetails />

      <hr />

      <h1>Ćwiczenie 2: Wyświetlanie komunikatu w zależności od liczby punktów</h1>
      <input
        type="number"
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}
        placeholder="Wpisz liczbę punktów"
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      <ScoreDisplay score={score} />
      <hr />

      <h1>Ćwiczenie 3: Lista z dynamicznym filtrowaniem</h1>
      <TaskList />
      <hr />

      <h1>Ćwiczenie 4: useEffect i zewnętrzne dane</h1>
      <UserList />
      <hr />

      <h1>Ćwiczenie 5: Licznik z efektami ubocznymi</h1>
      <TimerCounter />
      <hr />

    </div>
  );
}

export default App;
