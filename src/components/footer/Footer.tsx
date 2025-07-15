import React from 'react';
//import './Footer.css';


const Footer: React.FC = () => {
  return (
    <footer className="bg-burgundyLight border-gray-300 shadow-md text-gray-300 py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto text-center space-y-4">
        <p className="text-sm text-white">© 2025 House of Brooks. All rights reserved.</p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 text-sm">
          <a href="/privacy" className="hover:text-teal transition">Privacy Policy</a>
          <span className="hidden md:inline">|</span>
          <a href="/terms" className="hover:text-teal transition">Terms of Service</a>
          <span className="hidden md:inline">|</span>
          <a href="/contact" className="hover:text-teal transition">Contact Us</a>
        </div>

        <div className="flex justify-center gap-4 text-sm">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal transition">
            Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal transition">
            Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal transition">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

