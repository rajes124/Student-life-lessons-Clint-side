// src/pages/Auth/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";

// Heroicons import (professional icons)
import {
  UserIcon,
  EnvelopeIcon,
  PhotoIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!password.trim()) {
      toast.error("Please enter your password");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL || null,
      });

      toast.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      let errorMsg = "Registration failed. Please try again.";
      if (error.message.includes("email-already-in-use")) {
        errorMsg = "This email is already in use";
      } else if (error.message.includes("invalid-email")) {
        errorMsg = "Invalid email format";
      } else if (error.message.includes("weak-password")) {
        errorMsg = "Password is too weak";
      }
      toast.error(errorMsg);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Successfully signed up with Google!');
      navigate('/');
    } catch (error) {
      toast.error("Google sign up failed");
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
        {/* Fallback image if video fails */}
        <img
          src="https://images.unsplash.com/photo-1557683316-973673baf926"
          alt="Fallback background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Register Card – responsive */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-md sm:max-w-lg mx-4 md:mx-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Name Field with Icon */}
          <div className="relative">
            <label className="block text-white/90 font-medium mb-2">Name</label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>
          </div>

          {/* Email Field with Icon */}
          <div className="relative">
            <label className="block text-white/90 font-medium mb-2">Email</label>
            <div className="relative">
              <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>
          </div>

          {/* Photo URL Field with Icon */}
          <div className="relative">
            <label className="block text-white/90 font-medium mb-2">Photo URL (optional)</label>
            <div className="relative">
              <PhotoIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>
          </div>

          {/* Password Field with Icon */}
          <div className="relative">
            <label className="block text-white/90 font-medium mb-2">Password</label>
            <div className="relative">
              <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105 disabled:opacity-70 flex items-center justify-center gap-2"
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
                Signing up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <button
          onClick={handleGoogleRegister}
          disabled={loading}
          className="w-full mt-4 py-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded-lg shadow-lg flex items-center justify-center gap-3 transition"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-6 h-6"
          />
          Sign up with Google
        </button>

        <p className="text-center text-white/80 mt-6 text-sm sm:text-base">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-indigo-300 hover:text-indigo-200 underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;