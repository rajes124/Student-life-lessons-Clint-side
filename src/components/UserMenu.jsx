import { NavLink } from 'react-router-dom';

const UserMenu = () => {
  return (
    <div className="w-64 bg-indigo-50 min-h-screen p-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-10">My Dashboard</h2>
      <nav className="space-y-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block py-3 px-4 rounded-lg font-medium transition ${isActive ? 'bg-indigo-600 text-white' : 'text-indigo-700 hover:bg-indigo-200'}`
          }
        >
          Overview
        </NavLink>
        <NavLink
          to="/dashboard/add-lesson"
          className={({ isActive }) =>
            `block py-3 px-4 rounded-lg font-medium transition ${isActive ? 'bg-indigo-600 text-white' : 'text-indigo-700 hover:bg-indigo-200'}`
          }
        >
          Add Lesson
        </NavLink>
        <NavLink
          to="/dashboard/my-lessons"
          className={({ isActive }) =>
            `block py-3 px-4 rounded-lg font-medium transition ${isActive ? 'bg-indigo-600 text-white' : 'text-indigo-700 hover:bg-indigo-200'}`
          }
        >
          My Lessons
        </NavLink>
        <NavLink
          to="/dashboard/my-favorites"
          className={({ isActive }) =>
            `block py-3 px-4 rounded-lg font-medium transition ${isActive ? 'bg-indigo-600 text-white' : 'text-indigo-700 hover:bg-indigo-200'}`
          }
        >
          Favorites
        </NavLink>
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `block py-3 px-4 rounded-lg font-medium transition ${isActive ? 'bg-indigo-600 text-white' : 'text-indigo-700 hover:bg-indigo-200'}`
          }
        >
          Profile
        </NavLink>
      </nav>
    </div>
  );
};

export default UserMenu;