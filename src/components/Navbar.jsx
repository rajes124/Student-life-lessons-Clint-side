import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

const Navbar = () => {
  const { currentUser, userData } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      setProfileOpen(false);
    } catch {
      toast.error("Logout failed");
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-indigo-600 font-semibold"
      : "hover:text-indigo-500";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-700">
          Student Life Lessons
        </Link>

        {/* Center Menu - Desktop */}
        <div className="hidden md:flex flex-1 justify-center gap-8">
          {currentUser ? (
            <>
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
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
              <NavLink to="/public-lessons" className={navLinkClass}>Lessons</NavLink>
              <NavLink to="/pricing" className={navLinkClass}>Premium</NavLink>
            </>
          )}
        </div>

        {/* Right Side - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {currentUser ? (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
              {userData?.role === "admin" && (
                <NavLink to="/dashboard/admin" className="text-red-600 font-semibold">
                  Admin
                </NavLink>
              )}
              {/* Profile Dropdown */}
              <div className="relative">
                <img
                  src={currentUser.photoURL || "https://i.ibb.co/9yK7qfM/user.png"}
                  alt="profile"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-10 h-10 rounded-full border-2 border-indigo-600 cursor-pointer object-cover"
                />
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white shadow-lg rounded-lg p-4 space-y-3 border">
                    <div className="text-center">
                      <p className="font-semibold text-lg">
                        {currentUser.displayName || "User"}
                      </p>
                      <p className="text-sm text-gray-600">{currentUser.email}</p>
                    </div>
                    <hr />
                    <Link
                      to="/dashboard/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block hover:text-indigo-600 py-1"
                    >
                      Update Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="block hover:text-indigo-600 py-1"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-red-600 w-full text-left py-1 hover:bg-red-50"
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
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white px-6 py-4 space-y-4 shadow-lg border-t">
          {currentUser ? (
            <>
              <NavLink to="/dashboard/add-lesson" onClick={() => setMobileOpen(false)} className="block py-2">
                Add Lesson
              </NavLink>
              <NavLink to="/dashboard/my-lessons" onClick={() => setMobileOpen(false)} className="block py-2">
                My Lessons
              </NavLink>
              <NavLink to="/public-lessons" onClick={() => setMobileOpen(false)} className="block py-2">
                Public Lessons
              </NavLink>
              <NavLink to="/pricing" onClick={() => setMobileOpen(false)} className="block py-2">
                Pricing
              </NavLink>
              <NavLink to="/dashboard" onClick={() => setMobileOpen(false)} className="block py-2">
                Dashboard
              </NavLink>
              {userData?.role === "admin" && (
                <NavLink to="/dashboard/admin" onClick={() => setMobileOpen(false)} className="block py-2 text-red-600">
                  Admin
                </NavLink>
              )}
              <Link to="/dashboard/profile" onClick={() => setMobileOpen(false)} className="block py-2">
                Update Profile
              </Link>
              <button onClick={handleLogout} className="text-red-600 block py-2 w-full text-left">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/" onClick={() => setMobileOpen(false)} className="block py-2">Home</NavLink>
              <NavLink to="/public-lessons" onClick={() => setMobileOpen(false)} className="block py-2">Lessons</NavLink>
              <NavLink to="/pricing" onClick={() => setMobileOpen(false)} className="block py-2">Premium</NavLink>
              <NavLink to="/login" onClick={() => setMobileOpen(false)} className="block py-2">Login</NavLink>
              <NavLink to="/register" onClick={() => setMobileOpen(false)} className="block py-2">Register</NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;