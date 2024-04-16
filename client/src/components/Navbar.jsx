import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  const navbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  top: '10px',
  width: 'fit-content',
  margin: '0 auto',
  left: 0,
  right: 0,
  marginBottom: 0,
  zIndex: 1000, // Add this line
};

  const linkStyle = {
    textDecoration: 'none',
    color: 'black',
    padding: '0 30px',
    fontSize: '20px',
    fontFamily: "'Work Sans', sans-serif",
  };

  return (
    <div style={navbarStyle}>
      <Link style={linkStyle} to="/Home">Home</Link> {/* Change to Link */}
      <Link style={linkStyle} to="/Login">Sign In</Link> {/* Change to Link */}
      <Link style={linkStyle} to="/Register">Register</Link> {/* Change to Link */}
      <Link style={linkStyle} to="/MyProfile">My Profile</Link> {/* Change to Link */}
    </div>
  );
};

export default Navbar;
