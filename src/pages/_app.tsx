import type { AppProps } from 'next/app';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <Header />
      {/* Push content down to account for fixed header */}
      <main className="flex-1 px-4 pt-20 md:pt-24 max-w-7xl mx-auto w-full"
      style={{ paddingTop: 'var(--header-offset)' }}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
