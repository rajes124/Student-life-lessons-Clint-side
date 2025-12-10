import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setOpenDropdown(false);
  };

  return (
    <nav className="w-full bg-green-400 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">📘</span>
          <h1 className="font-bold text-lg">Student Life Lessons</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/public-lessons" className="hover:text-blue-400">Public Lessons</Link>
          <Link to="/pricing" className="hover:text-blue-400">Pricing</Link>
          <Link to="/about" className="hover:text-blue-400">About</Link>

          {user && (
            <>
              <Link to="/add-lesson" className="hover:text-blue-400">Add Lesson</Link>
              <Link to="/my-lessons" className="hover:text-blue-400">My Lessons</Link>
              <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login" className="hover:text-blue-300">Login</Link>
              <Link to="/register" className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setOpenDropdown(!openDropdown)}
              >
                <img
                  src={user.photoURL || "https://i.pravatar.cc/40"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-semibold">{user.displayName || "User"}</span>
              </div>

              {openDropdown && (
                <div className="absolute right-0 mt-3 bg-white text-black rounded-lg shadow-lg w-48 py-2 z-50">
                  
                  <div className="px-4 pb-2 border-b">
                    <p className="font-semibold">{user.displayName}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>

                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                  <Link to="/my-lessons" className="block px-4 py-2 hover:bg-gray-100">My Lessons</Link>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Button */}
        <button className="md:hidden text-2xl" onClick={() => setOpenMenu(!openMenu)}>
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

          {user && (
            <>
              <Link to="/add-lesson" className="block hover:text-blue-400">Add Lesson</Link>
              <Link to="/my-lessons" className="block hover:text-blue-400">My Lessons</Link>
              <Link to="/dashboard" className="block hover:text-blue-400">Dashboard</Link>
              <Link to="/profile" className="block hover:text-blue-400">Profile</Link>
            </>
          )}

          {!user ? (
            <>
              <Link to="/login" className="block hover:text-blue-300">Login</Link>
              <Link
                to="/register"
                className="block bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 w-fit mt-2"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 mt-2"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
