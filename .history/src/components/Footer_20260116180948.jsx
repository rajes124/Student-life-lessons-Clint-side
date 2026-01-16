// src/components/Footer.jsx
import { Link } from "react-router-dom";
import {
  Facebook,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-indigo-900 text-white py-14 mt-20 overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-800/40 via-indigo-900 to-purple-900/40 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">

        {/* Brand & Tagline */}
        <div className="space-y-4 animate-fadeUp">
          <h3 className="text-2xl font-bold tracking-wide flex items-center gap-2">
            <Heart className="w-6 h-6 text-amber-400" />
            Student Life Lessons
          </h3>
          <p className="text-indigo-200 leading-relaxed">
            Preserve wisdom. <br />
            Grow together. <br />
            Learn for life.
          </p>
        </div>

        {/* Quick Links */}
        <div className="animate-fadeUp delay-100">
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3 text-indigo-200">
            <li>
              <Link
                className="flex items-center gap-2 hover:text-amber-400 hover:translate-x-1 transition-all duration-300"
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 hover:text-amber-400 hover:translate-x-1 transition-all duration-300"
                to="/public-lessons"
              >
                Public Lessons
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 hover:text-amber-400 hover:translate-x-1 transition-all duration-300"
                to="/pricing"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 hover:text-amber-400 hover:translate-x-1 transition-all duration-300"
                to="/terms"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 hover:text-amber-400 hover:translate-x-1 transition-all duration-300"
                to="/privacy"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="animate-fadeUp delay-200 space-y-4">
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <div className="space-y-3 text-indigo-200">
            <p className="flex items-center gap-3 hover:text-amber-400 transition">
              <Mail className="w-5 h-5" />
              support@studentlifelessons.com
            </p>
            <p className="flex items-center gap-3 hover:text-amber-400 transition">
              <Phone className="w-5 h-5" />
              +880 1332-502004
            </p>
            <p className="flex items-center gap-3 hover:text-amber-400 transition">
              <MapPin className="w-5 h-5" />
              Level-4, 34 Awal Centre, Banani, Dhaka
            </p>
          </div>
        </div>

        {/* Social Media */}
        <div className="animate-fadeUp delay-300">
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-6 items-center">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-amber-400 hover:scale-110 transition-all duration-300"
            >
              <Twitter className="w-7 h-7" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-amber-400 hover:scale-110 transition-all duration-300"
            >
              <Facebook className="w-7 h-7" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-amber-400 hover:scale-110 transition-all duration-300"
            >
              <Linkedin className="w-7 h-7" />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative border-t border-indigo-700/50 mt-12 mx-auto max-w-6xl"></div>

      {/* Bottom Bar */}
      <div className="relative text-center mt-8 text-indigo-300 text-sm flex flex-col md:flex-row justify-center items-center gap-2">
        <span>© {new Date().getFullYear()} Student Life Lessons. All rights reserved.</span>
        <span className="hidden md:inline">•</span>
        <span className="flex items-center gap-1">
          Made with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> in Bangladesh
        </span>
      </div>
    </footer>
  );
};

export default Footer;