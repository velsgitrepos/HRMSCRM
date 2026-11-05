import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Users,
  Award,
  Zap,
  Globe2,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Star,
  ArrowRight,
  Phone,
  MessageCircle,
  Cpu,
  HeartPulse,
  Cog,
  ShoppingCart,
  DollarSign,
  GraduationCap,
  Plane,
  HandHelping,
  ArrowDown,
  Briefcase,
  MapPin,
  Mail,
} from 'lucide-react';
import { API_URL } from '../context/AuthContext';
import ScrollReveal from '../components/ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

// Animated count-up helper for stats
const CountUp = ({ value, duration = 2.5 }) => {
  const [count, setCount] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/^(\d+)(.*)$/);
    if (!match) {
      setCount(value);
      return;
    }

    const target = parseInt(match[1], 10);
    const suffix = match[2];

    let start = 0;
    const end = target;
    if (start === end) return;

    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const ease = 1 - (1 - progress) * (1 - progress);
      const current = Math.round(ease * end);

      setCount(current + suffix);

      if (frame >= totalFrames) {
        setCount(value);
        clearInterval(counter);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [value, duration, isInView]);

  const initialText = value.replace(/\d+/g, '0');

  return <span ref={ref} className="tabular-nums inline-block">{count || initialText}</span>;
};

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [careers, setCareers] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const heroSlides = [
    {
      badge: 'FOR EMPLOYERS',
      title: (
        <>
          <span className="text-[#75BB3F]">Hire Top</span> Talent Faster
        </>
      ),
      desc: 'Build core stability with pre-vetted full-time, contract, and executive personnel selected for long-term retention and organizational growth.',
      primaryBtnText: 'Hire Talent Today',
      primaryBtnUrl: 'https://wa.me/919677070837?text=Hi%20Talent%20Carpet,%20I\'m%20looking%20to%20hire%20talent',
      primaryBtnExternal: true,
      secondaryBtnText: 'Explore Solutions',
      secondaryBtnUrl: '/services/employers',
      image: '/employee1.jpg',
      establishedText: 'Trusted Since 2020',  
      floatingBg: 'bg-secondary/15 text-secondary',
    },
    {
      badge: 'FOR CANDIDATES',
      title: (
        <>
          Find Your Next <span className="text-[#75BB3F]">Career Opportunity</span>.
        </>
      ),
      desc: 'Connect with software engineers, executives, operations heads, and recruiters who match your precise long-term career aspirations.',
      primaryBtnText: 'Browse Job Openings',
      primaryBtnUrl: '/careers',
      primaryBtnExternal: false,
      secondaryBtnText: 'Upload Resume',
      secondaryBtnUrl: '/contact',
      image: '/success1.jpg',
      establishedText: 'Trusted Since 2020',
      floatingBg: 'bg-primary/15 text-primary',
    }
  ];

  const heroRef = useRef(null);
  const statsRef = useRef(null);

  // Preload key hero assets
  useEffect(() => {
    const imagesToPreload = ['/chhero.png', '/hero_hd.jpg', '/employee1.jpg', '/success1.jpg', '/logo 2.png'];
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Fetch Testimonials & Careers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const testRes = await axios.get(`${API_URL}/testimonials`);
        setTestimonials(testRes.data);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      }

      try {
        const careersRes = await axios.get(`${API_URL}/careers`);
        const sorted = careersRes.data
          .filter(job => job.status === 'Open')
          .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        setCareers(sorted);
      } catch (err) {
        console.error('Error fetching careers:', err);
      }
    };
    fetchData();
  }, []);

  const displayTestimonials = testimonials.length > 0 ? testimonials : [
    { clientName: 'Atla Tarun', company: 'Candidate', type: 'Candidate', rating: 5, review: 'I had a very good experience with Talent Carpet HR Solutions. The team was professional, supportive, and always responsive. They helped me to find the opportunity. I really appreciate their efforts and support.' },
    { clientName: 'Harshal Rajput', company: 'Candidate', type: 'Candidate', rating: 4, review: 'I had a very good experience with Talent Carpet HR Solutions. The team was professional, supportive, and responsive throughout the recruitment process. They provided clear communication, timely updates, and helpful guidance at every stage. I truly appreciate their efforts in making the entire process smooth and well-coordinated. Thank you to the Talent Carpet HR Solutions team for your valuable support and assistance. I would definitely recommend Talent Carpet HR Solutions to candidates looking for professional and reliable recruitment support.' },
    { clientName: 'Salman', company: 'Candidate', type: 'Candidate', rating: 5, review: 'I have a very good experience working with nivetha and talent carpet hr solutions they provided the job opportunities that aligned with my skillset and with their help and support i got the job and from there on i got the support from nivetha and she always have been in touch with me regarding any queries and time to time she made sure i did not have any problems in my current company and always follow up with me in case of any issue. I am very thankful for the support i received and wish good fortune for both nivetha and talent carpet hr solutions.' },
    { clientName: 'Sathish Kumar', company: 'Candidate', type: 'Candidate', rating: 5, review: 'My experience with Talent Carpet was very good. The team was supportive and helped me throughout the process. Thank you for your guidance and support in my career journey! 😊🙏' },
    { clientName: 'Revolite Infotech', company: 'Revolite Infotech', type: 'Employer', rating: 5, review: 'Thank you for reaching out. We’ve had a good experience working with Talent Carpet HR Solutions. Your team has been responsive, supportive, and quick to understand our requirements. The candidate quality and overall coordination have also been good.' }
  ];

  const displayTestimonialsList = displayTestimonials.length > 0
    ? [...displayTestimonials, ...displayTestimonials, ...displayTestimonials, ...displayTestimonials]
    : [];

  const testimonialScrollRef = useRef(null);

  // Auto-scroll Testimonials (Horizontal Marquee & Mobile Touch Fix)
  useEffect(() => {
    const el = testimonialScrollRef.current;
    if (!el || displayTestimonials.length === 0) return;
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

    const scrollSpeed = 0.6; // Smooth px per frame

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
  }, [testimonials]);

  const partnerScrollRef = useRef(null);

  const partnerLogos = [
    { name: 'JSW Group', src: '/JSW_Group_Logo.png' },
    { name: 'Grethena', src: '/grethenalogo1.png' },
    { name: 'Kavi Global', src: '/kavigloballogo.png' },
    { name: 'TransTech', src: '/logo_TT_new.png' },
    { name: 'Solique', src: '/soliquelogo.png' },
    { name: 'Tiger Analytics', src: '/tigeranalyticslogo.png' },
    { name: 'Tripund', src: '/tripund_logo.png' },
    { name: "Lafreight", src: "/lafreightlift.png" },
    { name: "JCB", src: "/jcb.png" },
    { name: "Leyland", src: "/logo.png" },
    { name: "mannai", src: "/mannai.webp" },
    { name: "QNB", src: "/QNB.png" }
  ];

  const displayPartnerLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos];

  // Auto-scroll Partner Logos ("Trusted By Leading Companies" Horizontal Marquee & Mouse Drag/Touch)
  useEffect(() => {
    const el = partnerScrollRef.current;
    if (!el) return;
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

    const scrollSpeed = 0.6; // Smooth px per frame

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
  }, []);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats trigger animation
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);





  const stats = [
    { number: "100+", label: 'Candidates Placed', icon: <TrendingUp size={20} /> },
    { number: '20+', label: 'Hiring Partners', icon: <Users size={20} /> },
    { number: '95%', label: 'Client Satisfaction', icon: <Globe2 size={20} /> },
    { number: '8+', label: 'Industries Served', icon: <Award size={20} /> },
  ];

  const whyChooseItems = [
    {
      title: 'Industry-Specialized Recruiters',
      description: 'Our consultants specialize in different industries and functional domains, allowing us to understand your hiring requirements in depth and identify candidates with the right technical expertise and cultural fit.',
      icon: <Users size={28} className="text-secondary" />,
    },
    {
      title: 'Faster Hiring Process',
      description: 'Time is critical when hiring. Our streamlined sourcing, screening, and interview coordination process helps reduce recruitment timelines without compromising quality.',
      icon: <Zap size={28} className="text-primary" />,
    },
    {
      title: 'Quality Over Quantity',
      description: 'Rather than overwhelming clients with resumes, we present carefully shortlisted candidates who have already been evaluated for technical skills, experience, communication, and career aspirations.',
      icon: <ShieldCheck size={28} className="text-secondary" />,
    },
    {
      title: 'Access to Passive Talent',
      description: 'Some of the best professionals aren\'t actively looking for jobs. Through our extensive talent network, we connect employers with highly qualified passive candidates who are often unavailable on traditional job portals.',
      icon: <Globe2 size={28} className="text-primary" />,
    },
    {
      title: 'Personalized Recruitment Strategy',
      description: 'Every organization has unique hiring needs. We tailor our recruitment approach based on your company size, industry, hiring urgency, budget, and long-term workforce strategy.',
      icon: <Award size={28} className="text-secondary" />,
    },
    {
      title: 'Long-Term Hiring Partner',
      description: 'We don\'t just close positions—we build relationships. Our focus is on helping organizations grow with sustainable recruitment solutions that support long-term business success.',
      icon: <TrendingUp size={28} className="text-primary" />,
    },
  ];

  const servicesPreview = [
    {
      title: 'End-to-End Recruitment',
      desc: 'Comprehensive lifecycle recruitment from initial talent sourcing and evaluation to offer management and onboarding.',
      image: '/end to end.jpg',
      icon: <Briefcase size={30} className="text-[#75BB3F]" />,
    },
    {
      title: 'IT & Non-IT Hiring',
      desc: 'Specialized domain hiring covering software engineering, AI, DevOps, finance, operations, healthcare, and industrial sectors.',
      image: 'it.jpg',
      icon: <Cpu size={30} className="text-[#75BB3F]" />,
    },
    {
      title: 'Permanent & Contract Staffing',
      desc: 'Flexible workforce models providing long-term permanent placements alongside compliant contract personnel.',
      image: "/contract staffing.jpg",
      icon: <Users size={30} className="text-[#75BB3F]" />,
    },
    {
      title: 'Executive & Lateral Hiring',
      desc: 'Strategic headhunting for senior leadership, executive officers, VPs, and lateral domain specialists.',
      image: 'executive.jpg',
      icon: <Award size={30} className="text-[#75BB3F]" />,
    },
    {
      title: 'Talent Sourcing & Screening',
      desc: 'Rigorous multi-stage vetting, background verification, and skill matrix evaluation to present top-tier candidates.',
      image: 'talent sourcing.jpg',
      icon: <ShieldCheck size={30} className="text-[#75BB3F]" />,
    },
    {
      title: 'Candidate Assessment & Interview Coordination',
      desc: 'End-to-end interview scheduling, technical evaluation coordination, feedback collection, and candidate alignment.',
      image: 'candidate assesment.jpg',
      icon: <Zap size={30} className="text-[#75BB3F]" />,
    },
  ];

  /* const recruitmentSteps = [
     {
       number: '01',
       title: 'Requirement Consultation',
       desc: 'We begin by understanding your business, company culture, technical requirements, hiring priorities, and long-term workforce goals.',
     },
     {
       number: '02',
       title: 'Talent Mapping & Market Research',
       desc: 'Our recruiters analyze the talent market to identify the most suitable sourcing strategy.',
     },
     {
       number: '03',
       title: 'Candidate Sourcing',
       desc: 'We leverage our extensive talent database, professional networks, referrals, job portals, and targeted outreach to identify qualified candidates.',
     },
     {
       number: '04',
       title: 'Candidate Screening',
       desc: 'Each applicant undergoes comprehensive screening covering technical skills, industry experience, communication abilities, career aspirations, and cultural compatibility.',
     },
     {
       number: '05',
       title: 'Interview Coordination',
       desc: 'We schedule interviews, collect feedback, manage communication, and ensure a smooth hiring experience for both employers and candidates.',
     },
     {
       number: '06',
       title: 'Offer Management',
       desc: 'Our team assists with salary negotiations, offer acceptance, documentation, and onboarding coordination.',
     },
     {
       number: '07',
       title: 'Post-Placement Support',
       desc: 'Our relationship continues after hiring, ensuring successful onboarding and long-term employee retention.',
     },
   ];*/

  const industries = [
    { name: 'IT & Software Engineering', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=300' },
    { name: 'Banking & Financial Services (BFSI)', image: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&q=80&w=300' },
    { name: 'Fintech & Digital Payments', image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=300' },
    { name: 'Healthcare & Lifesciences', image: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=300' },
    { name: 'E-commerce & Smart Retail', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=300' },
    { name: 'Logistics, Supply Chain & FMCG', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=300' },
  ];

  const industriesList = [
    { name: 'Technology & IT Services', icon: <Cpu size={24} /> },
    { name: 'Healthcare Services', icon: <HeartPulse size={24} /> },
    { name: 'Manufacturing', icon: <Cog size={24} />, },
    { name: 'Retail & E-commerce', icon: <ShoppingCart size={24} /> },
    { name: 'Finance & Banking', icon: <DollarSign size={24} /> },
    { name: 'Education & Training', icon: <GraduationCap size={24} /> },
    { name: 'Hospitality & Tourism', icon: <Plane size={24} /> },
    { name: 'Nonprofit & NGOs', icon: <HandHelping size={24} /> },
  ];

  const apartItems = [
    'Industry-focused recruitment specialists',
    'Extensive candidate database',
    'Quality-first screening process',
    'Transparent communication',
    'Fast turnaround time',
    'Long-term hiring partnerships',
    'Nationwide recruitment support'
  ];

  return (
    <div className="bg-light dark:bg-primary transition-colors duration-300" ref={heroRef}>

      {/* SECTION 1: HERO BANNER (Fully Responsive Across All Viewports & Monitors) */}
      <section
        className="relative min-h-[100svh] min-h-[650px] sm:min-h-[720px] lg:min-h-screen flex flex-col justify-between pt-24 sm:pt-36 lg:pt-44 xl:pt-48 pb-12 sm:pb-14 lg:pb-16 px-4 sm:px-6 lg:px-10 overflow-hidden bg-cover bg-center sm:bg-[center_20%] lg:bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(11, 19, 43, 0.86) 0%, rgba(11, 19, 43, 0.75) 60%, rgba(15, 23, 42, 0.92) 100%), url("/chhero.png")`
        }}
      >
        {/* Decorative subtle background ambient glows */}
        <div className="absolute top-[10%] right-[10%] w-[380px] h-[380px] rounded-full blur-[140px] pointer-events-none bg-[#75BB3F]/15 animate-float-blob" />
        <div className="absolute bottom-[10%] left-[5%] w-[420px] h-[420px] rounded-full blur-[160px] pointer-events-none bg-[#1E378B]/25 animate-float-blob-reverse" />

        <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto w-full relative z-10 flex-grow flex flex-col justify-center my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Refined Display Headline & CTA Controls */}
            <div className="lg:col-span-9 text-left flex flex-col items-start">

              {/* Eyebrow Pill */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center space-x-2 border bg-white/10 border-white/20 text-white px-3.5 py-1.5 rounded-full mb-5 backdrop-blur-md shadow-sm"
              >
                <span className="w-2 h-2 rounded-full animate-ping bg-[#75BB3F]" />
                <span className="text-[10px] sm:text-[11px] 2xl:text-xs font-extrabold tracking-widest uppercase text-slate-200">
                  RECRUITMENT & TALENT MANAGEMENT SOLUTIONS
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl 2xl:text-[4rem] font-extrabold tracking-tight text-white leading-[1.15] mb-5 font-sans"
              >
                Smarter Recruitment &<br className="hidden sm:inline" />
                <span className="text-[#75BB3F]">Staffing Solutions</span>
              </motion.h1>

              {/* Subtitle Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm sm:text-base md:text-lg xl:text-xl text-slate-200/90 max-w-lg xl:max-w-xl 2xl:max-w-2xl mb-7 font-normal leading-relaxed"
              >
                Connecting businesses with skilled talent for full-time, contract, and executive roles.
              </motion.p>

              {/* Primary & Secondary Action CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-8 lg:mb-0"
              >
                <Link
                  to="/contact"
                  className="w-full sm:w-auto bg-[#75BB3F] hover:bg-[#64a434] text-white font-extrabold px-7 py-3.5 2xl:px-8 2xl:py-4 rounded-full transition-all duration-300 shadow-lg shadow-[#75BB3F]/30 hover:scale-105 active:scale-95 inline-flex items-center justify-center space-x-2 text-xs sm:text-sm 2xl:text-base tracking-wider uppercase"
                >
                  <span>Hire Talent Now</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/services/employers"
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-7 py-3.5 2xl:px-8 2xl:py-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center justify-center text-xs sm:text-sm 2xl:text-base tracking-wider uppercase backdrop-blur-md"
                >
                  <span>Explore Solutions</span>
                </Link>
              </motion.div>

            </div>

          </div>
        </div>

        {/* Bottom Hero Trust & Review Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-7xl 2xl:max-w-[1400px] mx-auto w-full relative z-10 pt-6 border-t border-white/15 mt-6"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Left Rating & Avatars cluster */}
            <div className="flex items-center space-x-3.5">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-[#0B132B] object-cover" src="/employee1.jpg" alt="Client 1" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-[#0B132B] object-cover" src="/candidate1.jpg" alt="Client 2" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-[#0B132B] object-cover" src="/employee.jpg" alt="Client 3" />
                <div className="inline-flex items-center justify-center h-9 w-9 rounded-full ring-2 ring-[#0B132B] bg-[#75BB3F] text-white font-extrabold text-xs">
                  +
                </div>
              </div>

              <div className="flex flex-col text-left">
                <div className="flex items-center space-x-1.5">
                  <span className="text-white font-black text-lg leading-none">4.9</span>
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <span className="text-[10px] text-slate-300 font-semibold tracking-wider uppercase mt-0.5">
                  Based on 150+ Reviews
                </span>
              </div>
            </div>

            {/* Right Tag Highlight */}
            <div className="flex items-center space-x-2 text-white font-bold text-xs sm:text-sm tracking-wide">
              <span className="w-2 h-2 rounded-sm bg-[#75BB3F] inline-block shrink-0" />
              <span>Effective Talent Management & 48-Hour Shortlists</span>
            </div>

          </div>
        </motion.div>

      </section>

      {/* SECTION 2: STATS BANNER */}
      <section ref={statsRef} className="py-8 bg-[#F6F9FA] border-y border-slate-100 transition-colors duration-300 relative overflow-hidden">
        {/* Subtle background glow blobs */}
        <div className="absolute -top-[30%] right-[10%] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-[30%] left-[5%] w-[280px] h-[280px] bg-primary/5 rounded-full blur-[90px] pointer-events-none" />

        {/* Stats Grid */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="stat-card py-4 px-4 sm:px-6 rounded-2xl flex flex-col items-center justify-center text-center group border border-slate-200/60 bg-white shadow-sm hover:border-secondary/40 hover:shadow-glow-secondary transition-all duration-300"
              style={{ backfaceVisibility: 'hidden', transform: 'translate3d(0,0,0)' }}
            >
              <div
                className="mb-2 w-10 h-10 group-hover:scale-110 transition-all duration-300 flex items-center justify-center rounded-xl border text-current [&>svg]:text-current [&>svg]:stroke-current"
                style={{
                  background: idx % 2 === 0 ? 'rgba(117, 187, 63, 0.12)' : 'rgba(30, 55, 139, 0.12)',
                  borderColor: idx % 2 === 0 ? 'rgba(117, 187, 63, 0.25)' : 'rgba(30, 55, 139, 0.25)',
                  color: idx % 2 === 0 ? '#75BB3F' : '#1E378B'
                }}
              >
                {stat.icon}
              </div>
              <span
                className="text-2xl sm:text-3xl font-extrabold text-primary block mb-0.5 tabular-nums inline-block"
                style={{ backfaceVisibility: 'hidden', transform: 'translate3d(0,0,0)' }}
              >
                <CountUp value={stat.number} />
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-200/60 dark:bg-light-dark/10 my-8 relative z-10 max-w-7xl mx-auto px-6" />

        {/* Trusted Partners Ticker with Smooth Entrance Animation & Continuous Marquee Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full relative z-10 mt-4"
        >
          <div className="text-center mb-6">
            <span className="text-[15px] font-extrabold uppercase tracking-widest text-[#1E378B] dark:text-[#75BB3F]">
              Trusted By Leading Companies
            </span>
          </div>

          <div className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 sm:before:w-32 before:bg-gradient-to-r before:from-[#F6F9FA] dark:before:from-[#0F1C3F] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 sm:after:w-32 after:bg-gradient-to-l after:from-[#F6F9FA] dark:after:from-[#0F1C3F] after:to-transparent">
            <div
              ref={partnerScrollRef}
              className="flex overflow-x-auto scrollbar-none items-center space-x-12 sm:space-x-16 py-4 select-none cursor-grab active:cursor-grabbing"
              style={{ scrollBehavior: 'auto' }}
            >
              {displayPartnerLogos.map((logo, idx) => (
                <div key={idx} className="shrink-0 flex items-center justify-center h-12 w-32 sm:w-36 opacity-85 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-h-9 max-w-full object-contain pointer-events-none filter drop-shadow-sm select-none"
                    draggable="false"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: ABOUT PREVIEW */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-primary-dark/20 border-y border-slate-200 dark:border-light-dark/10 transition-colors duration-300 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Visual Frame Decorator */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-secondary pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-primary pointer-events-none" />

            <img
              src="About1.jpg"
              alt="Premium office environment"
              loading="lazy"
              className="rounded-3xl shadow-premium border border-slate-200 dark:border-light-dark/10 relative z-10 w-full object-cover h-[450px]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-6"
          >
            <span className="text-secondary font-bold tracking-widest text-sm uppercase">
              Why Talent Carpet?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-light leading-tight">
              Connecting Talent with <span className="text-primary">Opportunity</span>
            </h2>
            <p className="text-slate-600 dark:text-light/80 leading-relaxed">
              We believe recruitment is more than filling vacancies—it's about creating meaningful connections between talented professionals and organisations that help them grow.
            </p>
            <p className="text-slate-600 dark:text-light/80 leading-relaxed">
              With experienced recruiters, industry expertise, and a people-first approach, Talent Carpet delivers recruitment solutions that benefit both employers and candidates.
            </p>
            <div className="pt-4">
              <Link to="/about" className="glow-btn-blue inline-flex items-center space-x-2">
                <span>Discover Our Story</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            <div className="border-t border-slate-200 dark:border-light-dark/10 pt-6 mt-4">
              <h4 className="text-lg font-bold text-slate-900 dark:text-light mb-4">
                What Sets Us Apart
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {apartItems.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-slate-600 dark:text-light/85 text-sm font-semibold">
                    <ChevronRight size={14} className="text-secondary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </section>


      {/* SECTION 4: WHY CHOOSE US */}
      <section className="py-24 px-6 relative transition-colors duration-300" style={{ background: '#112361' }}>
        {/* Subtle background glow blobs */}
        <div className="absolute -top-[20%] right-[5%] w-[350px] h-[350px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-[20%] left-[5%] w-[300px] h-[300px] bg-primary/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Why Companies Choose Talent Carpet
              </h2>
              <p className="mt-4" style={{ color: '#c8d0e0' }}>
                We stand apart from general recruiting agencies by deploying sophisticated search architectures and customized candidate evaluation matrixes.
              </p>
            </div>
          </ScrollReveal>

          {/* 6 vibrant chip backgrounds matching brand colors, one per card */}
          {(() => {
            const chipStyles = [
              { bg: 'linear-gradient(135deg, #75BB3F 0%, #5C9430 100%)', border: 'rgba(117,187,63,0.4)' },   // brand leaf green
              { bg: 'linear-gradient(135deg, #1E378B 0%, #314FA7 100%)', border: 'rgba(49,79,167,0.5)' },    // brand royal blue
              { bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'rgba(16,185,129,0.4)' },   // emerald green
              { bg: 'linear-gradient(135deg, #0284c7 0%, #1E378B 100%)', border: 'rgba(2,132,199,0.5)' },    // sky→blue
              { bg: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)', border: 'rgba(132,204,22,0.4)' },   // lime green
              { bg: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)', border: 'rgba(99,102,241,0.5)' },   // indigo
            ];
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {whyChooseItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="p-8 rounded-3xl border border-white/10 hover:border-secondary/40 hover:translate-y-[-4px] transition-all duration-300 flex space-x-6"
                    style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}
                  >
                    <div
                      className="w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center shadow-md"
                      style={{
                        background: chipStyles[idx]?.bg,
                        border: `1.5px solid ${chipStyles[idx]?.border}`,
                        color: '#ffffff'
                      }}
                    >
                      <span className="text-white [&>svg]:text-white [&>svg]:stroke-white">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#b8c4d8' }}>{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* SECTION 5: OUR SERVICES */}
      <section className="py-24 px-6 relative bg-gradient-to-b from-white via-[#EBF1F6] to-white dark:from-primary dark:via-primary-dark/40 dark:to-primary transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16">
              <div className="max-w-2xl">
                <span className="text-secondary font-bold tracking-widest text-sm uppercase block mb-3">
                  SERVICES PORTFOLIO
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-light">
                  Bespoke HR Solutions For Enterprise Scale
                </h2>
              </div>
              <Link
                to="/services/employers"
                className="text-secondary font-semibold hover:text-primary dark:hover:text-light mt-4 md:mt-0 inline-flex items-center space-x-1 group"
              >
                <span>View Core Services</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {servicesPreview.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="relative overflow-hidden rounded-2xl h-60 sm:h-64 lg:h-72 shadow-md group cursor-pointer border border-slate-200/70 bg-white transition-all duration-1000 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Background Image with Smooth Zoom */}
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 group-hover:opacity-10 transition-all duration-1000 ease-out"
                />

                {/* Dark Gradient Overlay that morphs into Pure White (#FFFFFF) on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/65 to-slate-950/45 group-hover:bg-none group-hover:bg-[#FFFFFF] transition-all duration-1000" />

                {/* Initial Default Center Content (Logo Blue Icon & White Title) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center z-10 transition-all duration-1000 group-hover:opacity-0 group-hover:scale-95">
                  <div className="mb-3 text-[#1E378B] drop-shadow-md">
                    {service.icon}
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg tracking-tight leading-snug drop-shadow-md">
                    {service.title}
                  </h3>
                </div>

                {/* Hover Revealed Content (Pure White Background & Black Text) */}
                <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-1000 transform translate-y-3 group-hover:translate-y-0">
                  <div>
                    <h3 className="text-black font-extrabold text-base sm:text-lg font-sans mb-2 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-black text-xs leading-relaxed line-clamp-3 font-medium">
                      {service.desc}
                    </p>
                  </div>

                  {/* Logo Royal Blue Pill Button (#1E378B) */}
                  <Link
                    to="/services/employers"
                    className="inline-flex items-center space-x-2 text-[11px] sm:text-xs font-extrabold px-5 py-2 rounded-full bg-[#1E378B] text-white hover:bg-[#112361] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 group/btn w-fit uppercase tracking-wider mt-2"
                  >
                    <span>Explore Services</span>
                    <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: HR SOLUTIONS FOR EVERY INDUSTRY (Industries Served - Dark Theme Layout) */}
      <section className="py-24 px-6 bg-[#141414] dark:bg-[#0B0F19] text-white relative overflow-hidden transition-colors duration-300">
        {/* Subtle Topographical Line Watermark / Soft Gradient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#75BB3F]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -top-[100px] -right-[100px] w-[400px] h-[400px] bg-[#1E378B]/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Topographical Line Overlay SVG pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="topo" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 Q25 25 50 50 T100 50" fill="none" stroke="#ffffff" strokeWidth="0.5" />
              <path d="M0 20 Q35 70 70 20 T140 20" fill="none" stroke="#ffffff" strokeWidth="0.5" />
              <path d="M0 80 Q15 40 60 80 T120 80" fill="none" stroke="#ffffff" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#topo)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Centered Top Badge & Title */}
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block bg-[#75BB3F]/15 border border-[#75BB3F]/40 text-[#75BB3F] text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                INDUSTRIES
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Industries Served
              </h2>
            </div>
          </ScrollReveal>

          {/* 4 Columns x 2 Rows Grid of 8 Industry Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {industriesList.map((ind, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.06}>
                <div className="group p-6 transition-all duration-300 flex flex-col items-center text-center cursor-pointer hover:-translate-y-1.5 h-full justify-center">
                  <div className="flex flex-col items-center">
                    {/* Glowing Line Icon with Mirror Flip Animation & No Border */}
                    <div className="mb-5 flex items-center justify-center text-[#75BB3F] transition-all duration-500 transform group-hover:scale-x-[-1] group-hover:scale-110">
                      {ind.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-white group-hover:text-[#75BB3F] font-bold text-xl transition-colors duration-300">
                      {ind.name}
                    </h3>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom Centered Green Pill Action Button */}
          {/*}  <ScrollReveal delay={0.3}>
            <div className="text-center">
              <Link
                to="/services/employers"
                className="bg-[#75BB3F] hover:bg-[#62A032] text-slate-950 font-bold px-9 py-4 rounded-full shadow-lg shadow-[#75BB3F]/20 hover:scale-105 active:scale-100 inline-flex items-center space-x-2 transition-all duration-300 cursor-pointer text-sm"
              >
                <span>View All Categories</span>
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </Link>
            </div>
          </ScrollReveal>*/}
        </div>
      </section>

      {false && (<section className="py-24 bg-gradient-to-b from-white via-[#F4F9F0] to-white dark:from-primary dark:via-primary-dark/30 dark:to-primary border-y border-slate-200 dark:border-light-dark/10 px-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Centered Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal>
              <span className="text-secondary font-bold tracking-widest text-sm uppercase block mb-3">OUR RECRUITMENT PROCESS</span>
              <div className="inline-flex items-center space-x-2 border border-slate-200 dark:border-light-dark/20 px-4 py-2 rounded-full shadow-sm bg-slate-50 dark:bg-primary-dark">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-secondary animate-ping" />
                <span className="text-xs text-slate-800 dark:text-light tracking-wider uppercase font-bold">RECRUITMENT PROCESS</span>
              </div>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left Column: Title and Image */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start space-y-6">
              <ScrollReveal direction="left" delay={0.1}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-light tracking-tight leading-[1.15]">
                  A Structured Hiring <br />
                  Process Designed <br />
                  for Success
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="left" delay={0.2}>
                <div className="relative rounded-3xl overflow-hidden shadow-premium border border-slate-200 dark:border-light-dark/10 h-[450px]">
                  <img
                    src="process.jpg"
                    alt="How we work illustration"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Timeline */}
            <div className="lg:col-span-7 relative pl-4 sm:pl-8">
              {/* Timeline Vertical Line */}
              <div className="absolute left-[23px] sm:left-[39px] top-4 bottom-4 w-[2px] bg-secondary" />

              <div className="space-y-8 relative">
                {recruitmentSteps.map((step, idx) => (
                  <div key={idx} className="relative pl-12 sm:pl-16">
                    {/* Node Dot on Timeline */}
                    <div className={`absolute left-[3px] sm:left-[19px] top-[26px] sm:top-[38px] w-[11px] h-[11px] rounded-full z-10 border border-white dark:border-primary-dark ${idx % 2 === 0 ? 'bg-primary' : 'bg-secondary'}`} />

                    {/* Horizontal Line Connector */}
                    <div className={`absolute left-[14px] sm:left-[30px] top-[31px] sm:top-[43px] w-[20px] sm:w-[24px] h-[1px] ${idx % 2 === 0 ? 'bg-primary/30' : 'bg-secondary/30'}`} />

                    <ScrollReveal direction="right" delay={idx * 0.08}>
                      <div className={`p-6 sm:p-8 rounded-2xl border-l-4 bg-white/75 dark:bg-primary-dark/45 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:bg-white dark:hover:bg-primary-dark/60 transition-all duration-300 ${idx % 2 === 0 ? 'border-l-primary' : 'border-l-secondary'
                        }`}>
                        <div className="flex flex-col space-y-3">
                          {/* Step Label (Logo color circle down arrow + text) */}
                          <div className="flex items-center space-x-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0 ${idx % 2 === 0 ? 'bg-primary' : 'bg-secondary'}`}>
                              <ArrowDown size={10} strokeWidth={3} />
                            </div>
                            <span className="text-[11px] font-extrabold tracking-widest text-slate-800 dark:text-light/90 uppercase">
                              STEP _ {step.number}
                            </span>
                          </div>

                          {/* Step Title */}
                          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-light font-serif">
                            {step.title}
                          </h3>

                          {/* Step Description */}
                          <p className="text-slate-500 dark:text-light/75 text-sm sm:text-base leading-relaxed max-w-2xl">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
      )}

      {/* SECTION: FEATURED JOBS */}
      <section className="py-24 bg-gradient-to-b from-[#F0F4F8] to-[#E5EDF4] dark:from-primary-dark/20 dark:to-primary-dark/30 border-b border-slate-200 dark:border-light-dark/10 px-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">

          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16">
              <div className="max-w-2xl">
                <span className="text-secondary font-bold tracking-widest text-sm uppercase block mb-3">
                  EXPLORE OPENINGS
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-light">
                  Featured Opportunities
                </h2>
                <p className="text-slate-600 dark:text-light/80 mt-4 font-semibold">
                  Discover hot vacancies across tech, logistics, and consulting verticals. Apply directly with your resume.
                </p>
              </div>
              <Link
                to="/careers"
                className="text-secondary font-semibold hover:text-primary dark:hover:text-light mt-4 md:mt-0 inline-flex items-center space-x-1 group"
              >
                <span>View All Job Openings</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(careers.length > 0 ? careers.slice(0, 6) : [
              {
                jobTitle: 'Senior Full Stack Engineer (React/Node)',
                location: 'Bangalore (Hybrid)',
                experience: '5 - 8 Years',
                employmentType: 'Full-time',
                applyEmail: 'mubeen@talentcarpet.com',
                description: 'We are looking for a Senior Full Stack Engineer experienced with modern Javascript/Typescript architectures, React, Node.js, and cloud systems.'
              },
              {
                jobTitle: 'Technical Recruiter',
                location: 'Chennai (Onsite)',
                experience: '2 - 5 Years',
                employmentType: 'Full-time',
                applyEmail: 'mubeen@talentcarpet.com',
                description: 'Join our elite staffing consulting group sourcing and matching industry leaders for global IT clients and rising startup unicorns.'
              },
              {
                jobTitle: 'DevOps & Cloud Specialist',
                location: 'Remote',
                experience: '4 - 7 Years',
                employmentType: 'Full-time',
                applyEmail: 'mubeen@talentcarpet.com',
                description: 'Responsible for optimizing CI/CD deployment pipelines, managing AWS cloud infrastructure architectures, and maintaining system high-availability.'
              },
              {
                jobTitle: 'HR Operations Executive',
                location: 'Chennai (Onsite)',
                experience: '1 - 3 Years',
                employmentType: 'Full-time',
                applyEmail: 'mubeen@talentcarpet.com',
                description: 'Manage day-to-day employee lifecycle tasks, payroll compliance audits, background checks, and onboarding coordinates.'
              },
              {
                jobTitle: 'Business Development Manager',
                location: 'Bangalore (Onsite)',
                experience: '3 - 6 Years',
                employmentType: 'Full-time',
                applyEmail: 'mubeen@talentcarpet.com',
                description: 'Drive client acquisition pipelines, negotiate service level agreements, and expand partnerships with tech start-ups and enterprises.'
              },
              {
                jobTitle: 'Quality Assurance Engineer',
                location: 'Remote',
                experience: '2 - 4 Years',
                employmentType: 'Full-time',
                applyEmail: 'mubeen@talentcarpet.com',
                description: 'Write robust automated tests, identify layout and functional bugs, and collaborate with developers to ensure launch readiness.'
              }
            ]).map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                className="group relative overflow-hidden p-6 rounded-2xl bg-white dark:bg-primary-dark/60 border border-slate-200/80 dark:border-light-dark/10 hover:border-[#75BB3F] dark:hover:border-[#75BB3F] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full hover:shadow-xl hover:shadow-[#75BB3F]/20 cursor-pointer"
              >
                {/* Top Accent Line in #75BB3F on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#75BB3F] transition-all duration-300 transform origin-left scale-x-0 group-hover:scale-x-100" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary-dark/80 flex items-center justify-center text-primary dark:text-secondary border border-primary/20 dark:border-light-dark/5">
                      <Briefcase size={18} />
                    </div>
                    <span className="bg-secondary/15 text-secondary px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                      {job.employmentType}
                    </span>
                  </div>

                  <h3 className="text-slate-900 dark:text-light text-lg font-bold mb-2 line-clamp-1 font-serif">
                    {job.jobTitle}
                  </h3>

                  <p className="text-slate-500 dark:text-light/75 text-xs leading-relaxed mb-4 line-clamp-2">
                    {job.description}
                  </p>
                </div>

                <div className="border-t border-slate-200 dark:border-light-dark/10 pt-4 space-y-2">
                  <div className="flex items-center text-[11px] text-slate-500 dark:text-light/70 font-semibold">
                    <MapPin size={13} className="mr-2 text-secondary shrink-0" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-[11px] text-slate-500 dark:text-light/70 font-semibold">
                    <Award size={13} className="mr-2 text-primary shrink-0" />
                    <span>Exp: {job.experience}</span>
                  </div>

                  <a
                    href={`mailto:${job.applyEmail}?subject=Application for ${job.jobTitle}`}
                    className={`w-full text-center py-2.5 rounded-xl text-white font-bold text-xs transition-all duration-300 shadow-sm block mt-4 hover:scale-105 active:scale-95 ${idx % 2 === 0 ? 'bg-primary hover:bg-[#152762]' : 'bg-secondary hover:bg-[#5C9430]'
                      }`}
                  >
                    Apply Now
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>





      {/* SECTION 9: TESTIMONIALS */}
      {displayTestimonials.length > 0 && (
        <section className="py-16 px-6 relative overflow-hidden bg-slate-50 dark:bg-primary-dark/15 border-t border-slate-200 dark:border-light-dark/10 transition-colors duration-300">
          {/* Logo blue glowing background elements */}
          <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-primary/8 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-primary/8 rounded-full blur-[110px] pointer-events-none" />

          {/* Giant background transparent quotation marks */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[280px] sm:text-[340px] font-serif font-extrabold text-primary/5 dark:text-light/5 pointer-events-none select-none leading-none z-0 hidden md:block">
            &ldquo;
          </div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[280px] sm:text-[340px] font-serif font-extrabold text-primary/5 dark:text-light/5 pointer-events-none select-none leading-none z-0 hidden md:block">
            &rdquo;
          </div>

          <div className="max-w-7xl mx-auto relative z-10 mb-8">
            <ScrollReveal>
              <div className="text-center">
                <span className="text-secondary font-bold tracking-widest text-sm uppercase block mb-3">
                  TRUSTED BY LEADING BRANDS
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-light">
                  Client Testimonials
                </h2>
              </div>
            </ScrollReveal>
          </div>

          <div className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 before:bg-gradient-to-r before:from-slate-50 before:to-transparent dark:before:from-[#112361]/20 after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 after:bg-gradient-to-l after:from-slate-50 after:to-transparent dark:after:from-[#112361]/20">
            <div
              ref={testimonialScrollRef}
              className={`flex overflow-x-auto scrollbar-none whitespace-normal space-x-8 py-4 px-12 items-stretch select-none cursor-grab active:cursor-grabbing ${displayTestimonials.length <= 2 ? 'justify-center' : ''
                }`}
              style={{ scrollBehavior: 'auto' }}
            >
              {displayTestimonialsList.map((test, idx) => (
                <div
                  key={idx}
                  className={`w-[300px] sm:w-[340px] shrink-0 glass-card rounded-2xl p-4 sm:p-5 relative overflow-hidden border border-transparent shadow-sm bg-white/90 dark:bg-primary-dark/45 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between select-none group ${idx % 2 === 0 ? 'hover:border-primary/50' : 'hover:border-secondary/50'
                    }`}
                >
                  {/* Top brand-colored bar shown on hover */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 transform origin-left scale-x-0 group-hover:scale-x-100 ${idx % 2 === 0 ? 'bg-primary' : 'bg-secondary'
                    }`} />

                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex">
                        {[...Array(Math.round(test.rating) || 5)].map((_, i) => (
                          <Star key={i} size={13} className="text-amber-400 fill-amber-400 mx-0.5" />
                        ))}
                      </div>
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${(test.type || 'Employer') === 'Candidate'
                        ? 'bg-secondary/15 text-secondary border border-secondary/30'
                        : 'bg-primary/10 text-primary dark:bg-primary-light/20 dark:text-light border border-primary/20'
                        }`}>
                        {test.type || 'Employer'}
                      </span>
                    </div>
                    <blockquote className="text-xs sm:text-sm leading-snug text-slate-700 dark:text-light/95 italic mb-3.5">
                      "{test.review}"
                    </blockquote>
                  </div>
                  <div className="border-t border-slate-200/50 dark:border-light-dark/10 pt-2.5 flex flex-col">
                    <span className="text-slate-900 dark:text-light font-bold text-xs">{test.clientName}</span>
                    <span className="text-slate-500 dark:text-light/60 text-[10px] font-semibold uppercase tracking-wider mt-0.5">{test.company}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 10: CALL TO ACTION */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal duration={0.8}>
            <div
              className="relative rounded-3xl overflow-hidden py-12 sm:py-20 px-16 sm:px-28 text-center shadow-premium"
              style={{ background: 'linear-gradient(135deg, #0f1c3f 0%, #1a2f6e 50%, #0f1c3f 100%)' }}
            >
              {/* Soft radial glow in center */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 65%)' }} />

              <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Let's Build Your Dream Team Together
                </h2>
                <p className="sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  Whether you're looking to hire exceptional professionals or searching for your next career opportunity, Talent Carpet is here to make the recruitment process faster, smarter, and more successful.
                </p>
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://wa.me/919677070837"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-secondary hover:bg-secondary-dark text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300 w-full sm:w-auto shadow-md hover:-translate-y-0.5 inline-block text-center"
                  >
                    Talk to Our Recruitment Experts
                  </a>
                  <Link
                    to="/contact"
                    className="border-2 border-white/60 hover:border-white text-white hover:bg-white/10 font-bold px-8 py-3.5 rounded-full transition-all duration-300 w-full sm:w-auto text-center"
                  >
                    Submit Your Hiring Requirement
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;