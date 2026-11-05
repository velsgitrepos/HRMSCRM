import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';

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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'For Employers', path: '/services/employers' },
    { name: 'For Candidates', path: '/services/candidates' },
    { name: 'Contact Us', path: '/contact' },
    { name: "Careers", path: "/careers" }
  ];

  const servicesLinks = [
    { name: 'For Employers', path: '/services/employers' },
    { name: 'For Candidates', path: '/services/candidates' },
    { name: 'Onboarding & Payroll Support', path: '/services/employers' },
    { name: 'Contract & Workforce Mgmt', path: '/services/employers' },
    { name: 'HR SOP & Consulting', path: '/services/employers' },
    { name: 'Background Verification', path: '/services/employers' },
  ];

  return (
    <footer className="bg-primary pt-20 pb-8 text-light/70 relative overflow-hidden border-t border-primary-dark">
      {/* Visual background accents */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* Brand Column */}
        <div className="flex flex-col space-y-7">
          <Link
            to="/"
            className="flex items-center space-x-3 group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/logo 2.png"
              alt="Talent Carpet Logo"
              loading="lazy"
              className="w-20 h-20 object-cover transition-transform duration-300 group-hover:animate-rotate-360"
            />
          </Link>
          <p className="text-sm leading-relaxed text-light/80">
            Connecting exceptional talent with outstanding organizations through trusted reciurment solutions across india.
          </p>
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {[
              { icon: <LinkedinIcon size={18} />, href: 'https://www.linkedin.com/company/talentcarpet2024/home/', label: 'LinkedIn', style: 'text-[#0A66C2] bg-[#0A66C2]/15 border-[#0A66C2]/40 hover:bg-[#0A66C2] hover:text-white' },
              { icon: <FacebookIcon size={18} />, href: 'https://www.facebook.com/profile.php?id=61581447537830', label: 'Facebook', style: 'text-[#1877F2] bg-[#1877F2]/15 border-[#1877F2]/40 hover:bg-[#1877F2] hover:text-white' },
              { icon: <InstagramIcon size={18} />, href: 'https://www.instagram.com/talent_carpet_official/', label: 'Instagram', style: 'text-[#E1306C] bg-[#E1306C]/15 border-[#E1306C]/40 hover:bg-[#E1306C] hover:text-white' },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`w-10 h-10 rounded-2xl border flex items-center justify-center hover:-translate-y-1 transition-all duration-300 shadow-sm ${social.style}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-6 relative pl-3 border-l-2 border-secondary">
            Quick Links
          </h4>
          <ul className="space-y-4">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="text-sm hover:text-white flex items-center space-x-1 group transition-colors duration-250"
                >
                  <span className="h-1 w-1 rounded-full bg-light/30 group-hover:bg-secondary transition-colors duration-250 mr-2" />
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Links */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-6 relative pl-3 border-l-2 border-secondary">
            Services
          </h4>
          <ul className="space-y-4">
            {servicesLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="text-sm hover:text-white flex items-center space-x-1 group transition-colors duration-250"
                >
                  <span className="h-1 w-1 rounded-full bg-light/30 group-hover:bg-secondary transition-colors duration-250 mr-2" />
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col space-y-6">
          <h4 className="text-white font-semibold text-lg relative pl-3 border-l-2 border-secondary">
            Contact Us
          </h4>
          <p className="text-sm leading-relaxed text-light/80">
            Have a hiring requirement or looking for your next career move? Reach out to our reciurment specialists today
          </p>
          <ul className="space-y-4 text-sm">
            {/*  <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-secondary shrink-0 mt-0.5" />
              <span>
                17, 11th Cross St, VGP Layout, Soumya Nagar, Medavakkam, Chennai, Vengavasal, Tamil Nadu 600100
              </span>
            </li>*/}
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-secondary shrink-0" />
              <a href="tel:+919677070837" className="hover:text-white">
                +91 96770 70837
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-secondary shrink-0" />
              <a href="mailto:mubeen@talentcarpet.com" className="hover:text-white">
                mubeen@talentcarpet.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-6 mt-16 pt-8 border-t border-primary-dark/70 flex flex-col md:flex-row items-center justify-between text-xs text-white relative z-10 gap-4">
        <p>© {currentYear} Talent Carpet. All Rights Reserved.</p>

        <p className="text-white font-medium text-center">
          Designed & Developed by{' '}
          <a
            href="https://wa.me/919677070837"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary font-bold hover:underline transition-all"
          >
             Carpet Group of Companies 
          </a>
        </p>

        <div className="flex items-center space-x-6">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-white transition-colors">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
