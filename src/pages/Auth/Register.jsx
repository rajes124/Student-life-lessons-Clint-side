// src/pages/Auth/Register.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from "../../firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const navigate = useNavigate();

  const validatePassword = (pass) => {
    if (pass.length < 6) return 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে';
    if (!/[A-Z]/.test(pass)) return 'পাসওয়ার্ডে একটি বড় হাতের অক্ষর (A-Z) থাকতে হবে';
    if (!/[a-z]/.test(pass)) return 'পাসওয়ার্ডে একটি ছোট হাতের অক্ষর (a-z) থাকতে হবে';
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL || null,
      });

      await setDoc(doc(db, "users", user.uid), {
        displayName: name,
        email: email,
        photoURL: photoURL || null,
        role: "user",
        isPremium: false,
        createdAt: new Date(),
      });

      toast.success('সফলভাবে রেজিস্টার হয়েছে!');
      navigate('/login'); // Register করার পর Login page-এ যাবে
    } catch (error) {
      toast.error(error.message || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে');
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL || null,
          role: "user",
          isPremium: false,
          createdAt: new Date(),
        });
      }

      toast.success('Google দিয়ে রেজিস্টার সফল!');
      navigate('/login'); // Google register-এর পরও Login page-এ যাবে
    } catch (error) {
      toast.error(error.message || 'Google রেজিস্ট্রেশন ব্যর্থ');
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

      {/* Register Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-md mx-4">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-white/90 font-medium mb-2">Name</label>
            <input
              type="text"
              placeholder="আপনার নাম"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div>
            <label className="block text-white/90 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="আপনার ইমেইল"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div>
            <label className="block text-white/90 font-medium mb-2">Photo URL (optional)</label>
            <input
              type="url"
              placeholder="https://example.com/photo.jpg"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
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
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <button
          onClick={handleGoogleRegister}
          className="w-full mt-4 py-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded-lg shadow-lg flex items-center justify-center gap-3 transition duration-300"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5"
          />
          Sign up with Google
        </button>

        <p className="text-center text-white/80 mt-6">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
          <Link to="/login" className="text-indigo-300 hover:text-indigo-200 underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;