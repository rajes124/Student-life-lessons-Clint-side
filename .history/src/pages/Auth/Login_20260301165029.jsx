// src/pages/Auth/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";

// Icons
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  EyeIcon, 
  EyeSlashIcon,
  ArrowRightCircleIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(null);
  const navigate = useNavigate();

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return toast.error("Credentials required");

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success('Access Granted!');
      navigate('/');
    } catch (error) {
      toast.error("Auth failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Verified with Google');
      navigate('/');
    } catch (error) {
      toast.error("Google sync failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-60 scale-110"
          autoPlay muted loop playsInline
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        {/* Advanced Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-black/80 to-purple-900/40"></div>
        <div className="absolute inset-0 backdrop-blur-[3px]"></div>
      </div>

      {/* --- MOVING PARTICLES (CSS ONLY) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* --- LOGIN CONTAINER --- */}
      <div className="relative z-10 w-full max-w-xl px-4 py-10">
        
        {/* Dynamic Card */}
        <div className={`
          relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-14 
          shadow-[0_0_100px_rgba(79,70,229,0.15)] transition-all duration-700
          ${loading ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}
        `}>
          
          {/* Top Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest animate-pulse">
              <SparklesIcon className="w-4 h-4" />
              Secure Gateway
            </div>
          </div>

          <header className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
              Portal <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Login</span>
            </h1>
            <p className="text-white/40 font-medium italic">Experience the next generation of student life</p>
          </header>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Field */}
            <div className="relative group">
              <div className={`absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors ${isFocused === 'email' ? 'text-indigo-400' : 'text-white/30'}`}>
                <EnvelopeIcon className="w-6 h-6" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Institutional Email"
                onFocus={() => setIsFocused('email')}
                onBlur={() => setIsFocused(null)}
                onChange={handleChange}
                className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 transition-all duration-500 hover:border-white/20"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative group">
              <div className={`absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors ${isFocused === 'password' ? 'text-purple-400' : 'text-white/30'}`}>
                <LockClosedIcon className="w-6 h-6" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Secret Key"
                onFocus={() => setIsFocused('password')}
                onBlur={() => setIsFocused(null)}
                onChange={handleChange}
                className="w-full pl-14 pr-14 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/10 transition-all duration-500 hover:border-white/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                {showPassword ? <EyeSlashIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full overflow-hidden group py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-2xl shadow-2xl hover:shadow-indigo-500/40 transition-all duration-500 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              {loading ? (
                <div className="w-7 h-7 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="tracking-[0.2em] uppercase">Authorize</span>
                  <ArrowRightCircleIcon className="w-6 h-6 group-hover:rotate-[-45deg] transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-10">
            <div className="relative flex items-center justify-center mb-8">
              <div className="w-full h-px bg-white/10"></div>
              <span className="absolute px-4 text-[10px] uppercase tracking-[0.4em] text-white/30 bg-transparent backdrop-blur-3xl">Decentralized Auth</span>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full py-4 bg-white hover:bg-gray-100 text-black font-bold rounded-2xl flex items-center justify-center gap-4 transition-all duration-300 transform hover:scale-[1.02]"
            >
              <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" className="w-6 h-6" alt="google" />
              Sync with Google
            </button>
          </div>

          <footer className="mt-10 text-center">
            <p className="text-white/40 text-sm font-medium">
              Don't have clearance?{' '}
              <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors">
                Initialize Account
              </Link>
            </p>
          </footer>
        </div>
      </div>

      {/* --- CUSTOM STYLES --- */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s cubic-bezier(0.2, 1, 0.2, 1) forwards;
        }

        /* Particle CSS */
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: float 20s infinite linear;
        }
        .particle:nth-child(1) { top: 20%; left: 10%; animation-duration: 15s; }
        .particle:nth-child(2) { top: 60%; left: 80%; animation-duration: 25s; }
        .particle:nth-child(3) { top: 40%; left: 40%; animation-duration: 20s; }

        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(50vw); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Login;