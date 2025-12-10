import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const DashboardLayout = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <div
        className={`${
          open ? "w-64" : "w-16"
        } bg-white shadow-xl transition-all duration-300 p-4`}
      >
        <button
          className="text-gray-600 mb-6"
          onClick={() => setOpen(!open)}
        >
          <FaBars size={22} />
        </button>

        <nav className="space-y-3">
          <Link
            to="/dashboard"
            className="block p-2 rounded hover:bg-gray-200 font-medium"
          >
            Overview
          </Link>

          <Link
            to="/dashboard/profile"
            className="block p-2 rounded hover:bg-gray-200 font-medium"
          >
            Profile
          </Link>

          <Link
            to="/dashboard/settings"
            className="block p-2 rounded hover:bg-gray-200 font-medium"
          >
            Settings
          </Link>

          <Link
            to="/dashboard/messages"
            className="block p-2 rounded hover:bg-gray-200 font-medium"
          >
            Messages
          </Link>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
