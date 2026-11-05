import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Lock, User, AlertCircle, Sparkles, Users, Key, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { admin, login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (admin) {
      navigate('/admin/dashboard');
    }
  }, [admin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const result = await login(username, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setErrorMsg(result.message || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F6F9FA] dark:bg-primary transition-colors duration-300 relative">
      {/* Background glow elements */}
      <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      {/* Left Column: Office Illustration (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 bg-transparent relative">
        <div className="w-full max-w-lg space-y-6">
          {/* Office Desk SVG Illustration matching mockup */}
          <svg viewBox="0 0 800 600" className="w-full drop-shadow-md">
            {/* Wall Clock */}
            <circle cx="420" cy="120" r="45" fill="none" stroke="#1E378B" strokeWidth="8" />
            <line x1="420" y1="120" x2="420" y2="95" stroke="#1E378B" strokeWidth="6" strokeLinecap="round" />
            <line x1="420" y1="120" x2="445" y2="135" stroke="#1E378B" strokeWidth="6" strokeLinecap="round" />

            {/* Calendar on Wall */}
            <rect x="80" y="180" width="120" height="100" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="2" />
            <rect x="80" y="180" width="120" height="25" rx="8" fill="#1E378B" />
            <rect x="80" y="195" width="120" height="10" fill="#1E378B" />
            {/* Calendar Grid Lines */}
            <line x1="100" y1="220" x2="180" y2="220" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="100" y1="240" x2="180" y2="240" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="100" y1="260" x2="180" y2="260" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" />
            {/* X mark on calendar (Leaf Green) */}
            <line x1="110" y1="230" x2="120" y2="240" stroke="#75BB3F" strokeWidth="3" strokeLinecap="round" />
            <line x1="120" y1="230" x2="110" y2="240" stroke="#75BB3F" strokeWidth="3" strokeLinecap="round" />

            {/* Desk */}
            <rect x="90" y="410" width="480" height="18" fill="#1E378B" rx="4" />
            <line x1="130" y1="428" x2="110" y2="540" stroke="#314FA7" strokeWidth="6" strokeLinecap="round" />
            <line x1="130" y1="428" x2="170" y2="540" stroke="#314FA7" strokeWidth="6" strokeLinecap="round" />
            <line x1="117" y1="490" x2="163" y2="490" stroke="#314FA7" strokeWidth="3" />
            
            <line x1="530" y1="428" x2="510" y2="540" stroke="#314FA7" strokeWidth="6" strokeLinecap="round" />
            <line x1="530" y1="428" x2="570" y2="540" stroke="#314FA7" strokeWidth="6" strokeLinecap="round" />
            <line x1="517" y1="490" x2="563" y2="490" stroke="#314FA7" strokeWidth="3" />

            {/* Computer Monitor */}
            <rect x="230" y="280" width="180" height="120" rx="12" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
            <rect x="240" y="290" width="160" height="100" rx="4" fill="white" />
            {/* Screen content (Mountain vector style) */}
            <path d="M245 365 L290 320 L320 350 L360 310 L395 365 Z" fill="#314FA7" opacity="0.15" />
            <rect x="340" y="300" width="40" height="4" fill="#cbd5e1" rx="2" />
            <rect x="340" y="310" width="40" height="4" fill="#cbd5e1" rx="2" />
            <rect x="340" y="320" width="30" height="4" fill="#cbd5e1" rx="2" />
            {/* Monitor Stand */}
            <path d="M305 400 L295 428 L345 428 L335 400 Z" fill="#cbd5e1" />
            <rect x="290" y="425" width="60" height="5" fill="#94a3b8" rx="2.5" />

            {/* Lamp */}
            <path d="M430 428 L460 310 L390 320" fill="none" stroke="#1E378B" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            {/* Lamp head */}
            <path d="M375 305 L415 325 L405 340 L365 320 Z" fill="#1E378B" />
            <path d="M375 305 A15 15 0 0 1 365 320 Z" fill="#cbd5e1" />
            {/* Lamp base */}
            <path d="M410 428 A20 20 0 0 1 450 428 Z" fill="#314FA7" />
            {/* Light Cone */}
            <polygon points="370,323 230,410 400,410" fill="yellow" opacity="0.08" />

            {/* Coffee Mug */}
            <rect x="135" y="380" width="25" height="30" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <path d="M160 387 A6 6 0 0 1 160 403" fill="none" stroke="#cbd5e1" strokeWidth="2.5" />

            {/* Office Chair */}
            <rect x="200" y="340" width="110" height="150" rx="16" fill="#314FA7" />
            {/* Backrest detail */}
            <rect x="205" y="345" width="100" height="100" rx="12" fill="#1E378B" />
            {/* Seat */}
            <rect x="195" y="445" width="120" height="20" rx="8" fill="#314FA7" />
            {/* Armrest */}
            <path d="M200 400 H310" stroke="#112361" strokeWidth="8" strokeLinecap="round" />
            {/* Chair base */}
            <line x1="255" y1="465" x2="255" y2="520" stroke="#112361" strokeWidth="10" />
            {/* Legs */}
            <line x1="255" y1="520" x2="210" y2="550" stroke="#112361" strokeWidth="8" strokeLinecap="round" />
            <line x1="255" y1="520" x2="300" y2="550" stroke="#112361" strokeWidth="8" strokeLinecap="round" />
            <line x1="255" y1="520" x2="255" y2="555" stroke="#112361" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Right Column: Login Card Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 z-10">
        <div className="w-full max-w-md bg-white dark:bg-primary-dark/85 rounded-3xl p-8 sm:p-10 shadow-premium border border-slate-100 dark:border-light-dark/10 relative">
          
          {/* Mockup Header: Dashboard Login with Logo */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-light-dark/5 pb-4 mb-6 relative">
            <div className="flex items-center space-x-3">
              <Users className="text-primary dark:text-secondary animate-pulse" size={26} />
              <span className="text-slate-900 dark:text-white font-bold tracking-wide text-xs uppercase">Dashboard Login</span>
            </div>
            <img
              src="/logo 2.png"
              alt="Talent Carpet Logo"
              loading="lazy"
              className="w-10 h-10 object-contain rounded-lg border border-slate-100 bg-white p-1"
            />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight uppercase font-serif">Welcome Back</h2>
            <p className="text-slate-500 dark:text-light/70 text-xs mt-1 font-medium">
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 bg-red-500/10 border border-red-500/30 p-4 rounded-2xl flex items-center space-x-3 text-red-500 text-xs animate-shake">
              <AlertCircle size={18} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-[10px] text-slate-500 dark:text-light/70 font-semibold uppercase tracking-widest block mb-2 font-sans">Username</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-light/35">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  className="w-full bg-slate-50 dark:bg-primary border border-slate-200 dark:border-light-dark/10 focus:border-primary dark:focus:border-secondary rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-light/35 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-500 dark:text-light/70 font-semibold uppercase tracking-widest block mb-2 font-sans">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-light/35">
                  <Lock size={16} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter secure password"
                  className="w-full bg-slate-50 dark:bg-primary border border-slate-200 dark:border-light-dark/10 focus:border-primary dark:focus:border-secondary rounded-xl pl-11 pr-11 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-light/35 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-light/40 dark:hover:text-white focus:outline-none transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-dark text-white py-3.5 rounded-xl flex items-center justify-center space-x-2 font-bold transition-all duration-300 disabled:opacity-50 text-sm shadow-md"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Login to My Account</span>
                  <Sparkles size={14} className="animate-pulse text-amber-400 fill-amber-400" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center space-x-1.5 mt-4 text-[11px] font-semibold text-slate-500 dark:text-light/60 tracking-wider uppercase">
              <Sparkles size={13} className="animate-pulse text-amber-500 fill-amber-500" />
              <span>Secure Admin Access</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
