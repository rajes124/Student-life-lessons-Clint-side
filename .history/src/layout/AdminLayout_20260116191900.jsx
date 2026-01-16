// src/layout/AdminLayout.jsx
import { Outlet, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";

// Heroicons import করো (outline version – clean look)
import {
  HomeIcon,
  UsersIcon,
  BookOpenIcon,
  FlagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <Navbar /> {/* ধরে নিচ্ছি Navbar-এ theme toggle আছে */}

      <div className="flex flex-1 pt-20">
        {/* Sidebar – dark mode support + better contrast */}
        <aside className="w-64 bg-gradient-to-b from-indigo-800 to-purple-900 dark:from-gray-900 dark:to-gray-950 text-white shadow-2xl transition-colors duration-300">
          <div className="p-6">
            <h2 className="text-3xl font-bold text-center mb-10 border-b border-indigo-600 dark:border-indigo-500 pb-4">
              Admin Panel
            </h2>
            <nav className="space-y-3">
              <NavLink
                to="/dashboard/admin"
                end
                className={({ isActive }) =>
                  `flex items-center py-4 px-6 rounded-lg text-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 dark:bg-indigo-700 shadow-lg"
                      : "hover:bg-indigo-700 dark:hover:bg-gray-800"
                  }`
                }
              >
                <HomeIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                Dashboard Home
              </NavLink>

              <NavLink
                to="/dashboard/admin/manage-users"
                className={({ isActive }) =>
                  `flex items-center py-4 px-6 rounded-lg text-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 dark:bg-indigo-700 shadow-lg"
                      : "hover:bg-indigo-700 dark:hover:bg-gray-800"
                  }`
                }
              >
                <UsersIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                Manage Users
              </NavLink>

              <NavLink
                to="/dashboard/admin/manage-lessons"
                className={({ isActive }) =>
                  `flex items-center py-4 px-6 rounded-lg text-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 dark:bg-indigo-700 shadow-lg"
                      : "hover:bg-indigo-700 dark:hover:bg-gray-800"
                  }`
                }
              >
                <BookOpenIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                Manage Lessons
              </NavLink>

              <NavLink
                to="/dashboard/admin/reported-lessons"
                className={({ isActive }) =>
                  `flex items-center py-4 px-6 rounded-lg text-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 dark:bg-indigo-700 shadow-lg"
                      : "hover:bg-indigo-700 dark:hover:bg-gray-800"
                  }`
                }
              >
                <FlagIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                Reported Lessons
              </NavLink>

              <NavLink
                to="/dashboard/admin/profile"
                className={({ isActive }) =>
                  `flex items-center py-4 px-6 rounded-lg text-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 dark:bg-indigo-700 shadow-lg"
                      : "hover:bg-indigo-700 dark:hover:bg-gray-800"
                  }`
                }
              >
                <UserCircleIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                Admin Profile
              </NavLink>
            </nav>
          </div>
        </aside>

        {/* Main Content – dark mode friendly */}
        <main className="flex-1 p-10 overflow-y-auto bg-white/80 dark:bg-gray-900/80 transition-colors duration-300">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AdminLayout;