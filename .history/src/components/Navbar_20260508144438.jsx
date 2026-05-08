// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import {
  Home,
  BookOpen,
  BookMarked,
  Users,
  UserCog,
  LogOut,
  Menu,
  X,
  CreditCard,
  LayoutDashboard,
  Settings,
  User,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Moon,
  Sun,
} from "lucide-react";

const Navbar = () => {
  const { currentUser, userData } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      setProfileOpen(false);
      setMobileOpen(false);
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold relative flex items-center gap-2 after:absolute after:bottom-[-6px] after:left-0 after:h-0.5 after:w-full after:bg-primary after:transition-all after:duration-300"
      : "relative flex items-center gap-2 text-base-content hover:text-primary transition-colors duration-300 after:absolute after:bottom-[-6px] after:left-1/2 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full";

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        bg-base-100/80 backdrop-blur-xl border-b border-base-300/50 shadow-sm
        transition-all duration-500
        ${mobileOpen ? "shadow-2xl" : ""}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo – shortened name + balanced size */}
        <Link
          to="/"
          className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-indigo-700 flex items-center gap-2 group transition-transform duration-300 hover:scale-105 active:scale-100"
        >
          <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 text-indigo-600 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-400" />
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            SLL
            {/* Alternative options you can use instead:
                Student Lessons
                S Life Lessons
                StudLessons
            */}
          </span>
        </Link>

        {/* Center Menu - Tablet & Desktop */}
        <div className="hidden md:flex flex-1 justify-center gap-5 lg:gap-8 xl:gap-10">
          {currentUser ? (
            <>
              <NavLink to="/" className={navLinkClass}>
                <Home className="w-5 h-5" />
                Home
              </NavLink>
              <NavLink to="/dashboard/add-lesson" className={navLinkClass}>
                <BookOpen className="w-5 h-5" />
                Add Lesson
              </NavLink>
              <NavLink to="/dashboard/my-lessons" className={navLinkClass}>
                <BookMarked className="w-5 h-5" />
                My Lessons
              </NavLink>
              <NavLink to="/public-lessons" className={navLinkClass}>
                <Users className="w-5 h-5" />
                Public Lessons
              </NavLink>
              <NavLink to="/pricing" className={navLinkClass}>
                <CreditCard className="w-5 h-5" />
                Pricing
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" className={navLinkClass}>
                <Home className="w-5 h-5" />
                Home
              </NavLink>
              <NavLink to="/public-lessons" className={navLinkClass}>
                <BookOpen className="w-5 h-5" />
                Lessons
              </NavLink>
              <NavLink to="/pricing" className={navLinkClass}>
                <CreditCard className="w-5 h-5" />
                Premium
              </NavLink>
            </>
          )}
        </div>

        {/* Right Side - Tablet & Desktop */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-8">
          {currentUser ? (
            <>
              {/* Profile Dropdown – animated */}
              <div className="relative">
                <button
                  type="button"
                  className="group flex items-center gap-3 focus:outline-none"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <div className="relative">
                    <img
                      src={currentUser.photoURL || "https://i.ibb.co/9yK7qfM/user.png"}
                      alt="profile"
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-4 border-indigo-400 object-cover shadow-md transition-all duration-400 group-hover:border-indigo-600 group-hover:shadow-xl group-hover:scale-110"
                    />
                    {userData?.isPremium && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-br from-yellow-400 to-amber-500 text-indigo-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shadow-lg animate-pulse-slow">
                        Pro
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                <div
                  className={`
                    absolute right-0 mt-4 w-80 sm:w-96 origin-top-right
                    bg-white/95 backdrop-blur-lg shadow-2xl rounded-2xl p-6 border border-gray-100/50
                    transition-all duration-300 ease-out
                    ${profileOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-4 pointer-events-none"}
                  `}
                >
                  <div className="text-center mb-6">
                    <img
                      src={currentUser.photoURL || "https://i.pravatar.cc/150"}
                      alt="profile"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 border-4 border-indigo-500 shadow-lg transition-transform duration-500 hover:scale-105"
                    />
                    <p className="font-bold text-xl text-gray-900 truncate">
                      {currentUser.displayName || "User"}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 truncate">
                      {currentUser.email}
                    </p>
                    {userData?.isPremium && (
                      <div className="mt-4 inline-flex items-center gap-2 px-5 py-1.5 bg-gradient-to-r from-yellow-300 to-amber-400 text-indigo-950 font-bold rounded-full shadow-md text-sm animate-pulse-slow">
                        <Sparkles className="w-4 h-4" />
                        Premium Member
                      </div>
                    )}
                  </div>

                  <hr className="my-5 border-gray-200/70" />

                  <div className="space-y-2">
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 py-2.5 px-4 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 font-medium"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      Dashboard
                    </Link>

                    <Link
                      to="/dashboard/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 py-2.5 px-4 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200"
                    >
                      <UserCog className="w-5 h-5" />
                      Update Profile
                    </Link>
                    <button
                      onClick={toggleTheme}
                      className="flex items-center gap-3 py-2.5 px-4 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 font-medium"
                    >
                      {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                      {isDarkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                    {userData?.role === "admin" && (
                      <Link
                        to="/dashboard/admin"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center justify-center gap-3 mt-3 py-3 px-5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                      >
                        <ShieldCheck className="w-5 h-5" />
                        Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full mt-5 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-3"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-all duration-300 hover:scale-105"
              >
                <User className="w-5 h-5" />
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 text-sm sm:text-base"
              >
                <User className="w-5 h-5" />
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-indigo-700 focus:outline-none transition-transform duration-300 hover:scale-110 active:scale-95"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? (
            <X className="w-8 h-8 sm:w-9 sm:h-9 animate-spin-once" />
          ) : (
            <Menu className="w-8 h-8 sm:w-9 sm:h-9" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-2xl
          transition-all duration-500 ease-out origin-top
          ${mobileOpen
            ? "max-h-screen opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-10 pointer-events-none"}
          overflow-hidden
        `}
      >
        <div className="px-5 sm:px-8 py-6 space-y-3">
          {currentUser ? (
            <>
              {[
                { to: "/", icon: Home, label: "Home" },
                { to: "/dashboard/add-lesson", icon: BookOpen, label: "Add Lesson" },
                { to: "/dashboard/my-lessons", icon: BookMarked, label: "My Lessons" },
                { to: "/public-lessons", icon: Users, label: "Public Lessons" },
                { to: "/pricing", icon: CreditCard, label: "Pricing" },
              ].map((item, i) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-4 py-3.5 px-5 rounded-xl text-lg font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "hover:bg-indigo-50 hover:text-indigo-700"
                    }`
                  }
                  style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms" }}
                >
                  <item.icon className="w-6 h-6" />
                  {item.label}
                </NavLink>
              ))}

              {/* Profile section in mobile */}
              <div className="mt-5 pt-5 border-t border-gray-200">
                <div className="flex items-center gap-4 px-5 py-3 bg-indigo-50/50 rounded-xl mb-4">
                  <img
                    src={currentUser.photoURL || "https://i.ibb.co/9yK7qfM/user.png"}
                    alt="profile"
                    className="w-12 h-12 rounded-full border-4 border-indigo-400 object-cover shadow-sm"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {currentUser.displayName || "User"}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {currentUser.email}
                    </p>
                  </div>
                </div>

                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-4 py-3.5 px-5 rounded-xl text-lg font-medium hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-300"
                >
                  <LayoutDashboard className="w-6 h-6" />
                  Dashboard
                </Link>

                <Link
                  to="/dashboard/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-4 py-3.5 px-5 rounded-xl text-lg font-medium hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-300"
                >
                  <Settings className="w-6 h-6" />
                  Update Profile
                </Link>

                {userData?.role === "admin" && (
                  <Link
                    to="/dashboard/admin"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-3 mt-4 py-4 px-6 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <ShieldCheck className="w-6 h-6" />
                    Admin Panel
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-4 py-3.5 px-5 w-full text-left text-red-700 hover:bg-red-50 rounded-xl text-lg font-bold transition-all duration-300 mt-3"
                >
                  <LogOut className="w-6 h-6" />
                  Logout
                </button>
              </div>
            </>
          ) : (
            // ... unchanged guest mobile menu ...
            <>
              {[
                { to: "/", icon: Home, label: "Home" },
                { to: "/public-lessons", icon: BookOpen, label: "Lessons" },
                { to: "/pricing", icon: CreditCard, label: "Premium" },
                { to: "/login", icon: User, label: "Login" },
                { to: "/register", icon: User, label: "Register" },
              ].map((item, i) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-4 py-3.5 px-5 rounded-xl text-lg font-medium hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-300"
                  style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms" }}
                >
                  <item.icon className="w-6 h-6" />
                  {item.label}
                </NavLink>
              ))}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;