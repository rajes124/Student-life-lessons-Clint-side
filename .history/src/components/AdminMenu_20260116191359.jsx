// src/components/AdminMenu.jsx
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  AlertTriangle,
  User,
  ShieldCheck,
} from "lucide-react";

const AdminMenu = () => {
  return (
    <div className="w-64 bg-gradient-to-b from-indigo-900 to-purple-900 min-h-screen p-6 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-12 text-center border-b border-indigo-700 pb-4 flex items-center justify-center gap-3">
        <ShieldCheck className="w-10 h-10 text-white" />
        Admin Panel
      </h2>

      <nav className="space-y-3">
        <NavLink
          to="/dashboard/admin"
          className={({ isActive }) =>
            `flex items-center gap-3 py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-300 ${
              isActive 
                ? 'bg-indigo-600 shadow-lg scale-105' 
                : 'hover:bg-indigo-800 hover:scale-105'
            }`
          }
        >
          <LayoutDashboard className="w-6 h-6" />
          Dashboard Home
        </NavLink>

        <NavLink
          to="/dashboard/admin/manage-users"
          className={({ isActive }) =>
            `flex items-center gap-3 py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-300 ${
              isActive 
                ? 'bg-indigo-600 shadow-lg scale-105' 
                : 'hover:bg-indigo-800 hover:scale-105'
            }`
          }
        >
          <Users className="w-6 h-6" />
          Manage Users
        </NavLink>

        <NavLink
          to="/dashboard/admin/manage-lessons"
          className={({ isActive }) =>
            `flex items-center gap-3 py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-300 ${
              isActive 
                ? 'bg-indigo-600 shadow-lg scale-105' 
                : 'hover:bg-indigo-800 hover:scale-105'
            }`
          }
        >
          <BookOpen className="w-6 h-6" />
          Manage Lessons
        </NavLink>

        <NavLink
          to="/dashboard/admin/reported-lessons"
          className={({ isActive }) =>
            `flex items-center gap-3 py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-300 ${
              isActive 
                ? 'bg-indigo-600 shadow-lg scale-105' 
                : 'hover:bg-indigo-800 hover:scale-105'
            }`
          }
        >
          <AlertTriangle className="w-6 h-6" />
          Reported Lessons
        </NavLink>

        <NavLink
          to="/dashboard/admin/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-300 ${
              isActive 
                ? 'bg-indigo-600 shadow-lg scale-105' 
                : 'hover:bg-indigo-800 hover:scale-105'
            }`
          }
        >
          <User className="w-6 h-6" />
          Admin Profile
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminMenu;