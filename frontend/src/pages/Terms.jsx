import React, { useEffect } from 'react';
import { FileText, Mail, Phone, MapPin } from 'lucide-react';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-3xl bg-[#75BB3F]/10 flex items-center justify-center mx-auto mb-6 text-[#75BB3F] shadow-sm">
            <FileText size={32} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 font-sans">
            Terms & Conditions
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            Last Updated: September 30, 2026
          </p>
        </div>

        {/* Content Block */}
        <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-white/10 shadow-xl space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
          
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">1. Agreement to Terms</h2>
            <p>
              By accessing or using the Talent Carpet website, you agree to follow these Terms and Conditions. If you do not agree, please discontinue use of the website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">2. Intellectual Property Rights</h2>
            <p>
              All content on this website, including text, logos, graphics, images, and other materials, belongs to Talent Carpet or its respective owners and may not be copied or used without permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">3. User Representations</h2>
            <p>
              By using our website, you agree to provide accurate and genuine information and to use the website only for lawful purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">4. Prohibited Activities</h2>
            <p>
              Users must not misuse the website, attempt unauthorized access, copy or distribute content without permission, introduce harmful software, or use the website for any unlawful activity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">5. Term and Termination</h2>
            <p>
              Talent Carpet reserves the right to modify, suspend, or terminate access to the website or its services at any time if these Terms are violated or when necessary for business or legal reasons.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">6. Contact Us</h2>
            <p>
              In order to resolve a complaint regarding the website or to receive further information regarding the use of our services, please contact us:
            </p>
            <div className="pt-2 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-[#75BB3F]" />
                <a href="mailto:mubeen@talentcarpet.com" className="hover:text-[#75BB3F] transition-colors">mubeen@talentcarpet.com</a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-[#75BB3F]" />
                <a href="tel:+919677070837" className="hover:text-[#75BB3F] transition-colors">+91 96770 70837</a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="text-[#75BB3F] shrink-0 mt-0.5" />
                <span>17, 11th Cross St, VGP Layout, Soumya Nagar, Medavakkam, Vengavasal, Tamil Nadu 600100</span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Terms;
