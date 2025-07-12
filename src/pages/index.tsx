import React from 'react';
import Image from 'next/image';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';

const HomePage: React.FC = () => {
  return (
     <>
     <Header />
     <div className="home">
      <main className="home-container">
        <div className="home-text">
          <h1 className="home-title">
            Welcome Home
          </h1>
          <Image
            src="/images/ace-of-cups.webp"
            alt="Tarot Ace of Cups card"
            width={300}
            height={450}
            className="ace-of-cups" />
          <p className="home-subheading">
            Empowering others to find the answers they are looking for.
          </p>
        </div>
      </main>
    </div>
    <Footer /> 
    </>
  );
};

export default HomePage;
