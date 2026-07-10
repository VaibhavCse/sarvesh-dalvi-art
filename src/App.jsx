import { BrowserRouter, Routes, Route, ScrollRestoration, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';

import AnnouncementBar  from './components/AnnouncementBar';
import Navbar           from './components/Navbar';
import Footer           from './components/Footer';
import CartPanel        from './components/CartPanel';
import CheckoutModal    from './components/CheckoutModal';
import ChatWidget       from './components/ChatWidget';

import Home             from './pages/Home';
import PaintingsForSale from './pages/PaintingsForSale';
import ArtworkDetail    from './pages/ArtworkDetail';
import { PrintsPage, PrintDetail } from './pages/Prints';
import Commission       from './pages/Commission';
import OurStory         from './pages/OurStory';
import Contact          from './pages/Contact';
import Workshop         from './pages/Workshop';
import Wishlist         from './pages/Wishlist';
import Terms            from './pages/Terms';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppInner() {
  return (
    <>
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />

      <main id="main-content">
        <Routes>
          <Route path="/"                    element={<Home />} />
          <Route path="/paintings-for-sale"  element={<PaintingsForSale />} />
          <Route path="/artwork/:id"         element={<ArtworkDetail />} />
          <Route path="/prints"              element={<PrintsPage />} />
          <Route path="/prints/:id"          element={<PrintDetail />} />
          <Route path="/commission"          element={<Commission />} />
          <Route path="/our-story"           element={<OurStory />} />
          <Route path="/contact"             element={<Contact />} />
          <Route path="/workshop"            element={<Workshop />} />
          <Route path="/wishlist"            element={<Wishlist />} />
          <Route path="/terms"               element={<Terms />} />

          {/* 404 */}
          <Route path="*" element={
            <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 2rem' }}>
              <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎨</p>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '0.75rem' }}>Page Not Found</h1>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>The page you're looking for doesn't exist.</p>
              <a href="/" className="btn btn-primary">Go Home</a>
            </div>
          } />
        </Routes>
      </main>

      <Footer />
      <CartPanel />
      <CheckoutModal />
      <ChatWidget />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppInner />
      </ToastProvider>
    </BrowserRouter>
  );
}
