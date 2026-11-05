import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext, API_URL } from '../context/AuthContext';
import {
  Users,
  MessageSquare,
  Briefcase,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Upload,
  X,
  Star,
  Check,
  Mail,
  UserCheck,
  FileText,
  Globe,
  ExternalLink,
} from 'lucide-react';

const AdminDashboard = () => {
  const { admin, loading, logout, getAuthHeaders } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('team'); // 'team', 'testimonials', 'careers', 'inquiries', 'applications'

  // Data Lists
  const [team, setTeam] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [careers, setCareers] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [applications, setApplications] = useState([]);
  const [applicationStatusFilter, setApplicationStatusFilter] = useState('All');

  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [selectedId, setSelectedId] = useState(null);

  // Form Fields - Team
  const [teamForm, setTeamForm] = useState({
    name: '',
    designation: '',
    experience: '',
    linkedinUrl: '',
    whatsappNumber: '',
    image: null,
    imagePreview: '',
  });

  // Form Fields - Testimonial
  const [testimonialForm, setTestimonialForm] = useState({
    clientName: '',
    company: '',
    type: 'Employer',
    rating: 5,
    review: '',
    image: null,
    imagePreview: '',
  });

  // Testimonial Filter State
  const [testimonialTypeFilter, setTestimonialTypeFilter] = useState('All');

  // Form Fields - Career
  const [careerForm, setCareerForm] = useState({
    jobTitle: '',
    location: '',
    experience: '',
    employmentType: 'Full-time',
    description: '',
    applyEmail: '',
    status: 'Open',
  });

  // Alerts
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !admin) {
      navigate('/admin');
    }
  }, [admin, loading, navigate]);

  // Load lists
  const loadTeam = async () => {
    try {
      const res = await axios.get(`${API_URL}/team`);
      setTeam(res.data);
    } catch (err) {
      showAlert('danger', 'Failed to retrieve team members.');
    }
  };

  const loadTestimonials = async () => {
    try {
      const res = await axios.get(`${API_URL}/testimonials`);
      setTestimonials(res.data);
    } catch (err) {
      showAlert('danger', 'Failed to retrieve testimonials.');
    }
  };

  const loadCareers = async () => {
    try {
      const res = await axios.get(`${API_URL}/careers`);
      setCareers(res.data);
    } catch (err) {
      showAlert('danger', 'Failed to retrieve jobs postings.');
    }
  };

  const loadInquiries = async () => {
    try {
      const headers = getAuthHeaders();
      const res = await axios.get(`${API_URL}/inquiries`, headers);
      setInquiries(res.data);
    } catch (err) {
      showAlert('danger', 'Failed to retrieve inquiry submissions.');
    }
  };

  const loadApplications = async () => {
    try {
      const headers = getAuthHeaders();
      const res = await axios.get(`${API_URL}/applications`, headers);
      setApplications(res.data);
    } catch (err) {
      showAlert('danger', 'Failed to retrieve job applications.');
    }
  };

  const handleUpdateApplicationStatus = async (id, status) => {
    try {
      const headers = getAuthHeaders();
      await axios.put(`${API_URL}/applications/${id}/status`, { status }, headers);
      showAlert('success', `Application status updated to "${status}".`);
      loadApplications();
    } catch (err) {
      showAlert('danger', err.response?.data?.message || 'Failed to update application status.');
    }
  };

  const handleDeleteApplication = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job application?')) return;
    try {
      const headers = getAuthHeaders();
      await axios.delete(`${API_URL}/applications/${id}`, headers);
      showAlert('success', 'Job application deleted successfully!');
      loadApplications();
    } catch (err) {
      showAlert('danger', err.response?.data?.message || 'Failed to delete application.');
    }
  };

  useEffect(() => {
    if (admin) {
      loadTeam();
      loadTestimonials();
      loadCareers();
      loadInquiries();
      loadApplications();
    }
  }, [admin]);

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 4000);
  };

  // Log out action
  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  // Image change handler
  const handleImageChange = (e, setFormState) => {
    const file = e.target.files[0];
    if (file) {
      const maxSizeBytes = 3 * 1024 * 1024; // 3MB limit
      if (file.size > maxSizeBytes) {
        showAlert('danger', 'Image size exceeds 3MB limit. Please upload an image 3MB or smaller.');
        e.target.value = '';
        return;
      }
      setFormState((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  // Delete Action
  const handleDelete = async (tabName, id) => {
    if (!window.confirm('Are you absolutely sure you want to delete this item?')) return;

    try {
      const headers = getAuthHeaders();
      await axios.delete(`${API_URL}/${tabName === 'testimonials' ? 'testimonials' : tabName}/${id}`, headers);
      showAlert('success', 'Item deleted successfully!');

      if (tabName === 'team') loadTeam();
      if (tabName === 'testimonials') loadTestimonials();
      if (tabName === 'careers') loadCareers();
      if (tabName === 'inquiries') loadInquiries();
    } catch (err) {
      showAlert('danger', err.response?.data?.message || 'Delete operation failed.');
    }
  };

  // Open Modal for Add
  const openAddModal = () => {
    setFormMode('add');
    setSelectedId(null);

    // Reset forms
    setTeamForm({ name: '', designation: '', experience: '', linkedinUrl: '', whatsappNumber: '', image: null, imagePreview: '' });
    setTestimonialForm({ clientName: '', company: '', type: 'Employer', rating: 5, review: '', image: null, imagePreview: '' });
    setCareerForm({ jobTitle: '', location: '', experience: '', employmentType: 'Full-time', description: '', applyEmail: '', status: 'Open' });

    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const openEditModal = (item) => {
    setFormMode('edit');
    setSelectedId(item._id);

    if (activeTab === 'team') {
      const imageUrl = item.imageUrl && item.imageUrl.startsWith('/uploads') ? `${API_URL.replace('/api', '')}${item.imageUrl}` : (item.imageUrl || '');
      setTeamForm({
        name: memberNameHelper(item.name),
        designation: item.designation,
        experience: item.experience,
        linkedinUrl: item.linkedinUrl || '',
        whatsappNumber: item.whatsappNumber || '',
        image: null,
        imagePreview: imageUrl,
      });
    } else if (activeTab === 'testimonials') {
      const clientImageUrl = item.clientImageUrl && item.clientImageUrl.startsWith('/uploads') ? `${API_URL.replace('/api', '')}${item.clientImageUrl}` : (item.clientImageUrl || '');
      setTestimonialForm({
        clientName: item.clientName,
        company: item.company,
        type: item.type || 'Employer',
        rating: item.rating,
        review: item.review,
        image: null,
        imagePreview: clientImageUrl,
      });
    } else if (activeTab === 'careers') {
      setCareerForm({
        jobTitle: item.jobTitle,
        location: item.location,
        experience: item.experience,
        employmentType: item.employmentType,
        description: item.description,
        applyEmail: item.applyEmail,
        status: item.status,
      });
    }

    setIsModalOpen(true);
  };

  const memberNameHelper = (name) => name || '';

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = getAuthHeaders();

    try {
      if (activeTab === 'team') {
        const data = new FormData();
        data.append('name', teamForm.name);
        data.append('designation', teamForm.designation);
        data.append('experience', teamForm.experience);
        data.append('linkedinUrl', teamForm.linkedinUrl);
        data.append('whatsappNumber', teamForm.whatsappNumber);
        if (teamForm.image) {
          data.append('image', teamForm.image);
        }

        if (formMode === 'add') {
          await axios.post(`${API_URL}/team`, data, headers);
          showAlert('success', 'Team member added successfully!');
        } else {
          await axios.put(`${API_URL}/team/${selectedId}`, data, headers);
          showAlert('success', 'Team member updated successfully!');
        }
        loadTeam();
      } else if (activeTab === 'testimonials') {
        const data = new FormData();
        data.append('clientName', testimonialForm.clientName);
        data.append('company', testimonialForm.company);
        data.append('type', testimonialForm.type || 'Employer');
        data.append('rating', testimonialForm.rating);
        data.append('review', testimonialForm.review);
        if (testimonialForm.image) {
          data.append('image', testimonialForm.image);
        }

        if (formMode === 'add') {
          await axios.post(`${API_URL}/testimonials`, data, headers);
          showAlert('success', 'Testimonial added successfully!');
        } else {
          await axios.put(`${API_URL}/testimonials/${selectedId}`, data, headers);
          showAlert('success', 'Testimonial updated successfully!');
        }
        loadTestimonials();
      } else if (activeTab === 'careers') {
        if (formMode === 'add') {
          await axios.post(`${API_URL}/careers`, careerForm, headers);
          showAlert('success', 'Job posting created successfully!');
        } else {
          await axios.put(`${API_URL}/careers/${selectedId}`, careerForm, headers);
          showAlert('success', 'Job posting updated successfully!');
        }
        loadCareers();
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      showAlert('danger', err.response?.data?.message || 'Form submission failed.');
    }
  };

  if (loading || !admin) {
    return (
      <div className="min-h-screen bg-light dark:bg-primary flex items-center justify-center">
        <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light dark:bg-primary text-slate-800 dark:text-light font-sans transition-colors duration-300">

      {/* Header Panel */}
      <header className="bg-white/90 dark:bg-[#0B132B]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 sticky top-0 left-0 w-full z-45 py-3.5 px-6 flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-3.5">
          <img
            src="/logo 2.png"
            alt="Talent Carpet Logo"
            loading="lazy"
            className="w-10 h-10 object-contain rounded-xl border border-slate-100 bg-white p-1 shadow-xs"
          />
          <div>
            <h1 className="text-slate-900 dark:text-white font-extrabold text-sm sm:text-base leading-tight font-sans flex items-center space-x-2">
              <span>Talent Carpet Admin</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#75BB3F]/15 text-[#75BB3F] border border-[#75BB3F]/30 uppercase tracking-widest hidden sm:inline-block">
                CONTROL CENTER
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Live Website Button (Same Tab Navigation) */}
          <Link
            to="/"
            className="flex items-center space-x-2 bg-[#1E378B] hover:bg-[#112361] text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-all duration-300 shadow-md hover:scale-105 active:scale-95 group"
            title="Go to Live Website Home"
          >
            <Globe size={15} className="text-[#75BB3F] group-hover:rotate-45 transition-transform duration-300" />
            <span className="hidden sm:inline">Live Website</span>
          </Link>

          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 hidden sm:block" />

          <span className="text-xs text-slate-500 dark:text-light/70 hidden md:inline">
            Logged in: <strong className="text-slate-800 dark:text-white font-bold">{admin.username}</strong>
          </span>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 bg-red-500/10 border border-red-500/30 hover:bg-red-500 hover:text-white text-red-500 dark:text-red-400 hover:border-transparent text-xs px-3 py-1.5 rounded-xl transition-all duration-300"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Grid Wrapper */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Alerts Banner */}
        {alert.show && (
          <div
            className={`mb-6 p-4 rounded-2xl flex items-center space-x-3 animate-fade-in ${alert.type === 'success'
              ? 'bg-secondary/15 border border-secondary/40 text-secondary'
              : 'bg-red-500/15 border border-red-500/40 text-red-500 dark:text-red-400'
              }`}
          >
            {alert.type === 'success' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
            <span className="text-xs font-semibold">{alert.message}</span>
          </div>
        )}

        {/* Overview Statistics Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center space-x-3.5 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#1E378B]/10 text-[#1E378B] dark:text-[#75BB3F] flex items-center justify-center shrink-0">
              <Users size={20} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Team</span>
              <span className="text-base font-black text-slate-900 dark:text-white">{team.length} Members</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center space-x-3.5 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <Star size={20} className="fill-amber-500" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Reviews</span>
              <span className="text-base font-black text-slate-900 dark:text-white">{testimonials.length} Cards</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center space-x-3.5 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Briefcase size={20} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Jobs</span>
              <span className="text-base font-black text-slate-900 dark:text-white">{careers.length} Openings</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center space-x-3.5 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <FileText size={20} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Applications</span>
              <span className="text-base font-black text-slate-900 dark:text-white">{applications.length} Candidates</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center space-x-3.5 hover:shadow-md transition-all col-span-2 sm:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Inquiries</span>
              <span className="text-base font-black text-slate-900 dark:text-white">{inquiries.length} Clients</span>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs & Action */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-slate-800/90 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 w-full md:w-auto">
            {[
              { id: 'team', label: 'Meet Our Team', icon: <Users size={15} />, count: team.length },
              { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare size={15} />, count: testimonials.length },
              { id: 'careers', label: 'Careers & Jobs', icon: <Briefcase size={15} />, count: careers.length },
              { id: 'applications', label: 'Job Applications', icon: <FileText size={15} />, count: applications.length },
              { id: 'inquiries', label: 'Client Inquiries', icon: <Mail size={15} />, count: inquiries.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 ${activeTab === tab.id
                  ? 'bg-[#1E378B] text-white shadow-md shadow-[#1E378B]/20'
                  : 'text-slate-600 dark:text-light/70 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
                  }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    activeTab === tab.id
                      ? 'bg-[#75BB3F] text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {activeTab !== 'inquiries' && activeTab !== 'applications' && (
            <button
              onClick={openAddModal}
              className="bg-[#75BB3F] hover:bg-[#64a434] text-white flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-extrabold shadow-md shadow-[#75BB3F]/25 hover:scale-105 active:scale-95 transition-all duration-300 w-full md:w-auto justify-center"
            >
              <Plus size={16} />
              <span>Add New {activeTab === 'team' ? 'Member' : activeTab === 'testimonials' ? 'Testimonial' : 'Job'}</span>
            </button>
          )}
        </div>

        {/* TAB 1: TEAM MEMBERS LIST */}
        {activeTab === 'team' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.length > 0 ? (
              team.map((member) => (
                <div key={member._id} className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between">
                  <div className="p-6 flex space-x-4 items-center">
                    {member.imageUrl ? (
                      <img
                        src={typeof member.imageUrl === 'string' && member.imageUrl.startsWith('/uploads') ? `${API_URL.replace('/api', '')}${member.imageUrl}` : member.imageUrl}
                        alt={member.name}
                        loading="lazy"
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-light-dark/15 shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-primary-dark border border-slate-200 dark:border-light-dark/15 shrink-0 flex items-center justify-center text-primary dark:text-secondary font-bold text-lg">
                        {member.name ? member.name.charAt(0) : 'T'}
                      </div>
                    )}
                    <div>
                      <h4 className="text-slate-900 dark:text-light font-bold text-sm">{member.name}</h4>
                      <p className="text-secondary text-xs mt-0.5">{member.designation}</p>
                      <p className="text-slate-500 dark:text-light/70 text-[10px] mt-1 font-semibold">Exp: {member.experience}</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-primary-dark/45 px-6 py-3 border-t border-slate-200 dark:border-light-dark/5 flex items-center justify-between">
                    <div className="flex flex-col text-[10px] text-slate-500 dark:text-light/70 truncate max-w-[65%]">
                      <span className="truncate">{member.linkedinUrl || 'No LinkedIn'}</span>
                      {member.whatsappNumber && <span className="text-[#25D366] font-medium truncate">WA: {member.whatsappNumber}</span>}
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => openEditModal(member)}
                        className="text-slate-500 hover:text-slate-800 dark:text-light/70 dark:hover:text-white p-1"
                        title="Edit Member"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete('team', member._id)}
                        className="text-red-500 hover:text-red-600 p-1"
                        title="Delete Member"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-slate-500 dark:text-light/70 text-xs">
                No team members found. Click the button above to add one.
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TESTIMONIALS LIST */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            {/* Filter Buttons */}
            <div className="flex items-center space-x-2 bg-slate-100 dark:bg-primary-dark/40 p-1.5 rounded-xl w-fit">
              {['All', 'Employer', 'Candidate'].map((typeOpt) => (
                <button
                  key={typeOpt}
                  onClick={() => setTestimonialTypeFilter(typeOpt)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    testimonialTypeFilter === typeOpt
                      ? 'bg-white dark:bg-primary text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:text-light/60 dark:hover:text-white'
                  }`}
                >
                  {typeOpt === 'All' ? 'All Testimonials' : `${typeOpt} Testimonials`}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(() => {
                const filtered = testimonials.filter(t => testimonialTypeFilter === 'All' || (t.type || 'Employer') === testimonialTypeFilter);
                if (filtered.length === 0) {
                  return (
                    <div className="col-span-full py-16 text-center text-slate-500 dark:text-light/70 text-xs">
                      No {testimonialTypeFilter.toLowerCase()} testimonials found. Click the button above to add one.
                    </div>
                  );
                }

                return filtered.map((test) => (
                  <div key={test._id} className="glass-card rounded-2xl overflow-hidden p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-base font-extrabold uppercase shadow-sm ${
                            (test.type || 'Employer') === 'Candidate'
                              ? 'bg-secondary/15 text-secondary border border-secondary/30'
                              : 'bg-primary/10 text-primary dark:bg-primary-light/20 dark:text-light border border-primary/20'
                          }`}>
                            {test.clientName?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <h4 className="text-slate-900 dark:text-light font-bold text-sm">{test.clientName}</h4>
                            <p className="text-slate-500 dark:text-light/70 text-xs">{test.company}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-1.5">
                          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            (test.type || 'Employer') === 'Candidate'
                              ? 'bg-secondary/15 text-secondary border border-secondary/30'
                              : 'bg-primary/10 text-primary dark:bg-primary-light/20 dark:text-light border border-primary/20'
                          }`}>
                            {test.type || 'Employer'}
                          </span>
                          <div className="flex items-center bg-slate-100 dark:bg-primary px-2 py-0.5 border border-slate-200 dark:border-light-dark/10 rounded-lg">
                            <Star size={12} className="text-amber-400 fill-amber-400 mr-1" />
                            <span className="text-[10px] font-bold text-slate-800 dark:text-light">{test.rating}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-light/75 text-xs leading-relaxed italic">
                        "{test.review}"
                      </p>
                    </div>
                    <div className="border-t border-slate-200 dark:border-light-dark/5 pt-4 mt-6 flex items-center justify-end space-x-3">
                      <button
                        onClick={() => openEditModal(test)}
                        className="text-slate-500 hover:text-slate-800 dark:text-light/70 dark:hover:text-white p-1"
                        title="Edit Testimonial"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete('testimonials', test._id)}
                        className="text-red-500 hover:text-red-600 p-1"
                        title="Delete Testimonial"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        )}

        {/* TAB 3: CAREERS LIST */}
        {activeTab === 'careers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careers.length > 0 ? (
              careers.map((job) => (
                <div key={job._id} className="glass-card rounded-2xl overflow-hidden p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-slate-900 dark:text-light font-bold text-base">{job.jobTitle}</h4>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${job.status === 'Open'
                          ? 'bg-secondary/10 text-secondary'
                          : 'bg-red-500/10 text-red-500'
                          }`}
                      >
                        {job.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-[10px] text-slate-500 dark:text-light/70 mb-4">
                      <span>Loc: <strong>{job.location}</strong></span>
                      <span>Exp: <strong>{job.experience}</strong></span>
                      <span>Type: <strong>{job.employmentType}</strong></span>
                    </div>

                    <p className="text-slate-650 dark:text-light/75 text-xs leading-relaxed line-clamp-3">
                      {job.description}
                    </p>
                  </div>

                  <div className="border-t border-slate-200 dark:border-light-dark/5 pt-4 mt-6 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 dark:text-light/70 font-semibold truncate max-w-[60%]">
                      Mail: {job.applyEmail}
                    </span>
                    <div className="flex items-center space-x-3 shrink-0">
                      <button
                        onClick={() => openEditModal(job)}
                        className="text-slate-500 hover:text-slate-800 dark:text-light/70 dark:hover:text-white p-1"
                        title="Edit Job"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete('careers', job._id)}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Delete Job"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-slate-500 dark:text-light/70 text-xs">
                No job postings found. Click the button above to add one.
              </div>
            )}
          </div>
        )}

        {/* TAB 4: JOB APPLICATIONS LIST */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            {/* Status Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-primary-dark/40 p-1.5 rounded-xl w-fit">
              {['All', 'Applied', 'Shortlisted', 'Rejected'].map((statusOpt) => (
                <button
                  key={statusOpt}
                  onClick={() => setApplicationStatusFilter(statusOpt)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    applicationStatusFilter === statusOpt
                      ? 'bg-white dark:bg-primary text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:text-light/60 dark:hover:text-white'
                  }`}
                >
                  {statusOpt === 'All' ? 'All Applications' : statusOpt}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {(() => {
                const filteredApps = applications.filter(
                  app => applicationStatusFilter === 'All' || app.status === applicationStatusFilter
                );

                if (filteredApps.length === 0) {
                  return (
                    <div className="col-span-full py-16 text-center text-slate-500 dark:text-light/70 text-xs">
                      No job applications found matching filter "{applicationStatusFilter}".
                    </div>
                  );
                }

                return filteredApps.map((app) => (
                  <div key={app._id} className="glass-card rounded-2xl overflow-hidden p-6 flex flex-col justify-between border border-slate-200 dark:border-light-dark/5 shadow-premium">
                    <div>
                      {/* Top Job Title & Status Badge */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-[10px] font-extrabold text-[#75BB3F] uppercase tracking-widest block mb-0.5">
                            APPLIED POSITION
                          </span>
                          <h4 className="text-slate-900 dark:text-light font-bold text-base">
                            {app.jobId?.jobTitle || 'Job Opening'}
                          </h4>
                          {app.jobId?.location && (
                            <p className="text-slate-500 dark:text-light/70 text-xs mt-0.5">
                              {app.jobId.location} • {app.jobId.employmentType}
                            </p>
                          )}
                        </div>

                        {/* Status badge */}
                        <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                          app.status === 'Shortlisted'
                            ? 'bg-[#75BB3F]/15 text-[#75BB3F] border border-[#75BB3F]/30'
                            : app.status === 'Rejected'
                            ? 'bg-red-500/15 text-red-500 border border-red-500/30'
                            : 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30'
                        }`}>
                          {app.status || 'Applied'}
                        </span>
                      </div>

                      {/* Candidate Details Grid */}
                      <div className="bg-slate-50 dark:bg-primary-dark/30 p-4 rounded-xl border border-slate-100 dark:border-light-dark/5 mb-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Candidate Name:</span>
                          <span className="text-xs font-extrabold text-slate-900 dark:text-white">{app.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Email:</span>
                          <a href={`mailto:${app.email}`} className="text-xs font-semibold text-[#1E378B] dark:text-[#75BB3F] hover:underline">
                            {app.email}
                          </a>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Phone:</span>
                          <a href={`tel:${app.phone}`} className="text-xs font-semibold text-slate-800 dark:text-light hover:underline">
                            {app.phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions & Status Selector */}
                    <div className="pt-3 border-t border-slate-200 dark:border-light-dark/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                      <div className="flex items-center space-x-2 w-full sm:w-auto">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Status:</span>
                        <select
                          value={app.status || 'Applied'}
                          onChange={(e) => handleUpdateApplicationStatus(app._id, e.target.value)}
                          className="bg-white dark:bg-primary border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 dark:text-white focus:outline-none"
                        >
                          <option value="Applied">Applied</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between w-full sm:w-auto space-x-4">
                        <span className="text-[10px] text-slate-400">
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => handleDeleteApplication(app._id)}
                          className="text-red-500 hover:text-red-600 font-bold flex items-center space-x-1 p-1.5 bg-red-500/5 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/10"
                          title="Delete Application"
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        )}

        {/* TAB 5: CLIENT INQUIRIES LIST */}
        {activeTab === 'inquiries' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {inquiries.length > 0 ? (
              inquiries.map((inq) => (
                <div key={inq._id} className="glass-card rounded-2xl overflow-hidden p-6 flex flex-col justify-between border border-slate-200 dark:border-light-dark/5 shadow-premium">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-slate-900 dark:text-light font-bold text-sm sm:text-base">{inq.name}</h4>
                        <p className="text-slate-500 dark:text-light/70 text-xs font-medium">{inq.company}</p>
                      </div>
                      <span className="text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-primary/10 text-primary dark:bg-secondary/15 dark:text-secondary border border-primary/20 dark:border-secondary/25">
                        {inq.requirement}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs text-slate-650 dark:text-light/75 mb-6 py-4 border-y border-slate-100 dark:border-light-dark/10">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block">Email</span>
                        <a href={`mailto:${inq.email}`} className="font-semibold text-slate-800 dark:text-light hover:text-secondary break-all">
                          {inq.email}
                        </a>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block">Phone</span>
                        <a href={`tel:${inq.phone}`} className="font-semibold text-slate-800 dark:text-light hover:text-secondary">
                          {inq.phone}
                        </a>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block mb-1">Message</span>
                      <p className="text-slate-700 dark:text-light/85 text-xs leading-relaxed bg-slate-50 dark:bg-primary-dark/30 p-4 rounded-xl border border-slate-100 dark:border-light-dark/5 whitespace-pre-wrap">
                        {inq.message}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-200 dark:border-light-dark/5 mt-4">
                    <span>Submitted: {new Date(inq.createdAt).toLocaleString()}</span>
                    <button
                      onClick={() => handleDelete('inquiries', inq._id)}
                      className="text-red-500 hover:text-red-600 font-bold flex items-center space-x-1 p-1.5 bg-red-500/5 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/10"
                      title="Delete Inquiry"
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-slate-500 dark:text-light/70 text-xs">
                No client contact inquiries found.
              </div>
            )}
          </div>
        )}
      </div>

      {/* MULTI-PURPOSE CONFIGURATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-primary/80 dark:bg-primary-dark/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="glass-card w-full max-w-xl rounded-3xl shadow-premium overflow-hidden flex flex-col max-h-[90vh]">

            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-light-dark/10 flex items-center justify-between bg-slate-50 dark:bg-primary-dark/45">
              <h3 className="text-slate-900 dark:text-light font-bold text-lg">
                {formMode === 'add' ? 'Add New' : 'Edit'}{' '}
                {activeTab === 'team' ? 'Team Member' : activeTab === 'testimonials' ? 'Testimonial' : 'Job Posting'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-500 dark:text-light/70 hover:text-slate-900 dark:hover:text-white p-2 hover:bg-slate-100 dark:hover:bg-primary rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-6">

              {/* TEAM SUB-FORM */}
              {activeTab === 'team' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-500 dark:text-light/70 font-semibold uppercase tracking-wider block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={teamForm.name}
                        onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 dark:bg-primary border border-slate-200 dark:border-light-dark/10 focus:border-primary dark:focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-450 dark:placeholder-light/30 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 dark:text-light/70 font-semibold uppercase tracking-wider block mb-1">Designation</label>
                      <input
                        type="text"
                        required
                        value={teamForm.designation}
                        onChange={(e) => setTeamForm({ ...teamForm, designation: e.target.value })}
                        placeholder="Senior IT Consultant"
                        className="w-full bg-slate-50 dark:bg-primary border border-slate-200 dark:border-light-dark/10 focus:border-primary dark:focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-455 dark:placeholder-light/30 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-500 dark:text-light/70 font-semibold uppercase tracking-wider block mb-1">Experience (e.g. "8 Years")</label>
                      <input
                        type="text"
                        required
                        value={teamForm.experience}
                        onChange={(e) => setTeamForm({ ...teamForm, experience: e.target.value })}
                        placeholder="10+ Years"
                        className="w-full bg-slate-50 dark:bg-primary border border-slate-200 dark:border-light-dark/10 focus:border-primary dark:focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-450 dark:placeholder-light/30 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 dark:text-light/70 font-semibold uppercase tracking-wider block mb-1">LinkedIn Profile URL</label>
                      <input
                        type="url"
                        value={teamForm.linkedinUrl}
                        onChange={(e) => setTeamForm({ ...teamForm, linkedinUrl: e.target.value })}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full bg-slate-50 dark:bg-primary border border-slate-200 dark:border-light-dark/10 focus:border-primary dark:focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-450 dark:placeholder-light/30 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 dark:text-light/70 font-semibold uppercase tracking-wider block mb-1">WhatsApp Number</label>
                      <input
                        type="text"
                        value={teamForm.whatsappNumber}
                        onChange={(e) => setTeamForm({ ...teamForm, whatsappNumber: e.target.value })}
                        placeholder="+91 96770 70837"
                        className="w-full bg-slate-50 dark:bg-primary border border-slate-200 dark:border-light-dark/10 focus:border-primary dark:focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-450 dark:placeholder-light/30 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 dark:text-light/70 font-semibold uppercase tracking-wider block mb-2">Member Photo (Max 3MB)</label>
                    <div className="flex items-center space-x-4">
                      {teamForm.imagePreview && (
                        <img
                          src={teamForm.imagePreview}
                          alt="Preview"
                          loading="lazy"
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-light-dark/20 shrink-0"
                        />
                      )}
                      <label className="flex-grow flex flex-col items-center justify-center bg-slate-50 dark:bg-primary border border-dashed border-slate-200 dark:border-light-dark/20 hover:border-primary dark:hover:border-secondary rounded-xl p-4 cursor-pointer transition-colors group">
                        <Upload size={18} className="text-slate-400 dark:text-light/35 group-hover:text-primary dark:group-hover:text-secondary mb-1" />
                        <span className="text-[10px] text-slate-500 dark:text-light/70 group-hover:text-slate-900 dark:group-hover:text-white font-semibold">Click to select photo (Max 3MB)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, setTeamForm)}
                          required={false}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TESTIMONIAL SUB-FORM */}
              {activeTab === 'testimonials' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-500 dark:text-light/70 font-semibold uppercase tracking-wider block mb-1">Testimonial Category / Type</label>
                      <select
                        value={testimonialForm.type || 'Employer'}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, type: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-primary border border-slate-200 dark:border-light-dark/10 focus:border-primary dark:focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                      >
                        <option value="Employer">Employer Testimonial</option>
                        <option value="Candidate">Candidate Testimonial</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 dark:text-light/70 font-semibold uppercase tracking-wider block mb-1">Client Rating (1 to 5 Stars)</label>
                      <select
                        value={testimonialForm.rating}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })}
                        className="w-full bg-slate-50 dark:bg-primary border border-slate-200 dark:border-light-dark/10 focus:border-primary dark:focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                      >
                        <option value={5}>5 Stars (Excellent)</option>
                        <option value={4}>4 Stars (Very Good)</option>
                        <option value={3}>3 Stars (Good)</option>
                        <option value={2}>2 Stars (Average)</option>
                        <option value={1}>1 Star (Poor)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-500 dark:text-light/70 font-semibold uppercase tracking-wider block mb-1">Client Name</label>
                      <input
                        type="text"
                        required
                        value={testimonialForm.clientName}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, clientName: e.target.value })}
                        placeholder="Robert Vance"
                        className="w-full bg-slate-50 dark:bg-primary border border-slate-200 dark:border-light-dark/10 focus:border-primary dark:focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-450 dark:placeholder-light/30 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 dark:text-light/70 font-semibold uppercase tracking-wider block mb-1">Company / Designation (Optional)</label>
                      <input
                        type="text"
                        value={testimonialForm.company}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
                        placeholder="CTO, Innovate Tech"
                        className="w-full bg-slate-50 dark:bg-primary border border-slate-200 dark:border-light-dark/10 focus:border-primary dark:focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-455 dark:placeholder-light/30 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 dark:text-light/70 font-semibold uppercase tracking-wider block mb-1">Client Review Text</label>
                    <textarea
                      rows="3"
                      required
                      value={testimonialForm.review}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, review: e.target.value })}
                      placeholder="Enter client quote review here..."
                      className="w-full bg-slate-50 dark:bg-primary border border-slate-200 dark:border-light-dark/10 focus:border-primary dark:focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-450 dark:placeholder-light/30 focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 dark:text-light/70 font-semibold uppercase tracking-wider block mb-2">Client Avatar Photo</label>
                    <div className="flex items-center space-x-4">
                      {testimonialForm.imagePreview && (
                        <img
                          src={testimonialForm.imagePreview}
                          alt="Preview"
                          loading="lazy"
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-light-dark/20 shrink-0"
                        />
                      )}
                      <label className="flex-grow flex flex-col items-center justify-center bg-slate-50 dark:bg-primary border border-dashed border-slate-200 dark:border-light-dark/20 hover:border-primary dark:hover:border-secondary rounded-xl p-4 cursor-pointer transition-colors group">
                        <Upload size={18} className="text-slate-400 dark:text-light/35 group-hover:text-primary dark:group-hover:text-secondary mb-1" />
                        <span className="text-[10px] text-slate-500 dark:text-light/70 group-hover:text-slate-900 dark:group-hover:text-white font-semibold">Click to select photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, setTestimonialForm)}
                          required={false}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* CAREERS SUB-FORM */}
              {activeTab === 'careers' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-500 dark:text-light/70 font-semibold uppercase tracking-wider block mb-1">Job Title</label>
                      <input
                        type="text"
                        required
                        value={careerForm.jobTitle}
                        onChange={(e) => setCareerForm({ ...careerForm, jobTitle: e.target.value })}
                        placeholder="Senior Full Stack Engineer"
                        className="w-full bg-slate-50 dark:bg-primary border border-slate-200 dark:border-light-dark/10 focus:border-primary dark:focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-450 dark:placeholder-light/30 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 dark:text-light/70 font-semibold uppercase tracking-wider block mb-1">Location</label>
                      <input
                        type="text"
                        required
                        value={careerForm.location}
                        onChange={(e) => setCareerForm({ ...careerForm, location: e.target.value })}
                        placeholder="Mumbai / Hybrid"
                        className="w-full bg-slate-50 dark:bg-primary border border-slate-200 dark:border-light-dark/10 focus:border-primary dark:focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-450 dark:placeholder-light/30 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-500 dark:text-light/70 font-semibold uppercase tracking-wider block mb-1">Experience Required</label>
                      <input
                        type="text"
                        required
                        value={careerForm.experience}
                        onChange={(e) => setCareerForm({ ...careerForm, experience: e.target.value })}
                        placeholder="5+ Years"
                        className="w-full bg-slate-50 dark:bg-primary border border-slate-200 dark:border-light-dark/10 focus:border-primary dark:focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-450 dark:placeholder-light/30 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 dark:text-light/70 font-semibold uppercase tracking-wider block mb-1">Employment Type</label>
                      <select
                        value={careerForm.employmentType}
                        onChange={(e) => setCareerForm({ ...careerForm, employmentType: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-primary border border-slate-200 dark:border-light-dark/10 focus:border-primary dark:focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 dark:text-light/70 font-semibold uppercase tracking-wider block mb-1">Job Status</label>
                      <select
                        value={careerForm.status}
                        onChange={(e) => setCareerForm({ ...careerForm, status: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-primary border border-slate-200 dark:border-light-dark/10 focus:border-primary dark:focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                      >
                        <option value="Open">Open (Active Listings)</option>
                        <option value="Closed">Closed (Hidden/Archived)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-500 dark:text-light/70 font-semibold uppercase tracking-wider block mb-1">Application Email Receiver</label>
                      <input
                        type="email"
                        required
                        value={careerForm.applyEmail}
                        onChange={(e) => setCareerForm({ ...careerForm, applyEmail: e.target.value })}
                        placeholder="careers@company.com"
                        className="w-full bg-slate-50 dark:bg-primary border border-slate-200 dark:border-light-dark/10 focus:border-primary dark:focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-450 dark:placeholder-light/30 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 dark:text-light/70 font-semibold uppercase tracking-wider block mb-1">Job Description & Deliverables</label>
                    <textarea
                      rows="5"
                      required
                      value={careerForm.description}
                      onChange={(e) => setCareerForm({ ...careerForm, description: e.target.value })}
                      placeholder="Outline core requirements, duties, tech stacks..."
                      className="w-full bg-slate-50 dark:bg-primary border border-slate-200 dark:border-light-dark/10 focus:border-primary dark:focus:border-secondary rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-450 dark:placeholder-light/30 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="border-t border-slate-200 dark:border-light-dark/10 pt-4 flex items-center justify-end space-x-3 bg-slate-50 dark:bg-primary-dark/45 -mx-6 -mb-6 p-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-600 dark:bg-primary dark:border-light-dark/10 dark:hover:bg-primary-dark dark:text-light/80 dark:hover:text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="glow-btn-green py-2.5 px-6 rounded-xl text-xs font-bold flex items-center space-x-1.5"
                >
                  <Check size={14} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
