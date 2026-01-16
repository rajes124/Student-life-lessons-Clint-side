// src/dashboard/admin/ManageUsers.jsx
import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import {
  Users,
  User,
  Mail,
  ShieldCheck,
  Star,
  Trash2,
  Edit,
  Crown,
  UserCheck,
  AlertCircle,
} from "lucide-react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data);
      } catch (error) {
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (firebaseUid, newRole) => {
    try {
      await api.put(`/admin/users/${firebaseUid}/role`, { role: newRole });
      toast.success(`Role updated to ${newRole}`);
      setUsers(users.map(u => u.firebaseUid === firebaseUid ? { ...u, role: newRole } : u));
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const handleDeleteUser = async (firebaseUid) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

    try {
      await api.delete(`/admin/users/${firebaseUid}`);
      toast.success("User deleted successfully");
      setUsers(users.filter(u => u.firebaseUid !== firebaseUid));
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Users className="w-16 h-16 text-indigo-600 animate-pulse mx-auto mb-4" />
          <p className="text-2xl font-bold text-indigo-700">Loading Users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-indigo-800 mb-10 flex items-center gap-3">
        <Users className="w-10 h-10 text-indigo-600" />
        Manage Users ({users.length})
      </h1>

      {/* ================= MOBILE VIEW ================= */}
      <div className="space-y-6 md:hidden">
        {users.map(user => (
          <div
            key={user.firebaseUid}
            className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:border-indigo-300 transition-all"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-lg text-gray-900 truncate">
                  {user.name || "Unnamed User"}
                </p>
                <p className="text-sm text-gray-600 truncate">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Role Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  Role
                </label>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.firebaseUid, e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl font-semibold text-base border-2 transition-all ${
                    user.role === "admin"
                      ? "bg-red-50 text-red-800 border-red-400"
                      : "bg-gray-50 text-gray-800 border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Premium Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  Premium Status
                </label>
                {user.isPremium ? (
                  <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-5 py-2.5 rounded-full font-semibold border border-amber-200 shadow-sm">
                    <Star className="w-5 h-5 fill-amber-500" />
                    Premium Member
                  </div>
                ) : (
                  <span className="text-gray-600 font-medium">Free User</span>
                )}
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteUser(user.firebaseUid)}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Trash2 className="w-5 h-5" />
                Delete User
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP / TABLET VIEW ================= */}
      <div className="hidden md:block bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
              <tr>
                <th className="px-6 py-5 text-left text-lg font-bold">Name</th>
                <th className="px-6 py-5 text-left text-lg font-bold">Email</th>
                <th className="px-6 py-5 text-left text-lg font-bold">Role</th>
                <th className="px-6 py-5 text-left text-lg font-bold">Premium</th>
                <th className="px-6 py-5 text-center text-lg font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr
                  key={user.firebaseUid}
                  className="hover:bg-indigo-50 transition-all duration-200"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <span className="font-medium text-gray-900">
                        {user.name || "Unnamed User"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-gray-700 break-all">{user.email}</td>
                  <td className="px-6 py-5">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.firebaseUid, e.target.value)}
                      className={`px-5 py-2.5 rounded-xl font-semibold border-2 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        user.role === "admin"
                          ? "bg-red-50 text-red-800 border-red-400"
                          : "bg-gray-50 text-gray-800 border-gray-300"
                      }`}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-5">
                    {user.isPremium ? (
                      <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-5 py-2 rounded-full font-semibold border border-amber-200 shadow-sm">
                        <Star className="w-5 h-5 fill-amber-500" />
                        Premium
                      </div>
                    ) : (
                      <span className="text-gray-600 font-medium">Free</span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <button
                      onClick={() => handleDeleteUser(user.firebaseUid)}
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 mx-auto shadow-md"
                    >
                      <Trash2 className="w-5 h-5" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;