// src/layout/AdminLayout.jsx
import { Outlet, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";

// Heroicons import (outline version – clean & professional)
import {
  HomeIcon,
  UsersIcon,
  BookOpenIcon,
  ExclamationTriangleIcon, // Reported-এর জন্য warning icon
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-purple-50">
      <Navbar />
      <div className="flex flex-1 pt-20">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-indigo-800 to-purple-900 text-white shadow-2xl hidden md:block">
          {/* md:block → mobile-এ hide, desktop/tablet-এ show (basic responsive) */}
          <div className="p-6">
            <h2 className="text-3xl font-bold text-center mb-10 border-b border-indigo-600 pb-4">
              Admin Panel
            </h2>
            <nav className="space-y-4">
              <NavLink
                to="/dashboard/admin"
                end
                className={({ isActive }) =>
                  `flex items-center py-4 px-6 rounded-lg text-lg font-medium transition ${
                    isActive ? "bg-indigo-600 shadow-lg" : "hover:bg-indigo-700"
                  }`
                }
              >
                <HomeIcon className="w-6 h-6 mr-3" />
                Dashboard Home
              </NavLink>

              <NavLink
                to="/dashboard/admin/manage-users"
                className={({ isActive }) =>
                  `flex items-center py-4 px-6 rounded-lg text-lg font-medium transition ${
                    isActive ? "bg-indigo-600 shadow-lg" : "hover:bg-indigo-700"
                  }`
                }
              >
                <UsersIcon className="w-6 h-6 mr-3" />
                Manage Users
              </NavLink>

              <NavLink
                to="/dashboard/admin/manage-lessons"
                className={({ isActive }) =>
                  `flex items-center py-4 px-6 rounded-lg text-lg font-medium transition ${
                    isActive ? "bg-indigo-600 shadow-lg" : "hover:bg-indigo-700"
                  }`
                }
              >
                <BookOpenIcon className="w-6 h-6 mr-3" />
                Manage Lessons
              </NavLink>

              <NavLink
                to="/dashboard/admin/reported-lessons"
                className={({ isActive }) =>
                  `flex items-center py-4 px-6 rounded-lg text-lg font-medium transition ${
                    isActive ? "bg-indigo-600 shadow-lg" : "hover:bg-indigo-700"
                  }`
                }
              >
                <ExclamationTriangleIcon className="w-6 h-6 mr-3" />
                Reported Lessons
              </NavLink>

              <NavLink
                to="/dashboard/admin/profile"
                className={({ isActive }) =>
                  `flex items-center py-4 px-6 rounded-lg text-lg font-medium transition ${
                    isActive ? "bg-indigo-600 shadow-lg" : "hover:bg-indigo-700"
                  }`
                }
              >
                <UserCircleIcon className="w-6 h-6 mr-3" />
                Admin Profile
              </NavLink>
            </nav>
          </div>
        </aside>

        {/* Main Content – mobile-এ full width */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;