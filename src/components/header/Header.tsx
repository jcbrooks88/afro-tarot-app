import { useState, useEffect } from 'react';
import Head from 'next/head';
import NavBar from '../nav/Nav';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);
      setShowHeader(currentScrollY < lastScrollY || currentScrollY < 10);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Page <head> metadata */}
      <Head>
        <title>House of Brooks Tarot Explorer</title>
        <meta name="description" content="Explore tarot cards by arcana, suit, and keyword." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Visible sticky header */}
      <header
        className={`header ${isScrolled ? 'header-scrolled' : ''} ${showHeader ? 'header-visible' : 'header-hidden'}`}
      >
        <div className="header-inner">
          <div className="header-content">
            <h1 className="header-title">The Mystical House of Brooks</h1>
            <NavBar />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
