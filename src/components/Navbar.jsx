import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

const Navbar = () => {
  const { currentUser, userData } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-indigo-600 font-semibold"
      : "hover:text-indigo-500";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-700">
          Student Life Lessons
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/public-lessons" className={navLinkClass}>Lessons</NavLink>

          {currentUser && (
            <NavLink to="/pricing" className={navLinkClass}>
              Premium
            </NavLink>
          )}

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
                  onClick={() => setOpen(!open)}
                  className="w-10 h-10 rounded-full border cursor-pointer"
                />

                {open && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg p-4 space-y-3">
                    <p className="font-semibold">
                      {currentUser.displayName || "User"}
                    </p>

                    <Link
                      to="/dashboard/profile"
                      className="block hover:text-indigo-600"
                      onClick={() => setOpen(false)}
                    >
                      Update Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="text-red-600 w-full text-left hover:underline"
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
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white px-6 py-4 space-y-3 shadow">
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/public-lessons" onClick={() => setOpen(false)}>Lessons</NavLink>

          {currentUser && (
            <NavLink to="/pricing" onClick={() => setOpen(false)}>
              Premium
            </NavLink>
          )}

          {currentUser ? (
            <>
              <NavLink to="/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </NavLink>

              {userData?.role === "admin" && (
                <NavLink to="/dashboard/admin" className="text-red-600">
                  Admin
                </NavLink>
              )}

              <NavLink
                to="/dashboard/profile"
                onClick={() => setOpen(false)}
              >
                Update Profile
              </NavLink>

              <button
                onClick={handleLogout}
                className="text-red-600 block"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/register" onClick={() => setOpen(false)}>
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
