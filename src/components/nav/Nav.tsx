import React from 'react';
import Link from 'next/link';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link href="/" className="navbar-link">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link href="/tarot" className="navbar-link">
            Tarot Cards
          </Link>
        </li>
        <li className="navbar-item">
          <Link href="/moon" className="navbar-link">
            Moon Calendar
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
