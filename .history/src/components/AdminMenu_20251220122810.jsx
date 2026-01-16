// src/components/AdminMenu.jsx
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <div className="w-64 bg-gradient-to-b from-indigo-900 to-purple-900 min-h-screen p-6 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-12 text-center border-b border-indigo-700 pb-4">
        Admin Panel 👑
      </h2>
      <nav className="space-y-3">
        <NavLink
          to="/dashboard/admin"
          className={({ isActive }) =>
            `block py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all ${
              isActive 
                ? 'bg-indigo-600 shadow-lg scale-105' 
                : 'hover:bg-indigo-800 hover:scale-105'
            }`
          }
        >
          🏠 Dashboard Home
        </NavLink>
        <NavLink
          to="/dashboard/admin/manage-users"
          className={({ isActive }) =>
            `block py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all ${
              isActive 
                ? 'bg-indigo-600 shadow-lg scale-105' 
                : 'hover:bg-indigo-800 hover:scale-105'
            }`
          }
        >
          👥 Manage Users
        </NavLink>
        <NavLink
          to="/dashboard/admin/manage-lessons"
          className={({ isActive }) =>
            `block py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all ${
              isActive 
                ? 'bg-indigo-600 shadow-lg scale-105' 
                : 'hover:bg-indigo-800 hover:scale-105'
            }`
          }
        >
          📚 Manage Lessons
        </NavLink>
        <NavLink
          to="/dashboard/admin/reported-lessons"
          className={({ isActive }) =>
            `block py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all ${
              isActive 
                ? 'bg-indigo-600 shadow-lg scale-105' 
                : 'hover:bg-indigo-800 hover:scale-105'
            }`
          }
        >
          ⚠️ Reported Lessons
        </NavLink>
        <NavLink
          to="/dashboard/admin/profile"
          className={({ isActive }) =>
            `block py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all ${
              isActive 
                ? 'bg-indigo-600 shadow-lg scale-105' 
                : 'hover:bg-indigo-800 hover:scale-105'
            }`
          }
        >
          👤 Admin Profile
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminMenu;