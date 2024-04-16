// App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Header />
    </Router>
  );
}

export default App;
