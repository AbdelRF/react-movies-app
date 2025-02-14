import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Navbar.css"

const NavaBar = () => {
  return (
    <nav className='navbar'>
        <div className='navbar-brand'>
            <Link to="/">Movie App</Link>
        </div>
        <div className='navbar-links'>
            <Link to="/" className='navbar-link'>Home</Link>
            <Link to="/favorites" className='navbar-link'>Favorites</Link>
        </div>
    </nav>
  )
}

export default NavaBar