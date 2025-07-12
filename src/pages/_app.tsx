import type { AppProps } from 'next/app';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="app-container">
      <Header />
      <div className="pt-32 px-4" style={{ flex: '1 0 auto' }}>
        <main className="main-content">
          <Component {...pageProps} />
        </main>
      </div>
      <Footer />
    </div>
  );
}
