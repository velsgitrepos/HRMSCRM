import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Eye, Shield, Award, Users, HeartHandshake, ChevronDown, ArrowRight, Check, AlertCircle, X, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../context/AuthContext';
import ScrollReveal from '../components/ScrollReveal';

const LinkedinIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.064-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const WhatsappIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

const About = () => {
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const teamRes = await axios.get(`${API_URL}/team`);
        setTeam(teamRes.data);
      } catch (err) {
        console.error('Error fetching team:', err);
      }
    };
    fetchTeam();
  }, []);



  const officeImages = [
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400', caption: 'Executive Boardroom' },
    { url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400', caption: 'Consultation Hub' },
    { url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=400', caption: 'Collaboration Bay' },
    { url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=400', caption: 'Innovation Corner' },
  ];

  const faqs = [
    {
      q: "What industries does Talent Carpet recruit for?",
      a: "We provide recruitment services across IT, Manufacturing, Healthcare, Finance, Engineering, Retail, Logistics, Telecommunications, FMCG, Education, Hospitality, and several other industries."
    },
    {
      q: "How quickly can you fill a position?",
      a: "Hiring timelines vary depending on the role and market conditions. However, qualified candidate profiles are often shared within 48–72 hours for many positions."
    },
    {
      q: "Do you provide executive hiring services?",
      a: "Yes. We specialize in executive search and leadership hiring for senior management, directors, vice presidents, and C-level positions."
    },
    {
      q: "Do you recruit across India?",
      a: "Yes. We support organizations with recruitment requirements across major cities and emerging business hubs throughout India."
    },
    {
      q: "How are candidates screened?",
      a: "Every candidate undergoes a structured evaluation process covering technical expertise, work experience, communication skills, cultural fit, and career objectives before being presented to clients."
    },
    {
      q: "Can you support large-scale hiring projects",
      a: "Absolutely. Our bulk hiring and Recruitment Process Outsourcing (RPO) solutions are designed to help businesses efficiently scale their workforce."
    }
  ];

  return (
    <div className="bg-[#F8FAFC] dark:bg-primary transition-colors duration-300 overflow-x-clip">

      {/* HERO / INTRO SECTION: MEET OUR FOUNDER */}
      <section id="founder-hero" className="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* Centered Section Heading */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#1E378B]/20 dark:border-[#75BB3F]/30 bg-[#1E378B]/10 dark:bg-[#75BB3F]/15 text-[#1E378B] dark:text-[#75BB3F] text-xs font-extrabold tracking-widest uppercase shadow-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-[#75BB3F] animate-ping" />
              <span>MEET OUR FOUNDER</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-light tracking-tight leading-snug font-sans">
              Connecting Potential <span className="text-[#1E378B] dark:text-[#75BB3F]">With Possibility</span>
            </h1>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-10 lg:gap-14 lg:items-start relative">
          
          {/* Left Column (Desktop ~40%): Pure Sticky Founder Image Container */}
          <div className="lg:sticky lg:top-24 lg:self-start z-20">
            <div className="relative">
              {/* Brand Green & Navy Ambient Backdrop Glow */}
              <div className="absolute -inset-4 bg-[#75BB3F]/20 rounded-[36px] blur-2xl pointer-events-none" />
              <div className="absolute -inset-2 bg-[#1E378B]/20 rounded-[36px] blur-xl pointer-events-none" />

              {/* Founder Main Photo Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 dark:bg-slate-800 group">
                <img
                  src="/founder1.jpeg"
                  alt="Mubeen Irshad - Founder & Managing Director of Talent Carpet"
                  loading="eager"
                  onError={(e) => {
                    if (e.currentTarget.src !== window.location.origin + '/founder%20png.png') {
                      e.currentTarget.src = '/founder png.png';
                    }
                  }}
                  className="w-full h-[440px] sm:h-[500px] lg:h-[530px] object-cover object-top rounded-2xl transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

                {/* Overlapping Bottom-Right Floating Info Badge */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 max-w-[210px] sm:max-w-[240px] p-2.5 sm:p-3 rounded-xl bg-white/95 dark:bg-[#0B132B]/95 backdrop-blur-md border border-white/20 shadow-xl text-slate-900 dark:text-white z-10">
                  <div className="flex items-center justify-between gap-2.5">
                    <div>
                      <h3 className="text-xs sm:text-sm font-extrabold font-sans text-slate-900 dark:text-white leading-tight">
                        Mubeen Irshad
                      </h3>
                      <p className="text-[9px] sm:text-[10px] font-bold text-[#75BB3F] uppercase tracking-wider mt-0.5 leading-tight">
                        Founder &amp; Managing Director
                      </p>
                    </div>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#75BB3F] text-slate-950 flex items-center justify-center font-black text-[10px] sm:text-xs shadow-md shrink-0">
                      TC
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Leadership Badge (Top Right) */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute -top-5 -right-4 sm:-right-6 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#112361] text-white p-3 shadow-2xl flex flex-col items-center justify-center text-center border-4 border-white z-20 overflow-hidden"
              >
                <div className="absolute inset-1.5 rounded-full border border-[#75BB3F]/50 pointer-events-none" />
                <span className="text-2xl sm:text-3xl font-extrabold font-sans text-[#75BB3F] tracking-tight leading-none mb-0.5">
                  12+
                </span>
                <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-slate-200 leading-tight px-1 text-center">
                  YEARS OF LEADERSHIP
                </span>
              </motion.div>
            </div>
          </div>

          {/* Right Column (Desktop ~60%): Exact Founder Spoken Message */}
          <div className="space-y-6">

            {/* Continuous Founder Message (Verbatim Provided Content) */}
            <div className="space-y-5 text-slate-700 dark:text-slate-200 text-base sm:text-lg leading-relaxed font-sans">
              
              <p className="text-slate-800 dark:text-slate-100 font-semibold text-lg sm:text-xl leading-relaxed">
                Talent Carpet was founded with a simple purpose: to help people find the right opportunities and help organisations find the right talent.
              </p>

              <p>
                We believe recruitment is more than filling vacancies; it is about people, possibilities and the right fit.
              </p>

              <p>
                From sourcing and screening to interview coordination, communication and closure, we stay involved throughout the journey.
              </p>

              <p className="font-semibold text-slate-900 dark:text-white">
                Our work is guided by three values: <span className="text-[#1E378B] dark:text-[#75BB3F] font-extrabold">Integrity</span>, <span className="text-[#1E378B] dark:text-[#75BB3F] font-extrabold">Authenticity</span> and <span className="text-[#1E378B] dark:text-[#75BB3F] font-extrabold">Transparent Communication</span>.
              </p>

              <p>
                When the right candidate joins the right organisation, both sides grow.
              </p>

              <div className="space-y-1.5 pt-2 pb-2 pl-4 border-l-4 border-[#75BB3F] font-semibold text-slate-900 dark:text-light">
                <p>For us, every profile is a possibility,</p>
                <p>every interview is an opportunity,</p>
                <p>and every closure is a responsibility.</p>
              </div>

              <p className="text-base sm:text-xl font-black text-[#1E378B] dark:text-[#75BB3F] tracking-wide pt-1">
                Candidate + Client = Mutual Success.
              </p>

              <p className="font-bold text-slate-900 dark:text-light">
                That is our purpose. That is our success mantra.
              </p>

              {/* Founder Attribution Line */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  — Mubeen Irshad
                </p>
                <p className="text-xs font-extrabold text-[#75BB3F] uppercase tracking-wider mt-1 font-sans">
                  Founder & Managing Director, Talent Carpet
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto mb-28 grid grid-cols-1 md:grid-cols-2 gap-8">
        <ScrollReveal direction="left" className="h-full">
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="group p-10 rounded-3xl flex flex-col justify-between h-full border border-white/10 text-white transition-all duration-300 cursor-pointer hover:shadow-[0_20px_40px_rgba(30,55,139,0.3)]"
            style={{ background: '#1E378B' }}
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-white text-2xl font-bold mb-4 font-serif">Our Mission</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                To systematically catalog, screen, and introduce elite professionals to organizations where their technical vision and leadership capacity can multiply brand value and fuel sustainable company growth.
              </p>
            </div>
          </motion.div>
        </ScrollReveal>

        <ScrollReveal direction="right" className="h-full">
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="group p-10 rounded-3xl flex flex-col justify-between h-full border border-white/10 text-white transition-all duration-300 cursor-pointer hover:shadow-[0_20px_40px_rgba(117,187,63,0.4)]"
            style={{ background: '#75BB3F' }}
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300">
                <Eye className="text-white" size={32} />
              </div>
              <h3 className="text-white text-2xl font-bold mb-4 font-serif">Our Vision</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                To remain the world's most trusted executive search and specialized HR consultancy, setting high benchmarks of alignment, candidate counseling, and recruitment workflow transparency.
              </p>
            </div>
          </motion.div>
        </ScrollReveal>
      </section>

      {/* SECTION: EXPERT SERVICES (Exact Grid & Card Design matching reference image) */}
      <section className="py-20 px-6 bg-slate-50/70 dark:bg-slate-900/40 relative overflow-hidden mb-28 rounded-3xl border border-slate-200/60 dark:border-slate-800">

        {/* SVG Mesh Wave Background Watermark */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="mesh-wave" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M 0,60 Q 30,20 60,60 T 120,60" fill="none" stroke="#1E378B" strokeWidth="0.75" />
              <path d="M 0,30 Q 45,90 90,30 T 180,30" fill="none" stroke="#75BB3F" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#mesh-wave)" />
          </svg>
        </div>


        <div className="max-w-7xl mx-auto relative z-10">

          {/* Header */}
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-4 py-1.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 text-xs font-bold tracking-wide uppercase mb-4 shadow-sm">
                Our Services
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-light font-sans tracking-tight leading-tight">
                Empowering your workforce <br /> with expert services
              </h2>
            </div>
          </ScrollReveal>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-8">
            {[
              {
                title: 'Permanent hiring ',
                desc: 'Connecting businesses with the right talent for long-term employment',
                image: 'permanent hiring.jpg',
                maskPath: 'M0,0 H200 V160 H0 Z M 25,18 C 75,2 155,12 180,42 C 202,72 188,128 155,148 C 115,165 45,152 20,122 C -5,92 5,42 25,18 Z',
                path: '/services/employers'
              },
              {
                title: 'Contract Staffing',
                desc: 'Flexible workforce solutions to scale teams rapidly for project milestones.',
                image: 'contract staffing1.jpg',
                maskPath: 'M0,0 H200 V160 H0 Z M 40,12 C 120,-8 185,18 192,52 C 198,88 175,145 135,155 C 85,168 30,145 15,112 C -2,78 10,32 40,12 Z',
                path: '/services/employers'
              },
              {
                title: 'Payroll & HR Compliance',
                desc: 'End-to-end salary processing, PF/ESI filings, and legal HR compliance.',
                image: 'payroll.jpg',
                maskPath: 'M0,0 H200 V160 H0 Z M 20,22 C 95,2 180,-2 192,32 C 202,68 182,138 148,154 C 108,168 35,152 18,122 C -2,88 0,48 20,22 Z',
                path: '/services/employers'
              },
              {
                title: 'Contract to hire',
                desc: 'Hire professionals on contract with the option to convert them to permanent employees..',
                image: 'contract to hire.jpg',
                maskPath: 'M0,0 H200 V160 H0 Z M 42,14 C 125,-6 182,14 194,54 C 204,94 178,144 138,154 C 88,166 32,146 16,114 C -2,80 8,36 42,14 Z',
                path: '/services/employers'
              }
            ].map((srv, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.06}>
                <div className="bg-white dark:bg-slate-800 rounded-[32px] p-7 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between h-[420px] group hover:-translate-y-2.5 transition-all duration-300 cursor-pointer">
                  <div>
                    {/* Robust Organic Mask Container */}
                    <div className="relative mb-6 h-52 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900">
                      <img
                        src={srv.image}
                        alt={srv.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Organic Shape Mask SVG Overlay */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 160" preserveAspectRatio="none">
                        <path
                          d={srv.maskPath}
                          fillRule="evenodd"
                          className="fill-white dark:fill-slate-800 transition-colors"
                        />
                      </svg>
                    </div>

                    {/* Title & Desc */}
                    <h3 className="text-slate-900 dark:text-light font-extrabold text-xl font-sans mb-2.5 leading-snug group-hover:text-[#1E378B] dark:group-hover:text-[#75BB3F] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-slate-500 dark:text-light/70 text-xs sm:text-sm leading-relaxed font-sans">
                      {srv.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom Banner matching reference image */}
          <ScrollReveal delay={0.2}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-3 text-sm text-center">
              <span className="bg-[#112361] text-white px-4 py-1.5 rounded-full font-extrabold text-xs tracking-wider uppercase shadow-md">
                HURRY
              </span>
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                Choose from our selection of tailored recruitment solutions.
              </span>
              <a
                href="/contact"
                className="text-[#1E378B] dark:text-[#75BB3F] font-extrabold underline hover:text-[#75BB3F] transition-colors ml-1"
              >
                Get a consultation
              </a>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* SECTION: TALENT CARPET VS TRADITIONAL STAFFING */}
      <section className="max-w-7xl mx-auto mb-28">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-secondary font-bold tracking-widest text-sm uppercase block mb-3">COMPARISON</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-light">
              Talent Carpet VS Traditional Staffing
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left Card: Talent Carpet Approach */}
          <ScrollReveal direction="left" className="h-full">
            <div className="group relative overflow-hidden glass-card p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-light-dark/10 hover:border-[#75BB3F] shadow-premium flex flex-col justify-between h-full hover:shadow-xl hover:shadow-[#75BB3F]/15 transition-all duration-300">
              {/* Green Top Accent Line on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#75BB3F] transition-all duration-300 transform origin-left scale-x-0 group-hover:scale-x-100" />

              <div>
                <div className="flex items-center space-x-5 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-[#75BB3F] border border-[#75BB3F] flex items-center justify-center text-white font-bold shrink-0 shadow-md">
                    <Check size={28} strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="text-slate-900 dark:text-light text-2xl font-extrabold group-hover:text-[#75BB3F] transition-colors">Talent Carpet Approach</h3>
                    <span className="text-[#75BB3F] text-xs font-bold uppercase tracking-wider block mt-0.5">Value & Quality Focused</span>
                  </div>
                </div>

                <ul className="space-y-4">
                  {[
                    "Quality-focused with 3-5 perfect-fit candidates",
                    "Cultural alignment and long-term fit assessment",
                    "Soft skills and behavioral competency evaluation",
                    "Partnership model with ongoing support",
                    "90-day placement guarantee",
                    "Market insights and strategic advice included"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-[#75BB3F] font-bold">
                      <Check size={18} className="text-[#75BB3F] mr-3 mt-0.5 shrink-0" strokeWidth={3} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Card: Traditional Agencies */}
          <ScrollReveal direction="right" className="h-full">
            <div className="group relative overflow-hidden glass-card p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-light-dark/10 hover:border-[#F97316] shadow-premium flex flex-col justify-between h-full hover:shadow-xl hover:shadow-[#F97316]/15 transition-all duration-300">
              {/* Orange Top Accent Line on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#F97316] transition-all duration-300 transform origin-left scale-x-0 group-hover:scale-x-100" />

              <div>
                <div className="flex items-center space-x-5 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-[#F97316] border border-[#F97316] flex items-center justify-center text-white font-bold shrink-0 shadow-md">
                    <AlertCircle size={28} />
                  </div>
                  <div>
                    <h3 className="text-slate-900 dark:text-light text-2xl font-extrabold group-hover:text-[#F97316] transition-colors">Traditional Agencies</h3>
                    <span className="text-[#F97316] text-xs font-bold uppercase tracking-wider block mt-0.5">Transactional Volume Model</span>
                  </div>
                </div>

                <ul className="space-y-4">
                  {[
                    "Volume-driven with 10-20+ random candidates",
                    "Focus primarily on skills and experience only",
                    "Limited assessment of soft skills and behaviors",
                    "Transactional relationship ends after placement",
                    "Limited or no placement guarantees",
                    "Little to no strategic value added"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-[#F97316] font-bold">
                      <X size={18} className="text-[#F97316] mr-3 mt-0.5 shrink-0" strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>      {/* SECTION: MEET OUR TEAM (Circular Avatar Layout Matching Uploaded Reference Image) */}
      <section className="py-16 border-t border-slate-200 dark:border-light-dark/10 px-6 transition-colors duration-300 max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#75BB3F] font-extrabold tracking-widest text-xs uppercase block mb-2">
              OUR STRATEGISTS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-light font-sans tracking-tight">
              Meet Our Team
            </h2>
            <p className="text-slate-500 dark:text-light/80 mt-2 text-xs sm:text-sm font-sans">
              Elite recruitment consultants shaping organizational charts of leading global operations.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
          {(team && team.length > 0 ? team : [
            {
              _id: '1',
              name: 'Mubeen Irshad ',
              designation: 'Founder & CEO',
              experience: '12+ Years',
              imageUrl: '',
              linkedinUrl: 'https://www.linkedin.com/in/mubeen-irshad/',
              whatsappNumber: '+91 96770 70837',
            },
            {
              _id: '2',
              name: 'Mohammed Irshad ',
              designation: 'Co-Founder & Director',
              experience: '11+ Years',
              imageUrl: '',
              linkedinUrl: 'https://www.linkedin.com/in/irshad75/',
              whatsappNumber: '+91 96770 80055',
            },
            {
              _id: '3',
              name: 'Monisha',
              designation: 'Senior Talent Acquisition Specialist',
              experience: '3 Years',
              imageUrl: "",
              linkedinUrl: 'https://www.linkedin.com/in/monisha-rm-73709522b/',
              whatsappNumber: '+91 96294 02313',
            },
            {
              _id: '4',
              name: 'Nivetha',
              designation: 'Senior Talent Acquisition Specialist',
              experience: '2+ Years',
              imageUrl: '',
              linkedinUrl: 'https://www.linkedin.com/in/nivetha-anbalagan/',
              whatsappNumber: '+91 99942 68146',
            },
            {
              _id: "5",
              name: "Fathima Nisha ",
              designation:"Talent Acquisition Executive",
              experience: "1+ Years",
              imageUrl:"",
              linkedinUrl:"https://www.linkedin.com/in/fathima-nisha-hr-34b0653ab/",
              whatsappNumber:"7200390281"
            },
            {
              _id: "6",
              name: "Vishnupriya",
              designation: "Digital Marketing Specialist",
              experience: "2+ Years",
              imageUrl:"",
              linkedinUrl:"https://www.linkedin.com/in/vishnu-priya-582762320/",
              whatsappNumber:"+91 97916 80765"
            },
            {
              _id: "7",
              name:"Velmurugan",
              designation:"Technical Lead",
              experience:"15+ Years",
              imageUrl:"",
              linkedinUrl:"",
              whatsappNumber:""
            },
            {
              _id: "8",
              name:"Usman Ali",
              designation:"Junior Full Stack Developer",
              experience:"4 months",
              imageurl:"",
              linkedinUrl:"https://www.linkedin.com/in/usman-ali-m-/",
              whatsappNumber:""
            }
          ]).map((member, idx) => {
            const accentColors = ['border-[#75BB3F]', 'border-[#1E378B]', 'border-[#3B82F6]', 'border-[#F97316]'];
            const ringColor = accentColors[idx % accentColors.length];

            const hasImage = typeof member.imageUrl === 'string' && member.imageUrl.trim() !== '';
            const imageSrc = hasImage
              ? (member.imageUrl.startsWith('/uploads') ? `${API_URL.replace('/api', '')}${member.imageUrl}` : member.imageUrl)
              : null;
            const firstLetter = member.name ? member.name.trim().charAt(0).toUpperCase() : 'T';
            const waNumber = member.whatsappNumber && member.whatsappNumber.trim() !== '' ? member.whatsappNumber : '+91 96770 70837';

            return (
              <ScrollReveal key={member._id || idx} delay={idx * 0.08} className="text-center group">
                {/* Compact Circular Avatar with Accent Arc Ring */}
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 mx-auto mb-4">
                  {/* Colorful Arc Ring Decorator */}
                  <div className={`absolute -inset-2 rounded-full border-t-3 border-r-3 ${ringColor} transition-transform duration-700 group-hover:rotate-180 opacity-90`} />

                  {/* Main Rounded Avatar Image or First Letter Initial Cover */}
                  <div className="w-full h-full rounded-full overflow-hidden p-1 bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
                    {hasImage ? (
                      <img
                        src={imageSrc}
                        alt={member.name}
                        loading="lazy"
                        className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-[#EBF7E3] dark:bg-[#75BB3F]/20 text-[#5C9430] dark:text-[#75BB3F] border border-[#75BB3F]/30 flex items-center justify-center font-extrabold text-3xl sm:text-4xl uppercase shadow-sm group-hover:scale-105 transition-transform duration-500 font-sans">
                        {firstLetter}
                      </div>
                    )}
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-slate-900 dark:text-light text-lg font-extrabold font-sans mb-0.5 group-hover:text-[#1E378B] dark:group-hover:text-[#75BB3F] transition-colors">
                  {member.name}
                </h3>

                {/* Designation / Position */}
                <p className="text-[#75BB3F] font-bold text-[11px] uppercase tracking-wider mb-1 font-sans">
                  {member.designation}
                </p>

                {/* Job Experience */}
                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mb-3 font-sans">
                  Experience: {member.experience || '8+ Years'}
                </p>

                {/* Action Buttons: LinkedIn & WhatsApp */}
                <div className="flex items-center justify-center space-x-2.5">
                  <a
                    href={member.linkedinUrl || 'https://linkedin.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} LinkedIn Profile`}
                    className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0A66C2] inline-flex items-center justify-center hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] hover:scale-110 transition-all duration-300 shadow-sm"
                    title="Connect on LinkedIn"
                  >
                    <LinkedinIcon size={16} />
                  </a>

                  {waNumber && (
                    <a
                      href={`https://wa.me/${waNumber.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} WhatsApp Contact`}
                      className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#25D366] inline-flex items-center justify-center hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:scale-110 transition-all duration-300 shadow-sm"
                      title={`Chat on WhatsApp (${waNumber})`}
                    >
                      <WhatsappIcon size={16} />
                    </a>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* SECTION: ADVANTAGES OF WORKING WITH US (Matching User Reference Design) */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#75BB3F] font-extrabold tracking-widest text-xs uppercase block mb-3">
              BENEFITS & VALUE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-light">
              Advantages of Working With Us
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {[
              {
                title: 'Reduce High Hiring Risks',
                icon: <Shield className="text-white" size={24} />,
                badgeBg: 'bg-[#75BB3F]',
                desc: 'Rigorous 5-stage vetting prevents costly mis-hires.'
              },
              {
                title: 'Deeper Talent Pools',
                icon: <Users className="text-white" size={24} />,
                badgeBg: 'bg-[#3B82F6]',
                desc: 'Access to passive candidates unavailable on public portals.'
              },
              {
                title: 'Employer Branding',
                icon: <Target className="text-white" size={24} />,
                badgeBg: 'bg-[#10B981]',
                desc: 'Elevating company brand value across candidate touchpoints.'
              },
              {
                title: 'Increase Efficiencies',
                icon: <Award className="text-white" size={24} />,
                badgeBg: 'bg-[#F97316]',
                desc: '48-hour profile turnaround keeps hiring pipelines moving.'
              },
              {
                title: 'Onboarding Support',
                icon: <HeartHandshake className="text-white" size={24} />,
                badgeBg: 'bg-[#06B6D4]',
                desc: 'Structured 90-day check-ins ensuring candidate retention.'
              },
              {
                title: 'Deep Industry Knowledge',
                icon: <Eye className="text-white" size={24} />,
                badgeBg: 'bg-[#6366F1]',
                desc: 'Domain specialist recruiters in IT, Engineering, & Finance.'
              },
              {
                title: '90-Day Placement Guarantee',
                icon: <CheckCircle2 className="text-white" size={24} />,
                badgeBg: 'bg-[#F43F5E]',
                desc: 'Risk-free replacement assurance on executive placements.'
              },
              {
                title: 'Strategic Compensation Advice',
                icon: <Sparkles className="text-white" size={24} />,
                badgeBg: 'bg-[#0D9488]',
                desc: 'Real-time market insights for competitive salary offers.'
              }
            ].map((adv, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#1E378B] hover:bg-[#162A6B] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 flex items-center space-x-5 border border-[#1E378B] cursor-pointer group"
              >
                {/* Left Vibrant Icon Badge */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl ${adv.badgeBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {adv.icon}
                </div>

                {/* Right Text */}
                <div className="flex-1">
                  <h4 className="text-white font-extrabold text-lg sm:text-xl font-serif leading-snug tracking-tight">
                    {adv.title}
                  </h4>
                  <p className="text-white/80 text-xs sm:text-sm mt-1 leading-relaxed font-sans">
                    {adv.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ SECTION (Matching Uploaded Reference Layout & Talent Carpet Brand Palette) */}
      <section className="max-w-7xl mx-auto mb-28 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Title, Tag, Subtext & Get In Touch CTA */}
          <ScrollReveal direction="left" className="lg:col-span-5 space-y-6 lg:sticky lg:top-28 lg:self-start">

            {/* Pill Badge */}
            <div className="inline-block px-4 py-1.5 rounded-full border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold tracking-wide uppercase">
              / FAQS
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-light font-sans tracking-tight leading-snug">
              Frequently asked <br />
              <span className="text-[#1E378B] dark:text-[#75BB3F]">questions</span>
            </h2>

            {/* Subtext */}
            <p className="text-slate-500 dark:text-light/75 text-sm sm:text-base leading-relaxed max-w-md font-sans">
              Here’s everything you need to know about our recruitment solutions, candidate screening procedures, executive hiring, and placement timelines.
            </p>

            {/* CTA Box */}
            <div className="pt-6 space-y-3">
              <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
                Get any more questions?
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-7 py-3 rounded-full bg-[#75BB3F] hover:bg-[#62A032] text-slate-950 font-bold text-sm shadow-md hover:scale-105 transition-all duration-300"
              >
                Get in touch
              </Link>
            </div>

          </ScrollReveal>

          {/* Right Column: FAQ Accordion Stack matching reference image */}
          <ScrollReveal direction="right" className="lg:col-span-7">
            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isExpanded = expandedIdx === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl transition-all duration-300 border ${isExpanded
                        ? 'bg-slate-50/90 dark:bg-slate-800/90 border-[#1E378B]/30 dark:border-[#75BB3F]/40 shadow-sm'
                        : 'bg-white dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/60 hover:border-slate-300'
                      }`}
                  >
                    <button
                      onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between font-bold text-slate-900 dark:text-light text-base sm:text-lg font-sans focus:outline-none cursor-pointer"
                    >
                      <span className="pr-4">{faq.q}</span>

                      {/* Plus (+) / Minus (-) Icon toggle matching reference image */}
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-black shrink-0 transition-all duration-300 ${isExpanded
                          ? 'bg-[#1E378B] text-white dark:bg-[#75BB3F] dark:text-slate-950'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}>
                        {isExpanded ? '−' : '+'}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 dark:text-light/80 leading-relaxed font-sans border-t border-slate-200/60 dark:border-slate-700/40">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

        </div>
      </section>

    </div>
  );
};

export default About;
