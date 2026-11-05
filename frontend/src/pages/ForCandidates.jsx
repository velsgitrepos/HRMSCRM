import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../context/AuthContext';
import {
  Building,
  ChevronLeft,
  CheckCircle2,
  Users,
  Award,
  BookOpen,
  Heart,
  Cpu,
  Coins,
  Wrench,
  TrendingUp,
  UserCheck,
  ArrowRight,
  PhoneCall,
  UploadCloud,
  Briefcase,
  UserPlus,
  Search,
  FileCheck,
  Handshake,
  Star,
  Truck,
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const ForCandidates = () => {
  const [candidateTestimonials, setCandidateTestimonials] = useState([]);
  const testimonialScrollRef = useRef(null);

  useEffect(() => {
    const fetchCandidateTestimonials = async () => {
      try {
        const res = await axios.get(`${API_URL}/testimonials?type=Candidate`);
        // Fallback list of candidate testimonials if database returns empty
        if (res.data && res.data.length > 0) {
          setCandidateTestimonials(res.data);
        } else {
          setCandidateTestimonials([
            { clientName: 'Atla Tarun', company: 'Candidate', rating: 5, review: 'I had a very good experience with Talent Carpet HR Solutions. The team was professional, supportive, and always responsive. They helped me to find the opportunity. I really appreciate their efforts and support.' },
            { clientName: 'Harshal Rajput', company: 'Candidate', rating: 4, review: 'I had a very good experience with Talent Carpet HR Solutions. The team was professional, supportive, and responsive throughout the recruitment process. They provided clear communication, timely updates, and helpful guidance at every stage. I truly appreciate their efforts in making the entire process smooth and well-coordinated. Thank you to the Talent Carpet HR Solutions team for your valuable support and assistance. I would definitely recommend Talent Carpet HR Solutions to candidates looking for professional and reliable recruitment support.' },
            { clientName: 'Salman', company: 'Candidate', rating: 5, review: 'I have a very good experience working with nivetha and talent carpet hr solutions they provided the job opportunities that aligned with my skillset and with their help and support i got the job and from there on i got the support from nivetha and she always have been in touch with me regarding any queries and time to time she made sure i did not have any problems in my current company and always follow up with me in case of any issue. I am very thankful for the support i received and wish good fortune for both nivetha and talent carpet hr solutions.' },
            { clientName: 'Sathish Kumar', company: 'Candidate', rating: 5, review: 'My experience with Talent Carpet was very good. The team was supportive and helped me throughout the process. Thank you for your guidance and support in my career journey! 😊🙏' }
          ]);
        }
      } catch (err) {
        console.error('Error fetching candidate testimonials:', err);
      }
    };
    fetchCandidateTestimonials();
  }, []);

  const displayCandidateTestimonials = candidateTestimonials.length > 0
    ? [...candidateTestimonials, ...candidateTestimonials, ...candidateTestimonials, ...candidateTestimonials]
    : [];

  // Auto-scroll Candidate Testimonials (Horizontal Marquee & Mobile Touch Fix)
  useEffect(() => {
    const el = testimonialScrollRef.current;
    if (!el || candidateTestimonials.length === 0) return;
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
  }, [candidateTestimonials]);
  const industries = [
    {
      name: 'Information Technology',
      badgeBg: 'bg-[#75BB3F]',
      icon: <Cpu className="text-white" size={24} />,
      desc: 'Software development, cloud architecture, AI, data science & DevOps roles.'
    },
    {
      name: 'Banking & Financial Services',
      badgeBg: 'bg-[#3B82F6]',
      icon: <Coins className="text-white" size={24} />,
      desc: 'Investment banking, accounting, fintech, wealth & risk management.'
    },
    {
      name: 'Manufacturing & Industrial',
      badgeBg: 'bg-[#10B981]',
      icon: <Building className="text-white" size={24} />,
      desc: 'Plant operations, supply chain, R&D, quality assurance & production.'
    },
    {
      name: 'Healthcare & Life Sciences',
      badgeBg: 'bg-[#F97316]',
      icon: <Heart className="text-white" size={24} />,
      desc: 'Pharmaceuticals, medical devices, clinical research & hospital operations.'
    },
    {
      name: 'Engineering & Core Sectors',
      badgeBg: 'bg-[#06B6D4]',
      icon: <Wrench className="text-white" size={24} />,
      desc: 'Mechanical, civil, electrical, automotive & infrastructure engineering.'
    },
    {
      name: 'Sales, Marketing & FMCG',
      badgeBg: 'bg-[#6366F1]',
      icon: <TrendingUp className="text-white" size={24} />,
      desc: 'Corporate sales, digital marketing, brand management & business development.'
    },
    {
      name: 'Human Resources & Operations',
      badgeBg: 'bg-[#F43F5E]',
      icon: <Users className="text-white" size={24} />,
      desc: 'Talent acquisition, HR business partners, L&D, and corporate compliance.'
    },
    {
      name: 'Retail, Logistics & Supply Chain',
      badgeBg: 'bg-[#0D9488]',
      icon: <Truck className="text-white" size={24} />,
      desc: 'Warehouse management, procurement, freight, and e-commerce operations.'
    }
  ];

  const candidateHighlights = [
    { title: 'Job Search & Placement Assistance', desc: 'Direct access to verified openings and priority candidate matching with top employer brands.' },
    { title: 'Resume Screening & Profile Guidance', desc: 'Expert resume audits and optimization to pass modern ATS filters and stand out to hiring managers.' },
    { title: 'Interview Preparation', desc: 'Mock interview coaching, domain-specific Q&A prep, and technical interview strategy guidance.' },
    { title: 'Career Guidance', desc: 'Personalized career counseling mapping your skills to emerging market trends and salary benchmarks.' },
    { title: 'Job Matching', desc: 'Precision algorithmic & consultant matching based on your experience, goals, and culture fit.' },
    { title: 'Interview Scheduling & Coordination', desc: 'End-to-end interview loop management, timely feedback updates, and calendar alignment.' },
    { title: 'Offer & Joining Support', desc: 'Assistance with salary negotiation, offer letter evaluation, notice period advice, and smooth onboarding.' },
    { title: 'Career Opportunities Across IT & Non-IT Sectors', desc: 'Access to software engineering, cloud, data, manufacturing, core engineering, BFSI, and logistics positions.' }
  ];

  const journeySteps = [
    { number: '01', title: 'Apply Job', desc: 'Apply for open roles or submit your CV through our portal.', icon: <Briefcase size={28} /> },
    { number: '02', title: 'Our Consultant Call You', desc: 'Our recruitment specialist contacts you to discuss matching job opportunities.', icon: <PhoneCall size={28} /> },
    { number: '03', title: 'Get Matched', desc: 'Our specialized industry recruiters match your profile against active client demands.', icon: <Search size={28} /> },
    { number: '04', title: 'Job Interview', desc: 'We prep you for interview rounds and handle scheduling details.', icon: <Users size={28} /> },
    { number: '05', title: 'Receive Offers', desc: 'We negotiate salary margins and coordinate final contract signoffs.', icon: <FileCheck size={28} /> },
    { number: '06', title: 'Recruitment & Career', desc: 'Step into your new corporate role with continuous advisory backups.', icon: <Handshake size={28} /> }
  ];

  const successValues = [
    'Thousands of career opportunities created across diverse functional fields.',
    'Personalized job matching targeting your exact skill strengths and preferences.',
    'Experienced career advice and interview preparation tips from recruiting experts.',
    'Fast-track credentials matching directly into leading enterprise platforms.',
    'Ongoing support and onboarding check-ins during your initial transition.'
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
              <span className="text-secondary font-bold tracking-widest text-xs uppercase block">FOR CANDIDATES</span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-light tracking-tight leading-tight mt-2">
                Find a Career That <br />
                <span className="text-gradient-blue-green">Matches Your Ambition</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.1}>
              <p className="text-slate-600 dark:text-light/80 text-base sm:text-lg leading-relaxed max-w-2xl">
                Whether you're a fresher starting your career or an experienced professional seeking your next challenge, Talent Carpet connects you with leading employers across multiple industries.
              </p>
              <p className="text-slate-600 dark:text-light/80 text-base sm:text-lg leading-relaxed max-w-2xl mt-4">
                Our recruitment experts work closely with candidates to understand their career goals and help them secure opportunities that align with their skills, experience, and aspirations.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.2} className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/careers"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-md inline-flex items-center space-x-2 animate-pulse"
              >
                <UploadCloud size={16} />
                <span>Apply for Job</span>
              </Link>
              <a
                href="https://wa.me/919677070837?text=Hi%20Talent%20Carpet,%20I'm%20a%20candidate%20looking%20for%20jobs"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-slate-105 dark:bg-primary-dark border border-slate-200 dark:border-light-dark/25 text-slate-800 dark:text-light px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 inline-flex items-center space-x-2"
              >
                <PhoneCall size={16} className="text-secondary" />
                <span>Consult with Recruiter</span>
              </a>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="right" delay={0.15}>
              <div className="relative rounded-3xl overflow-hidden shadow-premium border border-slate-200 dark:border-light-dark/10 h-[420px] group">
                <img
                  src="/candidate1.jpg"
                  alt="Candidate preparing for interview"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent pointer-events-none" />
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Opportunities Across Industries */}
        <div className="mb-24">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-light">
                Opportunities Across Industries
              </h2>
              <p className="text-slate-500 dark:text-light/60 mt-4">
                We place qualified professionals in leading roles across primary industry segments.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {industries.map((ind, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-[#1E378B] hover:bg-[#162A6B] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 flex items-center space-x-5 border border-[#1E378B] cursor-pointer group"
                >
                  {/* Left Vibrant Icon Badge */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl ${ind.badgeBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    {ind.icon}
                  </div>

                  {/* Right Text */}
                  <div className="flex-1">
                    <h4 className="text-white font-extrabold text-lg sm:text-xl font-serif leading-snug tracking-tight">
                      {ind.name}
                    </h4>
                    <p className="text-white/80 text-xs sm:text-sm mt-1 leading-relaxed font-sans">
                      {ind.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Why Job Seekers Choose Us */}
        <div className="mb-24 bg-white/40 dark:bg-primary-dark/25 border border-slate-200 dark:border-light-dark/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-[10%] left-[10%] w-[250px] h-[250px] bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />

          <ScrollReveal>
            <div className="mb-12">
              <span className="text-[#1E378B] dark:text-[#75BB3F] font-extrabold text-xs uppercase tracking-widest block mb-2">FOR JOB SEEKERS & PROFESSIONALS</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-light">
                Our Candidate Services
              </h2>
              <p className="text-slate-500 dark:text-light/60 mt-3 max-w-2xl">
                We provide end-to-end career support from resume optimization to offer negotiation and successful onboarding.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 relative z-10">
            {candidateHighlights.map((highlight, idx) => (
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

        {/* Your Journey with Us (Matching Reference Diagram Layout) */}
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
                A simple, guided framework mapping from initial registration to your first day in office.
              </p>
            </div>
          </ScrollReveal>

          {/* Process Map Diagram */}
          <div className="relative max-w-6xl mx-auto px-4">

            {/* Continuous Horizontal Line Connector on Desktop */}
            <div className="hidden lg:block absolute top-[52px] left-[7%] right-[7%] h-[2px] bg-slate-300 dark:bg-slate-700 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-3 relative z-10">
              {journeySteps.map((step, idx) => (
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
              src="/success1.jpg"
              alt="Successful career transition"
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
              {successValues.map((val, idx) => (
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

        {/* Candidate Testimonials Section */}
        {candidateTestimonials.length > 0 && (
          <div className="mb-24">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="text-[#1E378B] dark:text-[#75BB3F] font-extrabold text-xs uppercase tracking-widest block mb-2">
                  CANDIDATE SUCCESS STORIES
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-light">
                  Candidate Testimonials
                </h2>
                <p className="text-slate-500 dark:text-light/70 mt-3 max-w-xl mx-auto text-sm">
                  Hear directly from job seekers and professionals who achieved major career growth through Talent Carpet.
                </p>
              </div>
            </ScrollReveal>

            <div className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 before:bg-gradient-to-r before:from-slate-50 before:to-transparent dark:before:from-[#0B132B]/80 after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 after:bg-gradient-to-l after:from-slate-50 after:to-transparent dark:after:from-[#0B132B]/80">
              <div
                ref={testimonialScrollRef}
                className={`flex overflow-x-auto scrollbar-none whitespace-normal space-x-6 py-4 px-6 items-stretch select-none cursor-grab active:cursor-grabbing ${candidateTestimonials.length <= 2 ? 'justify-center' : ''
                  }`}
                style={{ scrollBehavior: 'auto' }}
              >
                {displayCandidateTestimonials.map((test, idx) => (
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
                            <div className="w-11 h-11 rounded-full bg-secondary/15 text-secondary font-bold flex items-center justify-center shrink-0 text-sm">
                              {test.clientName?.[0]}
                            </div>
                          )}
                          <div>
                            <h4 className="text-slate-900 dark:text-light font-bold text-sm">{test.clientName}</h4>
                            {test.company && <p className="text-slate-500 dark:text-light/70 text-xs font-medium">{test.company}</p>}
                          </div>
                        </div>
                        <span className="text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-secondary/15 text-secondary border border-secondary/30">
                          Candidate
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
              {/*} <span className="text-secondary font-bold tracking-widest text-xs uppercase block">TAGLINE</span>*/}
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Discover careers that inspire growth and success.
              </h3>
              <p className="text-slate-350 dark:text-light/80 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                Take the next major step in your career. Upload your resume to our matching engine and our recruitment experts will reach out.
              </p>
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/careers"
                  className="bg-white hover:bg-slate-50 text-slate-900 font-bold px-8 py-3.5 rounded-xl transition-all duration-300 w-full sm:w-auto shadow-sm inline-flex items-center justify-center space-x-2"
                >
                  <UploadCloud size={16} />
                  <span>Apply for Job</span>
                </Link>
                <a
                  href="https://wa.me/919677070837?text=Hi%20Talent%20Carpet,%20I'm%20a%20candidate%20looking%20for%20jobs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-md inline-flex items-center space-x-2 w-full sm:w-auto justify-center"
                >
                  <PhoneCall size={16} />
                  <span>Consult with Experts (WhatsApp)</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};

export default ForCandidates;
