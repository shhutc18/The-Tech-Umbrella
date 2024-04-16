// App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from "./components/Header.jsx";

function App() {
  return (
    <Router>
      <Header />
    </Router>
  );
}

export default App;
