import React from "react";

export default function Footer() {
  return (
   <footer className="w-full bg-gray-900 text-white py-8 mt-10">
<div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
{/* Logo + Name */}
<div>
<div className="flex items-center gap-2 mb-3">
<span className="text-2xl">📘</span>
<h2 className="font-bold text-lg">Student Life Lessons</h2>
</div>
<p className="text-gray-300 text-sm">
Learn, Grow & Improve your daily student life with real experiences.
</p>
</div>


{/* Quick Links */}
<div>
<h3 className="font-semibold mb-3">Quick Links</h3>
<ul className="space-y-2 text-gray-300">
<li><a href="/" className="hover:text-blue-400">Home</a></li>
<li><a href="/public-lessons" className="hover:text-blue-400">Public Lessons</a></li>
<li><a href="/pricing" className="hover:text-blue-400">Pricing</a></li>
<li><a href="/about" className="hover:text-blue-400">About</a></li>
</ul>
</div>


{/* Contact + Social */}
<div>
<h3 className="font-semibold mb-3">Contact Info</h3>
<p className="text-gray-300 text-sm">Email: support@lifelessons.com</p>
<p className="text-gray-300 text-sm">Phone: +880 1234-567890</p>


<h3 className="font-semibold mt-4 mb-2">Follow Us</h3>
<div className="flex gap-4 text-lg">
<a href="#" className="hover:text-blue-400">🌐</a>
<a href="#" className="hover:text-blue-400">📘</a>
<a href="#" className="hover:text-blue-400">▶️</a>
</div>
</div>
</div>


<div className="text-center text-gray-400 text-sm mt-8 border-t border-gray-700 pt-4">
© {new Date().getFullYear()} Student Life Lessons — All Rights Reserved.
</div>
</footer>
  );
};
 
