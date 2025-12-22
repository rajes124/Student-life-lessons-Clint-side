import { Link } from "react-router-dom";
import { Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-indigo-900 text-white py-14 mt-20 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-800/40 via-indigo-900 to-purple-900/40 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="space-y-4 animate-fadeUp">
          <h3 className="text-2xl font-bold tracking-wide">
            Student Life Lessons
          </h3>
          <p className="text-indigo-200 leading-relaxed">
            Preserve wisdom. <br /> Grow together.
          </p>
        </div>

        {/* Quick Links */}
        <div className="animate-fadeUp delay-100">
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-indigo-200">
            <li>
              <Link className="hover:text-amber-400 transition" to="/">Home</Link>
            </li>
            <li>
              <Link className="hover:text-amber-400 transition" to="/public-lessons">
                Public Lessons
              </Link>
            </li>
            <li>
              <Link className="hover:text-amber-400 transition" to="/pricing">
                Pricing
              </Link>
            </li>
            <li>
              <Link className="hover:text-amber-400 transition" to="/terms">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="animate-fadeUp delay-200">
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <p className="text-indigo-200 hover:text-amber-400 transition">
            support@studentlifelessons.com
          </p>
        </div>

        {/* Social */}
        <div className="animate-fadeUp delay-300">
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4 items-center">
            <span className="text-2xl cursor-pointer hover:scale-110 hover:text-amber-400 transition">
              𝕏
            </span>
            <Facebook className="cursor-pointer hover:scale-110 hover:text-amber-400 transition" />
            <Linkedin className="cursor-pointer hover:scale-110 hover:text-amber-400 transition" />
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="relative border-t border-indigo-700 mt-10"></div>

      {/* Bottom */}
      <div className="relative text-center mt-6 text-indigo-300 text-sm">
        © 2025 Student Life Lessons. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
