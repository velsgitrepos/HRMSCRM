import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import { Briefcase, MapPin, Clock, Mail, FileText, X, AlertCircle, Send, CheckCircle2, User, Phone, ArrowUpRight } from 'lucide-react';
import { API_URL } from '../context/AuthContext';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  // Job Application Contact Form State (Inside Modal)
  const [modalFormData, setModalFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [modalError, setModalError] = useState('');

  // General Application Contact Form State (Bottom Section)
  const [generalFormData, setGeneralFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
    message: '',
  });
  const [generalSubmitting, setGeneralSubmitting] = useState(false);
  const [generalSubmitted, setGeneralSubmitted] = useState(false);

  const defaultSampleJobs = [
    {
      _id: '1',
      jobTitle: 'SAP Master Data Management',
      location: 'Chennai',
      experience: '1+ Years',
      employmentType: 'Full-time',
      description: 'Role: SAP Master Data Management\nNotice Period: Immediate joiners\n\nSkills Set: MDM experience with SAP, Material Master, Vendor Master, Customer Master, data cleansing, data validation, standardization, codification, and master data governance.',
      applyEmail: 'mubeen@talentcarpet.com',
      status: 'Open',
      highlighted: true,
    },
    {
      _id: '2',
      jobTitle: 'Asset Engineer',
      location: 'Chennai',
      experience: '3-5 Years',
      employmentType: 'Full-time',
      description: 'Role: Asset Engineer\nNotice Period: Immediate joiner\nType of Employment: Permanent\nEducation: BE (Mech) (ELEC) (INST)\n\nSkills:\n- Quality Check\n- Plant Maintenance\n- SAP PM Module\n- Data Cleansing',
      applyEmail: 'mubeen@talentcarpet.com',
      status: 'Open',
    },
    {
      _id: '3',
      jobTitle: 'Senior Data Modeller',
      location: 'Hyderabad / Bangalore / Chennai / Pune (Hybrid)',
      experience: '8-10 Years',
      employmentType: 'Contract',
      description: 'Role: Senior Data Modeller\nContract: 1 Year (Extendable)\nWork Timing: 11 AM - 8 PM IST\nLocation: Hyderabad, Bangalore, Chennai, Pune (Hybrid)\n\nKey Skills:\n- Data Modeling & Data Architecture\n- Insurance Domain Knowledge (Life & Annuities, Property & Casualty)\n- ERwin Data Modeler, ER/Studio, PowerDesigner, Enterprise Architect\n- Conceptual, Logical & Physical Data Modeling\n- OLTP & OLAP Data Modeling\n- Policy Administration & Claims Management\n- Underwriting, Billing & Reinsurance',
      applyEmail: 'mubeen@talentcarpet.com',
      status: 'Open',
    },
    /*{ _id: '4', jobTitle: 'Devops Engineering', location: 'Chennai', experience: '3-5 Years', employmentType: 'Full-time', description: 'This job is opned in our company', applyEmail: 'mubeen@talentcarpet.com', status: 'Open' },
    { _id: '5', jobTitle: 'QA Automation Engineering', location: 'Mumbai', experience: '6+ years', employmentType: 'Full-time', description: 'This is best job for It peoples', applyEmail: 'mubeen@talentcarpet.com', status: 'Open' },
    { _id: '6', jobTitle: 'Senior Full Stack Developer', location: 'Chennai', experience: '5+ Years', employmentType: 'Full-time', description: 'This is the best job for the senior developers', applyEmail: 'mubeen@talentcarpet.com', status: 'Open' },
    { _id: '7', jobTitle: 'Executive HR Consultant', location: 'Delhi NCR / On-site', experience: '4-8 Years', employmentType: 'Full-time', description: 'Seeking a talent partner to advise corporate clients on HR policy formulation, compliance frameworks, performance...', applyEmail: 'mubeen@talentcarpet.com', status: 'Open' },
    { _id: '8', jobTitle: 'Contract Recruitment Consultant (IT)', location: 'Remote (India)', experience: '2+ Years', employmentType: 'Contract', description: 'Join our team for a 6-month contract role (extendable) to source, screen, and schedule interviews for software...', applyEmail: 'mubeen@talentcarpet.com', status: 'Open' }*/
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${API_URL}/careers`);
        if (res.data && res.data.length > 0) {
          setJobs(res.data);
        } else {
          setJobs(defaultSampleJobs);
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setJobs(defaultSampleJobs);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Prevent background page scrolling when Job Application Modal is open
  useEffect(() => {
    if (selectedJob) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedJob]);

  const handleOpenJobModal = (job) => {
    setSelectedJob(job);
    setModalSubmitted(false);
    setModalError('');
    setModalFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!selectedJob) return;
    setModalSubmitting(true);
    setModalError('');
    try {
      await axios.post(`${API_URL}/applications`, {
        jobId: selectedJob._id,
        name: modalFormData.name,
        email: modalFormData.email,
        phone: modalFormData.phone,
      });
      setModalSubmitted(true);
      setModalFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Error submitting application:', err);
      const errorMsg = err.response?.data?.message || 'Failed to submit job application. Please try again.';
      setModalError(errorMsg);
    } finally {
      setModalSubmitting(false);
    }
  };

  const handleGeneralSubmit = async (e) => {
    e.preventDefault();
    setGeneralSubmitting(true);
    try {
      await axios.post(`${API_URL}/inquiries`, {
        name: generalFormData.name,
        email: generalFormData.email,
        phone: generalFormData.phone,
        company: generalFormData.jobTitle ? `Target Role: ${generalFormData.jobTitle}` : 'General Candidate Application',
        requirement: generalFormData.jobTitle || 'Career Opportunity',
        message: generalFormData.message,
      });
      setGeneralSubmitted(true);
      setGeneralFormData({ name: '', email: '', phone: '', jobTitle: '', message: '' });
      setTimeout(() => setGeneralSubmitted(false), 5000);
    } catch (err) {
      console.error('Error submitting candidate profile:', err);
      alert(err.response?.data?.message || 'Failed to submit profile. Please try again.');
    } finally {
      setGeneralSubmitting(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'All' || job.employmentType === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="py-16 px-6 min-h-[85vh] relative">
      {/* Visual background glow */}
      <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 pt-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-secondary font-bold tracking-widest text-sm uppercase block mb-3">WE ARE HIRING</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-light">Join Our Client Teams</h1>
            <p className="text-slate-600 dark:text-light/80 mt-4 max-w-xl mx-auto text-sm sm:text-base">
              Talent Carpet recruits for premier multinational technology hubs, financial corporations, and innovative brands globally.
            </p>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.1}>
          <div className="glass-card p-6 rounded-3xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border-slate-200 dark:border-light-dark/10">
            <div className="w-full md:w-2/3">
              <input
                type="text"
                placeholder="Search by Job Title, Location, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-primary border border-slate-200 dark:border-light-dark/10 hover:border-primary/50 focus:border-primary dark:focus:border-secondary rounded-2xl px-5 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-light/35 focus:outline-none transition-all duration-300"
              />
            </div>
            <div className="w-full md:w-1/3 flex items-center space-x-3">
              <span className="text-xs text-slate-500 dark:text-light/70 font-semibold shrink-0 uppercase tracking-wider">Type:</span>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full bg-slate-50 dark:bg-primary border border-slate-200 dark:border-light-dark/10 hover:border-primary/50 focus:border-primary dark:focus:border-secondary rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none transition-all duration-300"
              >
                <option value="All">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>
        </ScrollReveal>

        {/* Job Listings Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card p-6 rounded-3xl animate-pulse h-64 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-6 w-2/3 bg-slate-200 dark:bg-primary rounded" />
                  <div className="h-4 w-1/3 bg-slate-200 dark:bg-primary rounded" />
                </div>
                <div className="h-10 w-full bg-slate-200 dark:bg-primary rounded-xl mt-6" />
              </div>
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredJobs.map((job, idx) => {
              // Color Palette Logic: Alternating Navy Blue & Vibrant Green cards with dynamic HOVER borders
              const isGreenButton = idx % 2 === 1;

              return (
                <ScrollReveal key={job._id || idx} delay={idx * 0.05} className="h-full">
                  <div
                    className={`relative bg-white dark:bg-[#111C38] rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 shadow-md hover:shadow-2xl group h-full border border-slate-200 dark:border-slate-800 overflow-hidden ${
                      isGreenButton
                        ? 'hover:border-2 hover:border-[#75BB3F] hover:shadow-[#75BB3F]/20'
                        : 'hover:border-2 hover:border-[#1E378B] hover:shadow-[#1E378B]/20'
                    } ${job.status === 'Closed' ? 'opacity-65' : ''}`}
                  >
                    {/* Top Accent Bar (Expands smoothly on Hover) */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1.5 transition-transform duration-300 transform origin-center scale-x-0 group-hover:scale-x-100 ${
                        isGreenButton ? 'bg-[#75BB3F]' : 'bg-[#1E378B]'
                      }`}
                    />

                    <div>
                      {/* Top Icon Badge & Employment Type Pill */}
                      <div className="flex items-center justify-between mb-4">
                        {/* Left Circular/Rounded Icon Container */}
                        <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 shadow-xs transition-colors duration-300 ${
                          isGreenButton
                            ? 'bg-emerald-50/80 dark:bg-slate-800 border-emerald-100 dark:border-slate-700 text-[#75BB3F]'
                            : 'bg-indigo-50/80 dark:bg-slate-800 border-indigo-100 dark:border-slate-700 text-[#1E378B] dark:text-light'
                        }`}>
                          <Briefcase size={20} className="stroke-[2]" />
                        </div>

                        {/* Right Employment Type Pill */}
                        <span className="text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider bg-[#75BB3F]/15 text-[#75BB3F] border border-[#75BB3F]/25">
                          {job.employmentType || 'FULL-TIME'}
                        </span>
                      </div>

                      {/* Job Title */}
                      <h3 className={`text-slate-900 dark:text-white text-lg font-extrabold leading-snug tracking-tight mb-2 transition-colors font-sans ${
                        isGreenButton ? 'group-hover:text-[#75BB3F]' : 'group-hover:text-[#1E378B] dark:group-hover:text-secondary'
                      }`}>
                        {job.jobTitle}
                      </h3>

                      {/* Job Short Description */}
                      <p className="text-slate-500 dark:text-slate-300 text-xs leading-relaxed mb-4 line-clamp-2">
                        {job.description}
                      </p>

                      {/* Divider */}
                      <div className="border-t border-slate-100 dark:border-slate-800/80 my-4" />

                      {/* Location & Experience Meta Info */}
                      <div className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-300 mb-6">
                        <div className="flex items-center">
                          <MapPin size={15} className="text-[#75BB3F] mr-2 shrink-0" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Briefcase size={15} className="text-[#1E378B] dark:text-[#75BB3F] mr-2 shrink-0" />
                          <span>Exp: {job.experience}</span>
                        </div>
                      </div>
                    </div>

                    {/* Full Width Apply Now Button */}
                    <button
                      onClick={() => handleOpenJobModal(job)}
                      disabled={job.status === 'Closed'}
                      className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-md flex items-center justify-center space-x-2 ${
                        job.status === 'Closed'
                          ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                          : isGreenButton
                          ? 'bg-[#75BB3F] hover:bg-[#64a434] text-white shadow-[#75BB3F]/20'
                          : 'bg-[#1E378B] hover:bg-[#112361] text-white shadow-[#1E378B]/20'
                      }`}
                    >
                      <span>Apply Now</span>
                    </button>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        ) : (
          <div className="glass-card p-12 rounded-3xl text-center flex flex-col items-center justify-center space-y-4">
            <AlertCircle className="text-slate-400 dark:text-light/35" size={48} />
            <h3 className="text-slate-950 dark:text-light text-lg font-bold">No Positions Match Your Filters</h3>
            <p className="text-slate-500 dark:text-light/70 text-xs">
              Try adjusting your text search queries or employment type selections.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterType('All');
              }}
              className="text-xs text-secondary hover:underline font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* General Candidate Job Application & Contact Section */}
        <ScrollReveal delay={0.2} className="mt-20">
          <div className="bg-white dark:bg-[#111C38] rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200 dark:border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#1E378B] via-[#2A4BB5] to-[#75BB3F]" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[#75BB3F] font-extrabold text-xs uppercase tracking-widest block">DIRECT RECRUITER CONNECT</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Didn't Find Your <span className="bg-gradient-to-r from-[#1E378B] to-[#75BB3F] bg-clip-text text-transparent">Exact Role?</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Submit your profile directly to our recruitment specialists. We will match your skills against active & upcoming client openings.
                </p>
                <div className="pt-2 space-y-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 size={18} className="text-[#75BB3F] shrink-0" />
                    <span>Direct priority indexing in our talent pool</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 size={18} className="text-[#1E378B] dark:text-[#75BB3F] shrink-0" />
                    <span>Confidential profile review by specialized consultants</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 size={18} className="text-[#75BB3F] shrink-0" />
                    <span>Fast-track response within 24 business hours</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                {generalSubmitted && (
                  <div className="mb-6 bg-[#75BB3F]/15 border border-[#75BB3F]/40 p-4 rounded-2xl flex items-center space-x-3 text-[#75BB3F] animate-fade-in">
                    <CheckCircle2 size={24} className="shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm">Application Submitted Successfully!</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        Our career consultants have received your profile and will get in touch shortly.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleGeneralSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={generalFormData.name}
                      onChange={(e) => setGeneralFormData({ ...generalFormData, name: e.target.value })}
                      className="w-full bg-[#F7F8FA] dark:bg-[#1A2747] border border-transparent focus:border-[#1E378B] dark:focus:border-[#75BB3F] rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={generalFormData.email}
                      onChange={(e) => setGeneralFormData({ ...generalFormData, email: e.target.value })}
                      className="w-full bg-[#F7F8FA] dark:bg-[#1A2747] border border-transparent focus:border-[#1E378B] dark:focus:border-[#75BB3F] rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={generalFormData.phone}
                      onChange={(e) => setGeneralFormData({ ...generalFormData, phone: e.target.value })}
                      className="w-full bg-[#F7F8FA] dark:bg-[#1A2747] border border-transparent focus:border-[#1E378B] dark:focus:border-[#75BB3F] rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Desired Role / Skillsets (e.g. React, DevOps, HR)"
                      value={generalFormData.jobTitle}
                      onChange={(e) => setGeneralFormData({ ...generalFormData, jobTitle: e.target.value })}
                      className="w-full bg-[#F7F8FA] dark:bg-[#1A2747] border border-transparent focus:border-[#1E378B] dark:focus:border-[#75BB3F] rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all"
                    />
                  </div>
                  <textarea
                    rows="4"
                    required
                    placeholder="Tell us about your experience, key achievements, or paste your LinkedIn/Portfolio link..."
                    value={generalFormData.message}
                    onChange={(e) => setGeneralFormData({ ...generalFormData, message: e.target.value })}
                    className="w-full bg-[#F7F8FA] dark:bg-[#1A2747] border border-transparent focus:border-[#1E378B] dark:focus:border-[#75BB3F] rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all resize-none"
                  />
                  <button
                    type="submit"
                    disabled={generalSubmitting}
                    className="w-full sm:w-auto bg-[#1E378B] hover:bg-[#112361] text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {generalSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Submit Profile to Recruiters</span>
                        <ArrowUpRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Detail & Apply Modal with Embedded Job Contact Form */}
      <AnimatePresence>
        {selectedJob && (
          <div
            className="fixed inset-0 bg-primary/80 dark:bg-primary-dark/85 backdrop-blur-md flex items-center justify-center z-[100] p-4 sm:p-6"
            onClick={() => setSelectedJob(null)}
            onWheel={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.3 }}
              className="glass-card w-full max-w-2xl rounded-3xl shadow-premium overflow-hidden flex flex-col h-[85vh] max-h-[680px] my-auto border border-slate-200 dark:border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-light-dark/10 flex items-start justify-between bg-slate-50 dark:bg-primary-dark/45 shrink-0">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-slate-950 dark:text-light text-xl sm:text-2xl font-bold">{selectedJob.jobTitle}</h2>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        selectedJob.status === 'Open'
                          ? 'bg-secondary/10 text-secondary'
                          : 'bg-red-500/10 text-red-500'
                      }`}
                    >
                      {selectedJob.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-light/70 mt-2">
                    <span className="flex items-center">
                      <MapPin size={12} className="mr-1 text-primary dark:text-secondary" />
                      {selectedJob.location}
                    </span>
                    <span className="flex items-center">
                      <Briefcase size={12} className="mr-1 text-secondary" />
                      {selectedJob.experience} Experience
                    </span>
                    <span className="flex items-center">
                      <Clock size={12} className="mr-1 text-cyan-500" />
                      {selectedJob.employmentType}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-slate-500 dark:text-light/70 hover:text-slate-900 dark:hover:text-white p-2 hover:bg-slate-100 dark:hover:bg-primary rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body with Dedicated Scrollbar */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 min-h-0 overscroll-contain">
                <div>
                  <h4 className="text-slate-900 dark:text-light font-bold text-sm uppercase tracking-wider mb-2">Job Description</h4>
                  <p className="text-slate-600 dark:text-light/80 text-sm leading-relaxed whitespace-pre-line">
                    {selectedJob.description}
                  </p>
                </div>

                <div className="glass-card p-4 rounded-2xl border-secondary/15 flex items-start space-x-3">
                  <FileText className="text-secondary mt-0.5 shrink-0" size={18} />
                  <div>
                    <h5 className="text-slate-900 dark:text-light text-xs font-bold uppercase tracking-wider mb-0.5">Note on Application</h5>
                    <p className="text-slate-600 dark:text-light/70 text-xs leading-relaxed">
                      Please fill in your details below to apply directly for this job position. Our recruiting team will review your application immediately.
                    </p>
                  </div>
                </div>

                {/* Job Contact / Application Form */}
                <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800">
                  <h4 className="text-slate-900 dark:text-light font-bold text-sm uppercase tracking-wider mb-4 flex items-center space-x-2">
                    <Send size={16} className="text-[#75BB3F]" />
                    <span>Apply for {selectedJob.jobTitle}</span>
                  </h4>

                  {modalError && (
                    <div className="mb-4 bg-red-500/15 border border-red-500/40 p-3.5 rounded-2xl flex items-center space-x-3 text-red-600 dark:text-red-400 animate-fade-in text-xs font-semibold">
                      <AlertCircle size={20} className="shrink-0 text-red-500" />
                      <span>{modalError}</span>
                    </div>
                  )}

                  {modalSubmitted ? (
                    <div className="bg-[#75BB3F]/15 border border-[#75BB3F]/40 p-4 rounded-2xl flex items-center space-x-3 text-[#75BB3F] animate-fade-in">
                      <CheckCircle2 size={24} className="shrink-0" />
                      <div>
                        <h4 className="font-bold text-sm">Application Sent Successfully!</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                          We have logged your application for {selectedJob.jobTitle}. Our hiring team will contact you shortly.
                        </p>
                      </div>
                    </div>
                  ) : selectedJob.status === 'Open' ? (
                    <form onSubmit={handleModalSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={modalFormData.name}
                            onChange={(e) => setModalFormData({ ...modalFormData, name: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-[#1A2747] border border-slate-200 dark:border-slate-700 focus:border-[#75BB3F] rounded-xl px-4 py-3 text-xs font-medium text-slate-900 dark:text-white focus:outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
                          <input
                            type="email"
                            required
                            placeholder="john@example.com"
                            value={modalFormData.email}
                            onChange={(e) => setModalFormData({ ...modalFormData, email: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-[#1A2747] border border-slate-200 dark:border-slate-700 focus:border-[#75BB3F] rounded-xl px-4 py-3 text-xs font-medium text-slate-900 dark:text-white focus:outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={modalFormData.phone}
                          onChange={(e) => setModalFormData({ ...modalFormData, phone: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-[#1A2747] border border-slate-200 dark:border-slate-700 focus:border-[#75BB3F] rounded-xl px-4 py-3 text-xs font-medium text-slate-900 dark:text-white focus:outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Cover Note / Experience Summary *</label>
                        <textarea
                          rows="3"
                          required
                          placeholder="Briefly state your relevant experience, notice period, or portfolio links..."
                          value={modalFormData.message}
                          onChange={(e) => setModalFormData({ ...modalFormData, message: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-[#1A2747] border border-slate-200 dark:border-slate-700 focus:border-[#75BB3F] rounded-xl px-4 py-3 text-xs font-medium text-slate-900 dark:text-white focus:outline-none transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={modalSubmitting}
                        className="w-full bg-[#75BB3F] hover:bg-[#64a434] text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm transition-all duration-300 shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                      >
                        {modalSubmitting ? (
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Submit Application</span>
                            <Send size={16} />
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl text-center text-xs text-slate-500 font-semibold">
                      This job position is currently closed for new applications.
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-light-dark/10 flex items-center justify-between bg-slate-50 dark:bg-primary-dark/45 shrink-0">
                <span className="text-xs text-slate-500 dark:text-light/70 flex items-center">
                  <Mail size={14} className="text-[#75BB3F] mr-1.5" />
                  {selectedJob.applyEmail}
                </span>
                <a
                  href={`mailto:${selectedJob.applyEmail}?subject=Application for ${selectedJob.jobTitle} - Talent Carpet Recruitment`}
                  className="text-xs font-bold text-[#1E378B] dark:text-[#75BB3F] hover:underline inline-flex items-center space-x-1"
                >
                  <span>Or apply via email client</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Careers;
