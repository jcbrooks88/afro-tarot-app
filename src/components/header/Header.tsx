import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/router';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

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

  useEffect(() => {
    if (headerRef.current) {
      document.documentElement.style.setProperty(
        '--header-offset',
        `${headerRef.current.offsetHeight}px`
      );
    }
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Tarot Cards', href: '/tarot' },
    { label: 'Moon Calendar', href: '/moon' },
  ];

  return (
    <>
      <Head>
        <title>House of Brooks Tarot Explorer</title>
        <meta name="description" content="Explore tarot cards by arcana, suit, and keyword." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header
        ref={headerRef}
        className={`
          fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out backdrop-blur-md
          ${isScrolled ? 'bg-burgundy shadow-xl' : 'bg-burgundyLight'}
          ${showHeader ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between py-4 md:py-6">
            <h1
              className="text-gray-100 text-2xl md:text-3xl font-semibold tracking-wide whitespace-nowrap"
              style={{ textShadow: '0 0 6px rgba(255, 255, 255, 0.25)' }}
            >
              The Mystical House of Brooks
            </h1>

            {/* Toggle Button */}
            <button
              className="md:hidden text-gray-300 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Dropdown Toggle on Desktop */}
            <div className="hidden md:flex relative">
              <button
                className="text-gray-100 flex items-center gap-1 hover:text-gray-600 transition"
                onClick={toggleDropdown}
              >
                Menu <ChevronDown size={20} />
              </button>

              {isDropdownOpen && (
                <ul className="absolute top-full right-0 mt-2 bg-gray-50 rounded-md shadow-lg py-2 w-48 z-40">
                  {navItems.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setIsDropdownOpen(false)}
                        className={`block px-4 py-2 text-gray-600 hover:bg-gray-200 transition
                          ${router.pathname === href ? 'text-gray-650 font-semibold' : ''}
                        `}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="md:hidden">
              <ul className="flex flex-col gap-4 items-center bg-burgundy px-4 py-6 rounded-b-xl">
                {navItems.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={toggleMenu}
                      className={`text-white text-lg hover:text-indigo-300 transition
                        ${router.pathname === href ? 'text-indigo-300 font-semibold' : ''}
                      `}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
