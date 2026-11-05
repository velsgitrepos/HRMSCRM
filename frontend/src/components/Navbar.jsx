import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom inline SVG icons since Lucide v1.0 removed brand logos
const LinkedinIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.064-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force removal of dark mode class to lock to light theme
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('talent_carpet_theme');
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'For Employers', path: '/services/employers' },
    { name: 'For Candidates', path: '/services/candidates' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav
      className={`top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'fixed bg-white/95 backdrop-blur-xl shadow-lg py-3 sm:py-4'
          : 'absolute bg-gradient-to-b from-black/75 via-black/30 to-transparent py-4 sm:py-6 lg:py-7'
      }`}
    >
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <img
            src="/logo 2.png"
            alt="Talent Carpet Logo"
            loading="lazy"
            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center space-x-8 xl:space-x-10 2xl:space-x-12">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-extrabold text-sm 2xl:text-base tracking-wide transition-colors duration-300 ${
                  isActive
                    ? 'text-[#75BB3F]'
                    : isScrolled
                    ? 'text-slate-800 hover:text-[#75BB3F]'
                    : 'text-white hover:text-[#75BB3F]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-[#75BB3F] rounded-full shadow-sm shadow-[#75BB3F]/50" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Action Buttons & Call CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href="https://wa.me/919677070837?text=Hi%20Talent%20Carpet"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#75BB3F] hover:bg-[#64a434] text-white font-extrabold px-4.5 py-2 sm:px-5 sm:py-2.5 2xl:px-6 2xl:py-2.5 rounded-full text-xs 2xl:text-sm tracking-wider shadow-md shadow-[#75BB3F]/30 hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center space-x-1.5"
          >
            <MessageCircle size={15} className="text-white fill-white" />
            <span className="text-white">WhatsApp Us</span>
          </a>
        </div>

        {/* Mobile Header Buttons */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-3 rounded-2xl transition-colors duration-300 ${
              isScrolled
                ? 'text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300'
                : 'text-white bg-white/10 hover:bg-white/20 border border-white/20'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown with Smooth Entrance & Exit Animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-drawer-modal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            data-lenis-prevent
            className="lg:hidden fixed inset-0 z-[9999] bg-[#0B132B] text-white min-h-screen h-full overflow-y-auto flex flex-col justify-between"
          >
              {/* Header Bar */}
              <div className="w-full flex items-center justify-between px-6 py-5 border-b border-slate-800 shrink-0">
                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-3">
                  <img
                    src="/logo 2.png"
                    alt="Talent Carpet Logo"
                    loading="lazy"
                    className="w-12 h-12 object-contain"
                  />
                  <span className="text-white font-extrabold text-base tracking-wider uppercase">Talent Carpet</span>
                </Link>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-white bg-white/10 hover:bg-white/20 border border-white/20"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Scrollable Content Container */}
              <div className="flex-grow px-8 py-8 flex flex-col space-y-10">
                {/* Nav Links with Staggered Entrance */}
                <div className="flex flex-col space-y-6">
                  {navLinks.map((link, idx) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 + 0.1 }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={`text-xl font-extrabold tracking-wider uppercase transition-colors duration-300 block ${
                            isActive
                              ? 'text-[#75BB3F] border-l-2 border-[#75BB3F] pl-3'
                              : 'text-slate-100 hover:text-[#75BB3F] pl-3'
                          }`}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Quick Contact Buttons (Mobile) */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 }}
                  className="flex flex-col gap-3 pt-4 border-t border-slate-800"
                >
                  <a
                    href="tel:+919677070837"
                    className="w-full flex items-center justify-center space-x-2 py-3 rounded-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-sm transition-all duration-300"
                  >
                    <Phone size={14} className="text-white fill-white" />
                    <span className="text-white">Call: +91 96770 70837</span>
                  </a>
                  <a
                    href="https://wa.me/919677070837?text=Hi%20Talent%20Carpet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-2 py-3 rounded-full text-xs font-bold bg-[#25D366] text-white shadow-sm"
                  >
                    <MessageCircle size={14} className="text-white fill-white" />
                    <span className="text-white">WhatsApp Us</span>
                  </a>
                </motion.div>

                {/* Information Section */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.45 }}
                  className="space-y-4 pt-6 border-t border-slate-800"
                >
                  <h4 className="text-xs font-extrabold tracking-widest text-slate-400 uppercase">INFORMATION</h4>
                  <div className="flex flex-col space-y-2.5 text-sm sm:text-base text-slate-300 font-medium">
                    <a href="tel:+919677070837" className="hover:text-[#75BB3F] transition-colors block">
                      +91 96770 70837
                    </a>
                    <a href="mailto:mubeen@talentcarpet.com" className="hover:text-[#75BB3F] transition-colors block">
                      mubeen@talentcarpet.com
                    </a>
                    <div className="text-slate-400">
                      17, 11th Cross St, Soumya Nagar, Medavakkam, Chennai
                    </div>
                  </div>
                </motion.div>

                {/* Follow Us Section */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.55 }}
                  className="space-y-4 pt-6 border-t border-slate-800 pb-10"
                >
                  <h4 className="text-xs font-extrabold tracking-widest text-slate-400 uppercase">FOLLOW US</h4>
                  <div className="flex items-center space-x-3.5">
                    {[
                      { icon: <FacebookIcon size={18} />, href: 'https://facebook.com', color: 'hover:text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2]/10' },
                      { icon: <LinkedinIcon size={18} />, href: 'https://www.linkedin.com/company/talentcarpet2024/home/', color: 'hover:text-[#0A66C2] hover:border-[#0A66C2] hover:bg-[#0A66C2]/10' },
                      { icon: <InstagramIcon size={18} />, href: 'https://www.instagram.com/talent_carpet_official/', color: 'hover:text-[#E1306C] hover:border-[#E1306C] hover:bg-[#E1306C]/10' },
                    ].map((social, idx) => (
                      <a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-300 hover:-translate-y-1 transition-all duration-300 ${social.color}`}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
