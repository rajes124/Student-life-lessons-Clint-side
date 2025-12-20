// src/dashboard/admin/ManageUsers.jsx

import React, { useState, useEffect } from "react";
import api from "../../utils/api"; // তোমার main api.js
import toast from "react-hot-toast";

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
      toast.success(`Role changed to ${newRole} 👑`);
      setUsers(users.map(u => u.firebaseUid === firebaseUid ? { ...u, role: newRole } : u));
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const handleDeleteUser = async (firebaseUid) => {
    if (!window.confirm("⚠️ Are you sure you want to delete this user?\nThis action cannot be undone!")) return;

    try {
      await api.delete(`/admin/users/${firebaseUid}`);
      toast.success("User deleted successfully 🗑️");
      setUsers(users.filter(u => u.firebaseUid !== firebaseUid));
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="text-3xl font-bold text-indigo-700">Loading Users...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-5xl font-bold text-indigo-800 mb-10 flex items-center gap-4">
        👥 Manage Users ({users.length})
      </h1>

      {users.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl shadow-2xl">
          <p className="text-2xl text-gray-600">No users found yet.</p>
          <p className="text-lg text-gray-500 mt-4">Users will appear here once they register.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-8 py-5 text-left text-lg font-bold">Name</th>
                  <th className="px-8 py-5 text-left text-lg font-bold">Email</th>
                  <th className="px-8 py-5 text-left text-lg font-bold">Role</th>
                  <th className="px-8 py-5 text-left text-lg font-bold">Premium</th>
                  <th className="px-8 py-5 text-center text-lg font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.firebaseUid} className="border-b hover:bg-indigo-50 transition duration-200">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <span className="font-medium text-gray-800">{user.name || "Unnamed User"}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-700">{user.email}</td>
                    <td className="px-8 py-6">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.firebaseUid, e.target.value)}
                        className={`px-5 py-3 rounded-xl font-bold transition ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-800 border-2 border-red-400"
                            : "bg-gray-100 text-gray-800 border-2 border-gray-300"
                        } focus:ring-4 focus:ring-indigo-300`}
                      >
                        <option value="user">👤 User</option>
                        <option value="admin">👑 Admin</option>
                      </select>
                    </td>
                    <td className="px-8 py-6 text-center">
                      {user.isPremium ? (
                        <span className="bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full font-bold flex items-center justify-center gap-2">
                          ⭐ Premium
                        </span>
                      ) : (
                        <span className="text-gray-500">Free</span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-center">
                      <button
                        onClick={() => handleDeleteUser(user.firebaseUid)}
                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg hover:shadow-xl"
                      >
                        🗑️ Delete User
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;