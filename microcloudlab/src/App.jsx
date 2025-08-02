import React from 'react';
import Routes from './Routes';
import { BoardProvider } from './contexts/BoardContext';

function App() {
  return (
    <BoardProvider>
      <div className="App">
        <Routes />
      </div>
    </BoardProvider>
  );
}

export default App;
