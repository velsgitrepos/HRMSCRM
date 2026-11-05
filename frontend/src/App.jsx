import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Lenis from 'lenis';

import PageTransition from './components/PageTransition';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import ForEmployers from './pages/ForEmployers';
import ForCandidates from './pages/ForCandidates';
import NotFound from './pages/NotFound';

// Main App routing and layouts
const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isHomePage = location.pathname === '/';
  const needsTopPadding = !isAdminRoute && !isHomePage;

  const lenisRef = React.useRef(null);

  // Smooth scroll using Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Scroll to top smoothly via Lenis on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      <main className={`flex-grow ${needsTopPadding ? 'pt-[80px]' : ''}`}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/services" element={<Navigate to="/services/employers" replace />} />
            <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/admin" element={<PageTransition><AdminLogin /></PageTransition>} />
            <Route path="/admin/dashboard" element={<PageTransition><AdminDashboard /></PageTransition>} />
            <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
            <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />

            {/* Redirect legacy individual service routes to For Employers */}
            <Route path="/services/permanent-recruitment" element={<Navigate to="/services/employers" replace />} />
            <Route path="/services/contract-staffing" element={<Navigate to="/services/employers" replace />} />
            <Route path="/services/executive-search" element={<Navigate to="/services/employers" replace />} />
            <Route path="/services/hr-consulting" element={<Navigate to="/services/employers" replace />} />
            <Route path="/services/payroll-compliance" element={<Navigate to="/services/employers" replace />} />
            <Route path="/services/campus-hiring" element={<Navigate to="/services/employers" replace />} />
            <Route path="/services/it-recruitment" element={<Navigate to="/services/employers" replace />} />
            <Route path="/services/industrial-sourcing" element={<Navigate to="/services/employers" replace />} />

            <Route path="/services/employers" element={<PageTransition><ForEmployers /></PageTransition>} />
            <Route path="/services/candidates" element={<PageTransition><ForCandidates /></PageTransition>} />
            {/* Fallback route */}
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isAdminRoute && <Footer />}

      {/* Sticky Floating WhatsApp Contact CTA */}
      {!isAdminRoute && (
        <a
          href="https://wa.me/919677070837"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white p-3.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center justify-center"
          title="Contact Us on WhatsApp"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping group-hover:animate-none" />
          <svg viewBox="0 0 448 512" className="w-6 h-6 fill-current relative z-10">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
        </a>
      )}
    </div>
  );
};
function App() {
  return (
    <AuthProvider>
      <Router key="app-router">
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
