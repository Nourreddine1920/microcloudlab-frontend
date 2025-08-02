import React from "react";
import Routes from "./Routes";
import { BoardProvider } from './contexts/BoardContext';

function App() {
  return (
    <BoardProvider>
      <Routes />
    </BoardProvider>
  );
}

export default App;
