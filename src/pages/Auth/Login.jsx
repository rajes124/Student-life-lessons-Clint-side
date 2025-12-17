// src/pages/Auth/Login.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("ইমেইল দিন");
      return;
    }
    if (!password.trim()) {
      toast.error("পাসওয়ার্ড দিন");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('সফলভাবে লগইন হয়েছে!');
      navigate('/'); // ← Home page-এ নিয়ে যাবে
    } catch (error) {
      toast.error("লগইন ব্যর্থ হয়েছে");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Google দিয়ে লগইন সফল!');
      navigate('/'); // ← Home page-এ নিয়ে যাবে
    } catch (error) {
      toast.error("Google লগইন ব্যর্থ");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-md mx-4">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-white/90 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="আপনার ইমেইল দিন"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div>
            <label className="block text-white/90 font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="পাসওয়ার্ড দিন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105 disabled:opacity-70"
          >
            {loading ? "লগইন হচ্ছে..." : "Login"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full mt-4 py-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded-lg shadow-lg flex items-center justify-center gap-3 transition"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>

        <p className="text-center text-white/80 mt-6">
          অ্যাকাউন্ট নেই?{' '}
          <Link to="/register" className="text-indigo-300 hover:text-indigo-200 underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;