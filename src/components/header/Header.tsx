import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

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
    const setRootOffset = () => {
      if (headerRef.current) {
        document.documentElement.style.setProperty(
          '--header-offset',
          `${headerRef.current.offsetHeight}px`
        );
      }
    };
    setRootOffset();
    window.addEventListener('resize', setRootOffset);
    return () => window.removeEventListener('resize', setRootOffset);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out
          ${isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'}
          ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="w-full px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between py-4 md:py-6">
              <h1 className="text-white text-2xl md:text-3xl font-bold tracking-wide whitespace-nowrap">
                The Mystical House of Brooks
              </h1>

              <button
                className="px-4 py-2 md:hidden text-white"
                onClick={toggleMobileMenu}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {/* NavBar */}
            <nav aria-label="Main navigation">
              <ul
                className={`
                  flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center
                  absolute md:static w-full md:w-auto left-0 top-16 md:top-auto
                  z-40 bg-gray-900 md:bg-transparent p-6 md:p-0
                  transition-all duration-300 ease-in-out
                  ${isMobileMenuOpen ? 'block' : 'hidden md:flex'}
                `}
              >
                {navItems.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-white hover:text-indigo-300 text-lg font-medium"
                      onClick={toggleMobileMenu}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            {/* End NavBar */}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
