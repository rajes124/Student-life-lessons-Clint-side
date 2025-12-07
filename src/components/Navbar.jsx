import { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="w-full bg-green-400 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">📘</span>
          <h1 className="font-bold text-lg">Student Life Lessons</h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/public-lessons" className="hover:text-blue-400">Public Lessons</Link>
          <Link to="/pricing" className="hover:text-blue-400">Pricing</Link>
          <Link to="/about" className="hover:text-blue-400">About</Link>

          {isLoggedIn && (
            <>
              <Link to="/add-lesson" className="hover:text-blue-400">Add Lesson</Link>
              <Link to="/my-lessons" className="hover:text-blue-400">My Lessons</Link>
              <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:text-blue-300">Login</Link>
              <Link
                to="/signup"
                className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Signup
              </Link>
            </>
          ) : (
            <div className="relative">
              <img
                src="https://i.pravatar.cc/40"
                alt="avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setOpenDropdown(!openDropdown)}
              />

              {openDropdown && (
                <div className="absolute right-0 mt-3 bg-white text-black rounded-lg shadow-lg w-40 py-2">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                  <Link to="/my-lessons" className="block px-4 py-2 hover:bg-gray-100">My Lessons</Link>
                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpenMenu(!openMenu)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {openMenu && (
        <div className="md:hidden bg-gray-800 px-4 py-4 space-y-3">
          <Link to="/" className="block hover:text-blue-400">Home</Link>
          <Link to="/public-lessons" className="block hover:text-blue-400">Public Lessons</Link>
          <Link to="/pricing" className="block hover:text-blue-400">Pricing</Link>
          <Link to="/about" className="block hover:text-blue-400">About</Link>

          {isLoggedIn && (
            <>
              <Link to="/add-lesson" className="block hover:text-blue-400">Add Lesson</Link>
              <Link to="/my-lessons" className="block hover:text-blue-400">My Lessons</Link>
              <Link to="/dashboard" className="block hover:text-blue-400">Dashboard</Link>
            </>
          )}

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="block hover:text-blue-300">Login</Link>
              <Link
                to="/signup"
                className="block bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 w-fit mt-2"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-red-400 hover:text-red-300 mt-2"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}  
export default  Navbar;