import React, { useState } from 'react';
import axios from 'axios';
import { MapPin, Phone, Mail, ArrowUpRight, Send, CheckCircle2, MessageCircle, Clock } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { API_URL } from '../context/AuthContext';

// Custom inline SVG icons for social platforms
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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    requirement: 'Permanent Recruitment',
    otherRequirement: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Map embed URL fallback
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    '17, 11th Cross St, VGP Layout, Soumya Nagar, Medavakkam, Chennai, Tamil Nadu 600100'
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        requirement: formData.requirement === 'Other' && formData.otherRequirement?.trim()
          ? `Other: ${formData.otherRequirement.trim()}`
          : formData.requirement
      };
      delete payload.otherRequirement;
      await axios.post(`${API_URL}/inquiries`, payload);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        requirement: 'Permanent Recruitment',
        otherRequirement: '',
        message: '',
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      alert(err.response?.data?.message || 'Failed to submit proposal request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 bg-[#F8FAFC] dark:bg-[#0B132B] min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto pt-4 sm:pt-6">
        
        {/* Cinematic Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2.5 px-5 py-2 rounded-full bg-[#1E378B]/10 dark:bg-[#75BB3F]/15 border border-[#1E378B]/20 dark:border-[#75BB3F]/30 backdrop-blur-md shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#75BB3F] animate-ping" />
              <span className="text-[#1E378B] dark:text-[#75BB3F] text-xs font-black tracking-[0.25em] uppercase">
                GET IN TOUCH
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Let's Build Your Dream <span className="bg-gradient-to-r from-[#1E378B] via-[#2A4BB5] to-[#75BB3F] bg-clip-text text-transparent">Team Together</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed">
              Partner with our lead consultants to hire exceptional talent or manage your HR & payroll requirements seamlessly.
            </p>
          </div>
        </ScrollReveal>

        {/* Main Content Layout matching reference image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
          
          {/* Left Column: Send Us Message Form Card */}
          <ScrollReveal direction="left" className="lg:col-span-7">
            <div className="bg-white dark:bg-[#111C38] rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
              
              {/* Bottom Accent Line in Brand Royal Blue (#1E378B) */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#1E378B] via-[#2A4BB5] to-[#75BB3F]" />

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight">
                Send Us Message
              </h2>

              {submitted && (
                <div className="mb-6 bg-[#75BB3F]/15 border border-[#75BB3F]/40 p-4 rounded-2xl flex items-center space-x-3 text-[#75BB3F] animate-fade-in">
                  <CheckCircle2 size={24} className="shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Request Submitted Successfully</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Our staffing consultants will get back to you within 2 business hours.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 2-Column Row 1: First Name & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="w-full bg-[#F7F8FA] dark:bg-[#1A2747] border border-transparent focus:border-[#1E378B] dark:focus:border-[#75BB3F] focus:bg-white dark:focus:bg-[#111C38] rounded-xl px-5 py-4 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none transition-all duration-200"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="w-full bg-[#F7F8FA] dark:bg-[#1A2747] border border-transparent focus:border-[#1E378B] dark:focus:border-[#75BB3F] focus:bg-white dark:focus:bg-[#111C38] rounded-xl px-5 py-4 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                {/* 2-Column Row 2: Phone Number & Subject/Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full bg-[#F7F8FA] dark:bg-[#1A2747] border border-transparent focus:border-[#1E378B] dark:focus:border-[#75BB3F] focus:bg-white dark:focus:bg-[#111C38] rounded-xl px-5 py-4 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none transition-all duration-200"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company / Subject"
                      className="w-full bg-[#F7F8FA] dark:bg-[#1A2747] border border-transparent focus:border-[#1E378B] dark:focus:border-[#75BB3F] focus:bg-white dark:focus:bg-[#111C38] rounded-xl px-5 py-4 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Service Requirement Dropdown */}
                <div>
                  <select
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    className="w-full bg-[#F7F8FA] dark:bg-[#1A2747] border border-transparent focus:border-[#1E378B] dark:focus:border-[#75BB3F] focus:bg-white dark:focus:bg-[#111C38] rounded-xl px-5 py-4 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none transition-all duration-200"
                  >
                    <option value="Permanent Recruitment">Permanent Recruitment</option>
                    <option value="Contract Staffing">Contract Staffing</option>
                    <option value="Executive Search">Executive Search</option>
                    <option value="HR Consulting">HR Consulting & Advisory</option>
                    <option value="Payroll Services">Payroll & Compliance</option>
                    <option value="Campus Hiring">Campus Hiring Solutions</option>
                    <option value="IT Recruitment">IT Recruitment Sourcing</option>
                    <option value="Non-IT Recruitment">Non-IT Recruitment Sourcing</option>
                    <option value="Other">Other Services (Please Specify)</option>
                  </select>

                  {formData.requirement === 'Other' && (
                    <div className="mt-3 animate-fade-in">
                      <input
                        type="text"
                        required
                        name="otherRequirement"
                        value={formData.otherRequirement}
                        onChange={handleChange}
                        placeholder="Please enter your required service..."
                        className="w-full bg-[#F7F8FA] dark:bg-[#1A2747] border border-transparent focus:border-[#1E378B] dark:focus:border-[#75BB3F] focus:bg-white dark:focus:bg-[#111C38] rounded-xl px-5 py-4 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none transition-all duration-200"
                      />
                    </div>
                  )}
                </div>

                {/* Message Textarea */}
                <div>
                  <textarea
                    rows="5"
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write Your Message..."
                    className="w-full bg-[#F7F8FA] dark:bg-[#1A2747] border border-transparent focus:border-[#1E378B] dark:focus:border-[#75BB3F] focus:bg-white dark:focus:bg-[#111C38] rounded-xl px-5 py-4 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none transition-all duration-200 resize-none"
                  />
                </div>

                {/* Pill Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center space-x-2 bg-[#1E378B] hover:bg-[#112361] text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span className="text-base">Send Message</span>
                        <ArrowUpRight size={20} className="stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </div>
              </form>

            </div>
          </ScrollReveal>

          {/* Right Column: Contact Information matching reference layout */}
          <ScrollReveal direction="right" className="lg:col-span-5 space-y-8 pl-0 lg:pl-4">
            <div>
              {/* Badge Tag */}
              <span className="inline-block px-5 py-2 rounded-full bg-[#1E378B]/10 dark:bg-[#1E378B]/25 text-[#1E378B] dark:text-[#8CBF59] font-bold text-xs uppercase tracking-wider mb-4">
                Contact Us
              </span>
              
              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-4">
                You can connect with us when need help!
              </h1>
              
              {/* Subtitle / Description */}
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Empowering businesses with top-tier staffing solutions, executive search, and end-to-end recruitment management across industries.
              </p>
            </div>

            {/* Circular Info List */}
            <div className="space-y-6 pt-2">
              
              {/* Item 1: Phone */}
              <div className="flex items-center space-x-5 group">
                <div className="w-14 h-14 rounded-full bg-[#1E378B] text-white flex items-center justify-center shrink-0 shadow-md transition-transform duration-300 group-hover:scale-110">
                  <Phone size={22} className="stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#1E378B] dark:text-[#75BB3F] block tracking-wide">
                    Call Us 24/7
                  </span>
                  <a 
                    href="tel:+919677070837" 
                    className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white hover:text-[#75BB3F] transition-colors"
                  >
                    (+91) 96770 70837
                  </a>
                </div>
              </div>

              {/* Item 2: Email / Inquiry */}
              <div className="flex items-center space-x-5 group">
                <div className="w-14 h-14 rounded-full bg-[#1E378B] text-white flex items-center justify-center shrink-0 shadow-md transition-transform duration-300 group-hover:scale-110">
                  <Mail size={22} className="stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#1E378B] dark:text-[#75BB3F] block tracking-wide">
                   Mail Us
                  </span>
                  <a 
                    href="mailto:mubeen@talentcarpet.com" 
                    className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white hover:text-[#75BB3F] transition-colors break-all"
                  >
                    mubeen@talentcarpet.com
                  </a>
                </div>
              </div>

              {/* Item 3: Office / Address */}
              <div className="flex items-center space-x-5 group">
                <div className="w-14 h-14 rounded-full bg-[#1E378B] text-white flex items-center justify-center shrink-0 shadow-md transition-transform duration-300 group-hover:scale-110">
                  <MapPin size={22} className="stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#1E378B] dark:text-[#75BB3F] block tracking-wide">
                    Visit Us At
                  </span>
                  <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    17, 11th Cross St, VGP Layout, Medavakkam, Chennai - 600100
                  </p>
                </div>
              </div>

            </div>

            {/* Additional Quick WhatsApp & Social Links */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <a
                href="https://wa.me/919677070837?text=Hi%20Talent%20Carpet"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
              >
                <MessageCircle size={18} className="fill-white text-[#25D366] group-hover:scale-110 transition-transform" />
                <span>Instant WhatsApp Chat</span>
                <span className="relative flex h-2 w-2 ml-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
              </a>

              <div className="flex items-center space-x-3">
                {[
                  { icon: <LinkedinIcon size={16} />, href: 'https://www.linkedin.com/company/talentcarpet2024/home/', label: 'LinkedIn', style: 'text-[#0A66C2] bg-[#0A66C2]/10 border-[#0A66C2]/30 hover:bg-[#0A66C2] hover:text-white' },
                  { icon: <FacebookIcon size={16} />, href: 'https://www.facebook.com/profile.php?id=61581447537830', label: 'Facebook', style: 'text-[#1877F2] bg-[#1877F2]/10 border-[#1877F2]/30 hover:bg-[#1877F2] hover:text-white' },
                  { icon: <InstagramIcon size={16} />, href: 'https://www.instagram.com/talent_carpet_official/', label: 'Instagram', style: 'text-[#E1306C] bg-[#E1306C]/10 border-[#E1306C]/30 hover:bg-[#E1306C] hover:text-white' },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all shadow-sm hover:scale-105 ${social.style}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

          </ScrollReveal>

        </div>

        {/* Embedded Google Map Section */}
        <ScrollReveal delay={0.1}>
          <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 relative h-96">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Talent Carpet Medavakkam Office Location Map"
            ></iframe>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};

export default Contact;

