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
  Github,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-indigo-950 text-white pt-16 pb-12 mt-24 overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-indigo-950 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(129,140,248,0.15),transparent_40%)] animate-slow-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.12),transparent_40%)] animate-slow-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
        {/* Brand & Tagline */}
        <div className="space-y-5 animate-fade-in-up">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-3">
            <Heart className="w-7 h-7 text-amber-400 animate-pulse-slow" />
            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Student Life Lessons
            </span>
          </h3>
          <p className="text-indigo-200/90 leading-relaxed text-base sm:text-lg">
            Preserve wisdom.<br />
            Grow together.<br />
            Learn for life.
          </p>
        </div>

        {/* Quick Links */}
        <div className="animate-fade-in-up animation-delay-100">
          <h4 className="text-xl font-semibold mb-5 tracking-wide">Quick Links</h4>
          <ul className="space-y-3.5 text-indigo-200/90">
            {[
              { to: "/", label: "Home" },
              { to: "/public-lessons", label: "Public Lessons" },
              { to: "/pricing", label: "Pricing" },
              { to: "/terms", label: "Terms & Conditions" },
              { to: "/privacy", label: "Privacy Policy" },
            ].map((item, i) => (
              <li
                key={item.to}
                className="animate-fade-in-up"
                style={{ animationDelay: `${150 + i * 80}ms` }}
              >
                <Link
                  to={item.to}
                  className="group flex items-center gap-2.5 text-base hover:text-amber-300 transition-all duration-300 hover:translate-x-2 hover:font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 group-hover:bg-amber-400 transition-colors"></span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="animate-fade-in-up animation-delay-200 space-y-5">
          <h4 className="text-xl font-semibold mb-5 tracking-wide">Contact Us</h4>
          <div className="space-y-4 text-indigo-200/90 text-base">
            {[
              { icon: Mail, text: "support@studentlifelessons.com", href: "mailto:support@studentlifelessons.com" },
              { icon: Phone, text: "+880 1332-502004", href: "tel:+8801332502004" },
              { icon: MapPin, text: "Level-4, 34 Awal Centre, Banani, Dhaka" },
            ].map((item, i) => (
              <a
                key={item.text}
                href={item.href}
                className="flex items-start gap-3 hover:text-amber-300 transition-all duration-300 group"
                style={{ animationDelay: `${300 + i * 100}ms` }}
              >
                <item.icon className="w-5 h-5 mt-0.5 flex-shrink-0 text-indigo-400 group-hover:text-amber-400 transition-colors" />
                <span className="group-hover:underline group-hover:underline-offset-4">{item.text}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="animate-fade-in-up animation-delay-300">
          <h4 className="text-xl font-semibold mb-5 tracking-wide">Follow Us</h4>
          <div className="flex flex-wrap gap-6">
            {[
              { href: "https://github.com/rajes124", icon: Github, label: "GitHub" },
              { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
              { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
              { href: "https://www.linkedin.com/in/rajes-rishi/", icon: Linkedin, label: "LinkedIn" },
            ].map((social, i) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl hover:text-amber-300 transition-all duration-300 hover:scale-125 hover:-translate-y-1 active:scale-110"
                aria-label={social.label}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <social.icon className="drop-shadow-md" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider with subtle gradient */}
      <div className="relative mt-16 mx-auto max-w-5xl h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>

      {/* Bottom Bar */}
      <div className="relative mt-8 text-center text-indigo-300/80 text-sm flex flex-col sm:flex-row justify-center items-center gap-3 px-6">
        <span>© {new Date().getFullYear()} Student Life Lessons. All rights reserved.</span>
        <span className="hidden sm:inline">•</span>
        <span className="flex items-center gap-2">
          Made with
          <Heart className="w-4 h-4 text-red-400 fill-red-400 animate-heart-pulse" />
          in Bangladesh
        </span>
      </div>
    </footer>
  );
};

export default Footer;