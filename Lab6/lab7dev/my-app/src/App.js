import logo from './logo.svg';
import './App.css';
import Hello from './Hello';
import Counter from './Counter';
import InputTracker from './InputTracker';
import LoginStatus from './LoginStatus';
import TodoList from './TodoList';
import { useState } from 'react';
import LoginForm from './LoginForm';

function HelloWithProps(props) {
  return <h2>Witaj, {props.name}!</h2>;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  const todos = [
    'Obudzić się',
    'Z lekkim niezadowoleniem zjeść śniadanko',
    'Zapalić papierosa',
    'Pójść na uczelnię',
  ];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Hello />
        <HelloWithProps name="Anna" />
        <HelloWithProps name="Bartek" />
        <HelloWithProps name="Celina" />

        <Counter />
        <InputTracker />
        <LoginStatus isLoggedIn={isLoggedIn} />

        <button onClick={toggleLogin}>
          {isLoggedIn ? 'Wyloguj się' : 'Zaloguj się'}
        </button>

        <TodoList todos={todos} />
        <LoginForm />

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
