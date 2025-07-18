import Link from 'next/link';

interface NavBarProps {
  isMobileOpen?: boolean;
  toggleMobileMenu?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isMobileOpen, toggleMobileMenu }) => {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Tarot Cards', href: '/tarot' },
    { label: 'Moon Calendar', href: '/moon' },
    { label: 'The Orishas', href: '/orisha' },
  ];

  return (
    <nav aria-label="Main navigation">
      <ul
        className={`
          flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center
          absolute md:static w-full md:w-auto left-0 top-16 md:top-auto
          z-40 bg-gray-900 md:bg-transparent p-6 md:p-0
          transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'block' : 'hidden md:flex'}
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
  );
};

export default NavBar;
