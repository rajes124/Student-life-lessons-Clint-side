// src/pages/Auth/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";

// Icons
import {
  UserIcon,
  EnvelopeIcon,
  PhotoIcon,
  LockClosedIcon,
  ArrowRightCircleIcon,
  SparklesIcon,
  EyeIcon,
  EyeSlashIcon,
  CameraIcon
} from "@heroicons/react/24/outline";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photoURL: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, photoURL } = formData;

    if (!name.trim() || !email.trim() || !password.trim()) {
      return toast.error("All required fields must be filled");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL || null,
      });

      toast.success('Account Created Successfully!');
      navigate('/login');
    } catch (error) {
      toast.error(error.message.includes("email-already-in-use") ? "Email already exists" : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Signed up with Google!');
      navigate('/');
    } catch (error) {
      toast.error("Google sync failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] py-12">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        <video className="w-full h-full object-cover opacity-60 scale-105" autoPlay muted loop playsInline>
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-black/80 to-purple-900/40"></div>
        <div className="absolute inset-0 backdrop-blur-[3px]"></div>
      </div>

      {/* --- REGISTER CARD --- */}
      <div className="relative z-10 w-full max-w-2xl px-4 animate-fadeInUp">
        <div className={`
          relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 
          shadow-[0_0_100px_rgba(79,70,229,0.15)] transition-all duration-700
          ${loading ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}
        `}>
          
          {/* Live Profile Picture Preview */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              <img 
                src={formData.photoURL || "https://i.ibb.co/9yK7qfM/user.png"} 
                alt="Profile Preview" 
                className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-2xl object-cover z-10 p-1 bg-[#1a1a1a] transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { e.target.src = "https://i.ibb.co/9yK7qfM/user.png" }}
              />
              <div className="absolute bottom-1 right-1 z-20 bg-indigo-600 p-2 rounded-full border-4 border-[#0f0f0f] text-white shadow-lg">
                <CameraIcon className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-white/80 text-sm font-black uppercase tracking-[0.2em] mt-4">Your Profile Photo</h3>
          </div>

          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tighter">
              Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Account</span>
            </h1>
          </header>

          <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Name Field */}
            <div className="relative group md:col-span-1">
              <UserIcon className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isFocused === 'name' ? 'text-indigo-400' : 'text-white/30'}`} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onFocus={() => setIsFocused('name')}
                onBlur={() => setIsFocused(null)}
                onChange={handleChange}
                className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-500"
                required
              />
            </div>

            {/* Email Field */}
            <div className="relative group md:col-span-1">
              <EnvelopeIcon className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isFocused === 'email' ? 'text-indigo-400' : 'text-white/30'}`} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onFocus={() => setIsFocused('email')}
                onBlur={() => setIsFocused(null)}
                onChange={handleChange}
                className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-500"
                required
              />
            </div>

            {/* Profile Picture URL Field */}
            <div className="relative group md:col-span-2">
              <PhotoIcon className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isFocused === 'photo' ? 'text-purple-400' : 'text-white/30'}`} />
              <input
                type="url"
                name="photoURL"
                placeholder="Profile Picture URL"
                onFocus={() => setIsFocused('photo')}
                onBlur={() => setIsFocused(null)}
                onChange={handleChange}
                className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-500"
              />
            </div>

            {/* Password Field */}
            <div className="relative group md:col-span-2">
              <LockClosedIcon className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isFocused === 'password' ? 'text-purple-400' : 'text-white/30'}`} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Strong Password"
                onFocus={() => setIsFocused('password')}
                onBlur={() => setIsFocused(null)}
                onChange={handleChange}
                className="w-full pl-14 pr-14 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-2xl shadow-2xl hover:shadow-indigo-500/40 transition-all duration-500 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                {loading ? (
                  <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span className="tracking-widest uppercase text-sm">Create Account Now</span>
                    <ArrowRightCircleIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Social Integration Section (Existing) */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
            <span className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] text-white/30">
              <span className="bg-[#0f0f0f] px-4">Instant Connect</span>
            </span>
          </div>

          <button
            onClick={handleGoogleRegister}
            className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 flex items-center justify-center gap-4 transition-all duration-300 group"
          >
            <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="google" />
            Sign up with Google
          </button>

          <footer className="mt-8 text-center">
            <p className="text-white/40 text-sm font-medium">
              Already a member?{' '}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors underline-offset-4 hover:underline">
                Access Account
              </Link>
            </p>
          </footer>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.2, 1, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Register;