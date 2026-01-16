// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

const Navbar = () => {
  const { currentUser, userData } = useAuth();
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
      ? "text-indigo-600 font-semibold"
      : "hover:text-indigo-500 transition";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-700 flex items-center gap-2"
        >
          Student Life Lessons
        </Link>

        {/* Center Menu - Desktop */}
        <div className="hidden md:flex flex-1 justify-center gap-8">
          {currentUser ? (
            <>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/dashboard/add-lesson" className={navLinkClass}>
                Add Lesson
              </NavLink>
              <NavLink to="/dashboard/my-lessons" className={navLinkClass}>
                My Lessons
              </NavLink>
              <NavLink to="/public-lessons" className={navLinkClass}>
                Public Lessons
              </NavLink>
              <NavLink to="/pricing" className={navLinkClass}>
                Pricing
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/public-lessons" className={navLinkClass}>
                Lessons
              </NavLink>
              <NavLink to="/pricing" className={navLinkClass}>
                Premium
              </NavLink>
            </>
          )}
        </div>

        {/* Right Side - Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {currentUser ? (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>

              {/* Profile Dropdown */}
              <div className="relative">
                <div
                  className="relative cursor-pointer group"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <img
                    src={currentUser.photoURL || "https://i.ibb.co/9yK7qfM/user.png"}
                    alt="profile"
                    className="w-10 h-10 rounded-full border-4 border-indigo-500 object-cover shadow-md transition-all duration-300 group-hover:border-indigo-600 group-hover:shadow-xl group-hover:scale-105"
                  />
                  {userData?.isPremium && (
                    <span className="absolute -top-1 -right-1 bg-yellow-400 text-indigo-900 text-[10px] font-bold px-1.5 rounded-full shadow">
                      ★
                    </span>
                  )}
                </div>

                {profileOpen && (
                  <div className="absolute right-0 mt-4 w-72 bg-white shadow-2xl rounded-xl p-6 border border-gray-200">
                    <div className="text-center mb-5">
                      <img
                        src={currentUser.photoURL || "https://i.pravatar.cc/150"}
                        alt="profile"
                        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-600 shadow-lg"
                      />
                      <p className="font-bold text-xl">
                        {currentUser.displayName || "User"}
                      </p>
                      <p className="text-sm text-gray-600">{currentUser.email}</p>

                      {userData?.isPremium && (
                        <span className="inline-block mt-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-indigo-900 px-5 py-1 rounded-full text-sm font-bold shadow-md">
                          Premium Member ⭐
                        </span>
                      )}
                    </div>

                    <hr className="my-5" />

                    <Link
                      to="/dashboard/profile"  // ← এটা আছে, 404 দেখায় না
                      onClick={() => setProfileOpen(false)}
                      className="block py-2 hover:text-indigo-600 font-medium"
                    >
                      Update Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="block py-2 hover:text-indigo-600 font-medium"
                    >
                      Dashboard
                    </Link>

                    {userData?.role === "admin" && (
                      <Link
                        to="/dashboard/admin"  // ← Admin Panel এখানে
                        onClick={() => setProfileOpen(false)}
                        className="block py-3 mt-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-center transition"
                      >
                        ⚡ Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full mt-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 shadow-md"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-indigo-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white px-6 py-6 space-y-4 shadow-lg border-t border-gray-200">
          {currentUser ? (
            <>
              <NavLink
                to="/"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-lg font-medium hover:text-indigo-600"
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard/add-lesson"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-lg font-medium hover:text-indigo-600"
              >
                Add Lesson
              </NavLink>
              <NavLink
                to="/dashboard/my-lessons"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-lg font-medium hover:text-indigo-600"
              >
                My Lessons
              </NavLink>
              <NavLink
                to="/public-lessons"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-lg font-medium hover:text-indigo-600"
              >
                Public Lessons
              </NavLink>
              <NavLink
                to="/pricing"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-lg font-medium hover:text-indigo-600"
              >
                Pricing
              </NavLink>
              <NavLink
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-lg font-medium hover:text-indigo-600"
              >
                Dashboard
              </NavLink>

              <Link
                to="/dashboard/profile"  // ← মোবাইলেও Update Profile
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-lg font-medium hover:text-indigo-600"
              >
                Update Profile
              </Link>

              {userData?.role === "admin" && (
                <Link
                  to="/dashboard/admin"
                  onClick={() => setMobileOpen(false)}
                  className="block py-4 text-xl font-bold text-red-600 bg-red-50 rounded-lg text-center"
                >
                  ⚡ Admin Panel
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="block py-3 text-lg font-bold text-red-600 w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-lg font-medium hover:text-indigo-600"
              >
                Home
              </NavLink>
              <NavLink
                to="/public-lessons"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-lg font-medium hover:text-indigo-600"
              >
                Lessons
              </NavLink>
              <NavLink
                to="/pricing"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-lg font-medium hover:text-indigo-600"
              >
                Premium
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-lg font-medium hover:text-indigo-600"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-lg font-medium hover:text-indigo-600"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;