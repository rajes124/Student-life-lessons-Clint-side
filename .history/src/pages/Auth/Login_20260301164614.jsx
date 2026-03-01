// src/pages/Auth/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";

// Heroicons import (professional icons)
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!password.trim()) {
      toast.error("Please enter your password");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
      navigate('/'); // Redirect to home page
    } catch (error) {
      toast.error(
        error.message.includes("wrong-password")
          ? "Incorrect password"
          : error.message.includes("user-not-found")
          ? "Email not found"
          : "Login failed. Please try again."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Successfully logged in with Google!');
      navigate('/');
    } catch (error) {
      toast.error("Google login failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video – responsive & optimized */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/background.mp4" type="video/mp4" />
        {/* Fallback image – mobile/tablet/desktop সবার জন্য */}
        <img
          src="https://images.unsplash.com/photo-1557683316-973673baf926?w=1600"
          alt="Fallback background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </video>

      {/* Dark Overlay – dynamic opacity */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>

      {/* Login Card – fully responsive, glassmorphism, dynamic sizing */}
      <div className="
        relative z-10 
        bg-white/10 backdrop-blur-2xl border border-white/20 
        rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 
        w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl mx-4 md:mx-8
        transition-all duration-500
      ">
        {/* Header with animation */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center mb-8 md:mb-10 tracking-tight drop-shadow-lg">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
          {/* Email Field */}
          <div className="relative">
            <label className="block text-white/90 font-medium mb-2 text-sm sm:text-base">Email</label>
            <div className="relative">
              <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="
                  w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl 
                  bg-white/15 border border-white/30 text-white 
                  placeholder-white/60 focus:outline-none 
                  focus:ring-2 focus:ring-indigo-400/70 focus:border-transparent 
                  transition-all duration-300 text-sm sm:text-base
                "
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block text-white/90 font-medium mb-2 text-sm sm:text-base">Password</label>
            <div className="relative">
              <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="
                  w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl 
                  bg-white/15 border border-white/30 text-white 
                  placeholder-white/60 focus:outline-none 
                  focus:ring-2 focus:ring-indigo-400/70 focus:border-transparent 
                  transition-all duration-300 text-sm sm:text-base
                "
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 sm:py-4 mt-2 
              bg-gradient-to-r from-indigo-600 to-purple-600 
              hover:from-indigo-700 hover:to-purple-700 
              text-white font-semibold rounded-xl shadow-lg 
              transition-all duration-400 transform 
              hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/40 
              disabled:opacity-60 disabled:cursor-not-allowed 
              flex items-center justify-center gap-2 text-base sm:text-lg
            "
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="
            w-full mt-5 py-3 sm:py-4 
            bg-white/90 hover:bg-white text-gray-900 
            font-semibold rounded-xl shadow-lg 
            transition-all duration-300 flex items-center justify-center gap-3 
            hover:shadow-xl hover:scale-[1.02] disabled:opacity-60
          "
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-6 h-6 sm:w-7 sm:h-7"
          />
          Sign in with Google
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-white/80 mt-6 text-sm sm:text-base">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-indigo-300 hover:text-indigo-100 underline font-medium transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;