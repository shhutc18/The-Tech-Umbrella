// App.jsx
import React from 'react';
import './App.css';
import Navbar from "./components/Navbar.jsx";
import Header from "./components/Header.jsx";
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Header />
      <Outlet />
    </>
  );
}

export default App;
