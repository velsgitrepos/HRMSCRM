import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, PhoneCall, Briefcase, Users } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-6 relative overflow-hidden bg-slate-50 dark:bg-primary-dark/20 transition-colors duration-300">
      {/* Background visual glowing accents */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-[#1E378B]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#75BB3F]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Animated 404 Header Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative inline-block mb-6"
        >
          <span className="text-8xl sm:text-9xl font-black font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#1E378B] via-[#3B82F6] to-[#75BB3F] tracking-tighter select-none">
            404
          </span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#75BB3F] text-white font-extrabold text-[11px] uppercase tracking-widest px-4 py-1 rounded-full shadow-md whitespace-nowrap">
            PAGE NOT FOUND
          </div>
        </motion.div>

        {/* Text Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="space-y-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-light tracking-tight">
            Oops! You've Discovered a Lost Path
          </h1>
          <p className="text-slate-600 dark:text-light/80 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </motion.div>

        {/* Quick Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="pt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="bg-[#1E378B] hover:bg-[#112361] text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 shadow-md hover:shadow-xl inline-flex items-center space-x-2 group"
          >
            <Home size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/careers"
            className="bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-light px-8 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 shadow-xs inline-flex items-center space-x-2"
          >
            <Briefcase size={18} className="text-[#75BB3F]" />
            <span>Explore Careers</span>
          </Link>
        </motion.div>

        {/* Helpful Shortcut Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-light/50 block mb-4">
            Popular Destinations
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'For Employers', path: '/services/employers', icon: <Briefcase size={14} /> },
              { label: 'For Candidates', path: '/services/candidates', icon: <Users size={14} /> },
              { label: 'About Talent Carpet', path: '/about', icon: <Search size={14} /> },
              { label: 'Contact Support', path: '/contact', icon: <PhoneCall size={14} /> },
            ].map((shortcut, idx) => (
              <Link
                key={idx}
                to={shortcut.path}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#75BB3F] hover:text-[#1E378B] dark:hover:text-[#75BB3F] transition-all duration-200 shadow-2xs"
              >
                <span className="text-[#75BB3F]">{shortcut.icon}</span>
                <span>{shortcut.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
