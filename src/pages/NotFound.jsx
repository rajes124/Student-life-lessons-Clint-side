// src/pages/NotFound.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, HomeIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center">
        {/* Large 404 Text with subtle animation */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-white/10 tracking-widest select-none animate-pulse">
          404
        </h1>

        {/* Main Heading */}
        <div className="relative -mt-12">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Oops! Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            The wisdom you're seeking seems to have wandered off the path. 
            Don't worry — even the greatest journeys sometimes take unexpected turns.
          </p>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-4 my-10">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          <div className="w-12 h-12 rounded-full bg-purple-500/20 border-2 border-purple-400 flex items-center justify-center">
            <BookOpenIcon className="w-6 h-6 text-purple-300" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-purple-500 to-transparent"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg rounded-xl shadow-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-indigo-500/50"
          >
            <HomeIcon className="w-6 h-6 group-hover:-translate-x-1 transition" />
            Back to Home
          </Link>

          <Link
            to="/public-lessons"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white font-semibold text-lg rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <BookOpenIcon className="w-6 h-6" />
            Explore Public Lessons
          </Link>
        </div>

        {/* Fun Message */}
        <p className="mt-16 text-white/50 text-lg italic">
          "Not all those who wander are lost." – J.R.R. Tolkien
        </p>
      </div>
    </div>
  );
};

export default NotFound;