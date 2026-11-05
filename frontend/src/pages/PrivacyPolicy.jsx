import React, { useEffect } from 'react';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-3xl bg-[#75BB3F]/10 flex items-center justify-center mx-auto mb-6 text-[#75BB3F] shadow-sm">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 font-sans">
            Privacy Policy
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            Last Updated: September 30, 2026
          </p>
        </div>

        {/* Content Block */}
        <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-white/10 shadow-xl space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
          
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">1. Introduction</h2>
            <p>
              Talent Carpet respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your information when you use our website or services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">2. Information We Collect</h2>
            <p>
              We may collect information such as your name, phone number, email address, resume/CV, work experience, qualifications, and other details you provide when contacting us or applying for job opportunities.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">3. How We Use Your Information</h2>
            <p>
              We use your information to provide recruitment and HR consultancy services, match candidates with suitable opportunities, respond to enquiries, communicate with you, and improve our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">4. Will Your Information Be Shared?</h2>
            <p>
              We do not sell or rent your personal information. We may share relevant information with employers or clients when necessary for recruitment purposes and with trusted service providers who help us operate our business.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">5. How Long Do We Keep Your Information?</h2>
            <p>
              We retain your information only for as long as necessary to provide our services, process recruitment opportunities, comply with legal requirements, or maintain business records. You may contact us to request changes or deletion of your information, subject to applicable laws.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">6. Contact Us</h2>
            <p>
              If you have any questions or requests regarding this Privacy Policy or your personal information, please get in touch with us:
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

export default PrivacyPolicy;
