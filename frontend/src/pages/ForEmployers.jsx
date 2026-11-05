import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../context/AuthContext';
import {
  Building2,
  ChevronLeft,
  CheckCircle2,
  Users,
  Search,
  TrendingUp,
  Globe2,
  Layers,
  UserCheck,
  PhoneCall,
  ClipboardCheck,
  Star,
  Briefcase,
  ArrowUpRight,
  FileText,
  Handshake,
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const ForEmployers = () => {
  const [employerTestimonials, setEmployerTestimonials] = useState([]);
  const testimonialScrollRef = useRef(null);

  useEffect(() => {
    const fetchEmployerTestimonials = async () => {
      try {
        const res = await axios.get(`${API_URL}/testimonials?type=Employer`);
        // Fallback list of employer testimonials if database returns empty
        if (res.data && res.data.length > 0) {
          setEmployerTestimonials(res.data);
        } else {
          setEmployerTestimonials([
            { clientName: 'Revolite Infotech', company: 'Revolite Infotech', rating: 5, review: 'Thank you for reaching out. We’ve had a good experience working with Talent Carpet HR Solutions. Your team has been responsive, supportive, and quick to understand our requirements. The candidate quality and overall coordination have also been good.' }
          ]);
        }
      } catch (err) {
        console.error('Error fetching employer testimonials:', err);
      }
    };
    fetchEmployerTestimonials();
  }, []);

  const displayEmployerTestimonials = employerTestimonials.length > 0
    ? [...employerTestimonials, ...employerTestimonials, ...employerTestimonials, ...employerTestimonials]
    : [];

  // Auto-scroll Employer Testimonials (Horizontal Marquee & Mobile Touch Fix)
  useEffect(() => {
    const el = testimonialScrollRef.current;
    if (!el || employerTestimonials.length === 0) return;
    let animationFrameId;
    let isPausedRef = { current: false };
    let isDown = false;
    let startX;
    let scrollLeftVal;
    let resumeTimeout;
    const isTouchDevice = typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);

    const resumeAutoScroll = (delay = 1000) => {
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        if (!isDown) {
          isPausedRef.current = false;
        }
      }, delay);
    };

    const handleMouseEnter = () => {
      if (!isTouchDevice) {
        isPausedRef.current = true;
      }
    };

    const handleMouseLeave = () => {
      if (!isDown) {
        isPausedRef.current = false;
      }
    };

    const handleTouchStart = (e) => {
      isPausedRef.current = true;
      clearTimeout(resumeTimeout);
      if (e.touches && e.touches.length > 0) {
        startX = e.touches[0].pageX - el.offsetLeft;
        scrollLeftVal = el.scrollLeft;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0 && startX !== undefined) {
        const x = e.touches[0].pageX - el.offsetLeft;
        const walk = (x - startX) * 1.2;
        el.scrollLeft = scrollLeftVal - walk;
      }
    };

    const handleTouchEnd = () => {
      resumeAutoScroll(800);
    };

    const handleMouseDown = (e) => {
      isDown = true;
      isPausedRef.current = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeftVal = el.scrollLeft;
    };

    const handleMouseUp = () => {
      isDown = false;
      resumeAutoScroll(1000);
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeftVal - walk;
    };

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: true });
    el.addEventListener('touchend', handleTouchEnd);
    el.addEventListener('touchcancel', handleTouchEnd);
    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseup', handleMouseUp);
    el.addEventListener('mousemove', handleMouseMove);

    const scrollSpeed = 0.6;

    const scroll = () => {
      if (!isPausedRef.current && !isDown) {
        el.scrollLeft += scrollSpeed;
        const oneThird = el.scrollWidth / 4;
        if (oneThird > 0) {
          if (el.scrollLeft >= oneThird * 2) {
            el.scrollLeft -= oneThird;
          } else if (el.scrollLeft <= 0) {
            el.scrollLeft += oneThird;
          }
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resumeTimeout);
      if (el) {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.removeEventListener('touchstart', handleTouchStart);
        el.removeEventListener('touchmove', handleTouchMove);
        el.removeEventListener('touchend', handleTouchEnd);
        el.removeEventListener('touchcancel', handleTouchEnd);
        el.removeEventListener('mousedown', handleMouseDown);
        el.removeEventListener('mouseup', handleMouseUp);
        el.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [employerTestimonials]);
  const recruitmentSolutions = [
    {
      title: 'Employee Onboarding Support',
      desc: 'Seamless orientation, documentation completion, system provisioning, and welcome kit coordination.',
      path: '/contact',
      icon: <UserCheck size={18} />,
      image: '/employee onboarding.jpg',
    },
    {
      title: 'Payroll & Tax Optimization',
      desc: 'Accurate monthly salary computations, statutory PF/ESI filings, tax management, and compliance audits.',
      path: '/contact',
      icon: <Layers size={18} />,
      image: '/payroll tax.jpg',
      highlighted: false, // Vibrant Logo Green Card like reference image!
    },
    {
      title: 'Employee Documentation',
      desc: 'Creation and digital management of appointment letters, NDAs, handbooks, and personnel file archives.',
      path: '/contact',
      icon: <Briefcase size={18} />,
      image: '/documentation.jpg',
    },
    {
      title: 'Background Verification',
      desc: 'Comprehensive employment history audits, education verification, criminal checks, and reference validation.',
      path: '/contact',
      icon: <UserCheck size={18} />,
      image: '/verification.jpg',
    },
    {
      title: 'Contract & Workforce Mgmt',
      desc: 'Flexible temporary staffing administration, attendance tracking, shift scheduling, and contractor SLAs.',
      path: '/contact',
      icon: <Users size={18} />,
      image: '/contract and.jpg',
    },
    {
      title: 'Employee Engagement Support',
      desc: 'Team building programs, regular pulse surveys, performance feedback loops, and satisfaction initiatives.',
      path: '/contact',
      icon: <TrendingUp size={18} />,
      image: '/employee engagement.jpg',
    },
    {
      title: 'HR Process & SOP Support',
      desc: 'Standard Operating Procedure (SOP) design, appraisal framework setup, and workflow automation.',
      path: '/contact',
      icon: <Building2 size={18} />,
      image: "/SOP.jpg",
    },
    {
      title: 'Exit & Offboarding Assistance',
      desc: 'Full & Final (F&F) settlement processing, exit interviews, asset clearance checksheets, and relieving letters.',
      path: '/contact',
      icon: <Globe2 size={18} />,
      image: '/offboarding.jpg',
    }
  ];

  const highlights = [
    { title: 'Dedicated Recruitment Consultants', desc: 'Sourcing experts specialized in your domain for detailed candidate matching.' },
    { title: 'Access to a Large Talent Network', desc: 'Deep candidate pools of active and passive professionals across fields.' },
    { title: 'Industry-Specific Hiring Expertise', desc: 'Years of technical and functional mapping knowledge.' },
    { title: 'Thorough Candidate Screening', desc: 'Rigorous vetting covering technical, cultural, and credential checks.' },
    { title: 'Faster Recruitment Process', desc: 'Optimized timelines to resolve key vacancies quickly.' },
    { title: 'End-to-End Hiring Support', desc: 'From initial search to interview scheduling, negotiation, and onboarding.' },
    { title: 'Customized Recruitment Solutions', desc: 'Sourcing models tailored to fit startups or large enterprises.' },
    { title: 'Post-Placement Assistance', desc: 'Follow-ups to guarantee candidate integration and retention.' }
  ];

  const processSteps = [
    { number: '01', title: 'Personnel Research', desc: 'We align on candidate roles, tech stacks, experience levels, and company cultural attributes.', icon: <Search size={28} /> },
    { number: '02', title: 'Headhunting', desc: 'We map active pools, passive databases, and reference channels to target key candidates.', icon: <Users size={28} /> },
    { number: '03', title: 'Screening Audit', desc: 'Candidates undergo rigorous technical audits and reference validation checks.', icon: <ClipboardCheck size={28} /> },
    { number: '04', title: 'Job Interview', desc: 'We schedule loops, gather multi-stage feedback, and coordinate interview panels.', icon: <UserCheck size={28} /> },
    { number: '05', title: 'Employee Info', desc: 'We handle package negotiations, address counter-offers, and manage transition periods.', icon: <FileText size={28} /> },
    { number: '06', title: 'Recruitment & Onboarding', desc: 'We track post-placement progress to ensure candidate assimilation and onboarding goes smoothly.', icon: <Handshake size={28} /> }
  ];

  const valueStats = [
    'Access to highly qualified professionals who fit your role description.',
    'Reduced hiring cycle times, saving significant operational costs.',
    'Improved post-placement retention, minimizing recruitment disruption.',
    'Flexible staffing models that easily scale with your corporate demands.',
    'Dedicated support throughout the entire hiring lifecycle.'
  ];

  return (
    <div className="py-16 px-6 bg-slate-50 dark:bg-primary-dark/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Back Link */}
        <div className="mb-8 pt-10">
          <Link
            to="/"
            className="inline-flex items-center text-slate-500 hover:text-primary dark:text-light/60 dark:hover:text-secondary font-semibold text-xs tracking-wider uppercase transition-colors group"
          >
            <ChevronLeft size={16} className="mr-1.5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="left">
              <span className="text-secondary font-bold tracking-widest text-xs uppercase block">FOR EMPLOYERS</span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-light tracking-tight leading-tight mt-2">
                Find the Right Talent. <br />
                <span className="text-[#1E378B]">Faster. Smarter.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.1}>
              <p className="text-slate-600 dark:text-light/80 text-base sm:text-lg leading-relaxed max-w-2xl">
                The success of your business depends on the people you hire. At Talent Carpet, we simplify recruitment by helping organizations find skilled, qualified, and motivated professionals across various industries.
              </p>
              <p className="text-slate-600 dark:text-light/80 text-base sm:text-lg leading-relaxed max-w-2xl mt-4">
                From startups to large enterprises, we provide tailored recruitment solutions that reduce hiring time, improve candidate quality, and support your long-term business goals.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.2} className="pt-4 flex flex-wrap gap-4">
              <a
                href="https://wa.me/919677070837?text=Hi%20Talent%20Carpet,%20I'm%20looking%20to%20hire%20talent"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-md inline-flex items-center space-x-2"
              >
                <PhoneCall size={16} />
                <span>Hire Talent Today</span>
              </a>
              <Link
                to="/contact"
                className="bg-white hover:bg-slate-100 dark:bg-primary-dark border border-slate-200 dark:border-light-dark/25 text-slate-800 dark:text-light px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300"
              >
                Submit Hiring Form
              </Link>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="right" delay={0.15}>
              <div className="relative rounded-3xl overflow-hidden shadow-premium border border-slate-200 dark:border-light-dark/10 h-[420px] group">
                <img
                  src='/employee1.jpg'
                  alt="Modern recruitment solutions team"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent pointer-events-none" />
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Our Employee Services & Solutions (Matching Uploaded Reference Layout) */}
        <div className="mb-24">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-5 py-2 rounded-full bg-[#1E378B]/10 dark:bg-[#75BB3F]/15 text-[#1E378B] dark:text-[#75BB3F] font-extrabold text-xs uppercase tracking-widest mb-3">
                EMPLOYEE SERVICES & SOLUTIONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-light">
                Our Employee Services & Solutions
              </h2>
              <p className="text-slate-500 dark:text-light/60 mt-4">
                We streamline every milestone of your workforce lifecycle with our comprehensive employee and HR operational support.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-8">
            {recruitmentSolutions.map((solution, idx) => {
              const isHighlighted = solution.highlighted;
              return (
                <ScrollReveal key={idx} delay={idx * 0.05}>
                  <Link
                    to={solution.path}
                    className={`group block h-full rounded-3xl p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-md hover:shadow-2xl flex flex-col justify-between ${isHighlighted
                      ? 'bg-[#75BB3F] text-slate-950 border-2 border-[#75BB3F]'
                      : 'bg-white dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-[#75BB3F]'
                      }`}
                  >
                    {/* Top Text Content & Circular Arrow Button */}
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className={`font-extrabold text-lg leading-snug tracking-tight font-sans ${isHighlighted ? 'text-slate-950' : 'text-slate-900 dark:text-white group-hover:text-[#1E378B] dark:group-hover:text-[#75BB3F] transition-colors'
                          }`}>
                          {solution.title}
                        </h3>

                        {/* Top-Right Circular Arrow Button */}
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${isHighlighted
                          ? 'bg-[#112361] text-white border-[#112361]'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 group-hover:bg-[#1E378B] group-hover:text-white group-hover:border-[#1E378B]'
                          }`}>
                          <ArrowUpRight size={16} className="stroke-[2.5]" />
                        </div>
                      </div>

                      <p className={`text-xs leading-relaxed ${isHighlighted ? 'text-slate-900/90 font-medium' : 'text-slate-600 dark:text-slate-300'
                        }`}>
                        {solution.desc}
                      </p>
                    </div>

                    {/* Bottom Rounded Image Thumbnail with Circular Icon Overlay */}
                    <div className="mt-6 relative rounded-2xl overflow-hidden h-40 sm:h-44 shadow-inner border border-slate-100 dark:border-slate-800">
                      <img
                        src={solution.image}
                        alt={solution.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Overlapping Bottom-Left Circular Icon Badge */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center absolute bottom-3 left-3 shadow-lg z-10 ${isHighlighted
                        ? 'bg-[#112361] text-[#75BB3F]'
                        : 'bg-[#75BB3F] text-white group-hover:bg-[#1E378B]'
                        }`}>
                        {solution.icon}
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Why Employers Choose Us */}
        <div className="mb-24 bg-white/40 dark:bg-primary-dark/25 border border-slate-200 dark:border-light-dark/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-[10%] left-[10%] w-[250px] h-[250px] bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />

          <ScrollReveal>
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-light">
                Why Employers Choose Talent Carpet
              </h2>
              <p className="text-slate-500 dark:text-light/60 mt-3 max-w-2xl">
                We combine industry insights, active networks, and rigorous vetting pipelines to guarantee successful and high-retention hire matches.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 relative z-10">
            {highlights.map((highlight, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.05}>
                <div className="flex items-start space-x-3.5">
                  <CheckCircle2 className="text-secondary shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="text-slate-900 dark:text-light font-bold text-base">{highlight.title}</h4>
                    <p className="text-slate-600 dark:text-light/75 text-sm mt-1 leading-relaxed">{highlight.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Our Hiring Process (Matching Uploaded Reference Diagram Layout) */}
        <div className="mb-24">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center mb-3">
                <span className="bg-[#75BB3F] text-white text-[15px] sm:text-base font-black uppercase tracking-wider px-3.5 py-1 rounded shadow-sm">
                  HIRING
                </span>
                <span className="text-slate-900 dark:text-white text-[15px] sm:text-base font-black uppercase tracking-wider ml-2">
                  PROCESS
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm max-w-xl mx-auto font-medium">
                Our optimized execution pipeline is designed to source, evaluate, and onboard candidates with absolute speed and quality.
              </p>
            </div>
          </ScrollReveal>

          {/* Process Map Diagram */}
          <div className="relative max-w-6xl mx-auto px-4">

            {/* Continuous Horizontal Line Connector on Desktop */}
            <div className="hidden lg:block absolute top-[52px] left-[7%] right-[7%] h-[2px] bg-slate-300 dark:bg-slate-700 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-3 relative z-10">
              {processSteps.map((step, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.06} className="text-center group">

                  {/* Dashed Circular Icon Node */}
                  <div className="relative mb-5 inline-block">
                    <div className="w-24 h-24 sm:w-26 sm:h-26 rounded-full bg-white dark:bg-[#111C38] border-2 border-dashed border-[#75BB3F] shadow-lg flex flex-col items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110 group-hover:border-solid group-hover:border-[#1E378B]">
                      <div className="text-[#1E378B] dark:text-[#75BB3F] transition-colors">
                        {step.icon}
                      </div>
                      <span className="text-[10px] font-black text-[#75BB3F] uppercase tracking-widest mt-1">
                        STEP {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Step Title */}
                  <h4 className="text-slate-900 dark:text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider mb-2 font-sans px-1 leading-snug">
                    {step.title}
                  </h4>

                  {/* Yellow/Green Accent Underline Bar */}
                  <div className="w-6 h-1 bg-[#75BB3F] rounded-full mx-auto mb-2.5 transition-all duration-300 group-hover:w-10 group-hover:bg-[#1E378B]" />

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed max-w-[170px] mx-auto">
                    {step.desc}
                  </p>

                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Success Grid */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[380px] rounded-3xl overflow-hidden shadow-premium border border-slate-200 dark:border-light-dark/10">
            <img
              src="/employeed.jpg"
              alt="Successful employee meeting"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 to-transparent pointer-events-none" />
          </div>
          <div className="space-y-6">
            <ScrollReveal>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-light">
                Success That Speaks for Itself
              </h2>
            </ScrollReveal>
            <ul className="space-y-4">
              {valueStats.map((val, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.05}>
                  <li className="flex items-center space-x-3 text-slate-650 dark:text-light/80 text-sm sm:text-base">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                    <span>{val}</span>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>

        {/* Employer Testimonials Section */}
        {employerTestimonials.length > 0 && (
          <div className="mb-24">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="text-[#1E378B] dark:text-[#75BB3F] font-extrabold text-xs uppercase tracking-widest block mb-2">
                  CLIENT FEEDBACK & REVIEWS
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-light">
                  Employer Testimonials
                </h2>
                <p className="text-slate-500 dark:text-light/70 mt-3 max-w-xl mx-auto text-sm">
                  Discover how top enterprise brands and startups scale their teams using Talent Carpet's recruitment solutions.
                </p>
              </div>
            </ScrollReveal>

            <div className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 before:bg-gradient-to-r before:from-slate-50 before:to-transparent dark:before:from-[#0B132B]/80 after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 after:bg-gradient-to-l after:from-slate-50 after:to-transparent dark:after:from-[#0B132B]/80">
              <div
                ref={testimonialScrollRef}
                className={`flex overflow-x-auto scrollbar-none whitespace-normal space-x-6 py-4 px-6 items-stretch select-none cursor-grab active:cursor-grabbing ${employerTestimonials.length <= 2 ? 'justify-center' : ''
                  }`}
                style={{ scrollBehavior: 'auto' }}
              >
                {displayEmployerTestimonials.map((test, idx) => (
                  <div
                    key={idx}
                    className="w-[310px] sm:w-[350px] shrink-0 glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-light-dark/10 bg-white/80 dark:bg-primary-dark/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between select-none group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {test.clientImageUrl ? (
                            <img
                              src={typeof test.clientImageUrl === 'string' && test.clientImageUrl.startsWith('/uploads') ? `${API_URL.replace('/api', '')}${test.clientImageUrl}` : test.clientImageUrl}
                              alt={test.clientName}
                              loading="lazy"
                              className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-light-dark/15 shrink-0"
                            />
                          ) : (
                            <div className="w-11 h-11 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-sm">
                              {test.clientName?.[0]}
                            </div>
                          )}
                          <div>
                            <h4 className="text-slate-900 dark:text-light font-bold text-sm">{test.clientName}</h4>
                            {test.company && <p className="text-slate-500 dark:text-light/70 text-xs font-medium">{test.company}</p>}
                          </div>
                        </div>
                        <span className="text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-primary/10 text-primary dark:bg-primary-light/20 dark:text-light border border-primary/20">
                          Employer
                        </span>
                      </div>
                      <div className="flex mb-3">
                        {[...Array(test.rating || 5)].map((_, i) => (
                          <Star key={i} size={13} className="text-amber-400 fill-amber-400 mr-0.5" />
                        ))}
                      </div>
                      <p className="text-slate-600 dark:text-light/80 text-xs leading-relaxed italic">
                        "{test.review}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Call to Action Banner */}
        <ScrollReveal>
          <div className="bg-gradient-to-r from-slate-900 to-primary-dark/95 dark:from-primary dark:to-primary-dark text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-glow-primary border border-primary/20">
            <div className="absolute -top-[50%] -left-[20%] w-[450px] h-[450px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-[50%] -right-[20%] w-[450px] h-[450px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              {/*<span className="text-secondary font-bold tracking-widest text-xs uppercase block">TAGLINE</span>*/}
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight font-serif">
                Find skilled professionals with confidence.
              </h3>
              <p className="text-slate-350 dark:text-light/80 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                Ready to accelerate your recruitment process? Get in touch with our specialist advisors today on WhatsApp or drop us a requirement.
              </p>
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://wa.me/919677070837?text=Hi%20Talent%20Carpet,%20I'm%20looking%20to%20hire%20talent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-md inline-flex items-center space-x-2 w-full sm:w-auto justify-center"
                >
                  <PhoneCall size={16} />
                  <span>Talk to Experts (WhatsApp)</span>
                </a>
                <Link
                  to="/contact"
                  className="bg-white hover:bg-slate-50 text-slate-900 font-bold px-8 py-3.5 rounded-xl transition-all duration-300 w-full sm:w-auto shadow-sm"
                >
                  Contact Us Online
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};

export default ForEmployers;
