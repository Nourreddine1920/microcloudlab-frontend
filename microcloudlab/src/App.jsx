import React from 'react';
import Routes from './Routes';
import { BoardProvider } from './contexts/BoardContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BoardProvider>
        <div className="App">
          <Routes />
        </div>
      </BoardProvider>
    </AuthProvider>
  );
}

export default App;
