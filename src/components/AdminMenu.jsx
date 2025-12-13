import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <div className="w-64 bg-indigo-900 min-h-screen p-6">
      <h2 className="text-2xl font-bold text-white mb-10">Admin Panel</h2>
      <nav className="space-y-4">
        <NavLink
          to="/dashboard/admin"
          className={({ isActive }) =>
            `block py-3 px-4 rounded-lg text-white font-medium transition ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-800'}`
          }
        >
          Dashboard Home
        </NavLink>
        <NavLink
          to="/dashboard/admin/manage-users"
          className={({ isActive }) =>
            `block py-3 px-4 rounded-lg text-white font-medium transition ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-800'}`
          }
        >
          Manage Users
        </NavLink>
        <NavLink
          to="/dashboard/admin/manage-lessons"
          className={({ isActive }) =>
            `block py-3 px-4 rounded-lg text-white font-medium transition ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-800'}`
          }
        >
          Manage Lessons
        </NavLink>
        <NavLink
          to="/dashboard/admin/reported-lessons"
          className={({ isActive }) =>
            `block py-3 px-4 rounded-lg text-white font-medium transition ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-800'}`
          }
        >
          Reported Lessons
        </NavLink>
        <NavLink
          to="/dashboard/admin/profile"
          className={({ isActive }) =>
            `block py-3 px-4 rounded-lg text-white font-medium transition ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-800'}`
          }
        >
          Admin Profile
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminMenu;