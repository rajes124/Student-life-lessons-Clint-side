// src/dashboard/admin/AdminPanel.jsx

import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [reportedLessons, setReportedLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      try {
        const [usersRes, lessonsRes, reportsRes] = await Promise.all([
          api.get("/admin/users"),
          api.get("/admin/lessons"),
          api.get("/admin/reported-lessons"),
        ]);

        setUsers(usersRes.data);
        setLessons(lessonsRes.data);
        setReportedLessons(reportsRes.data);
      } catch (error) {
        toast.error("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/admin/users/${userId}/role`, { role: newRole });
      toast.success("Role updated");
      setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Delete this user and all their lessons?")) return;
    try {
      await api.delete(`/admin/users/${userId}`);
      toast.success("User deleted");
      setUsers(users.filter(u => u._id !== userId));
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm("Delete this lesson?")) return;
    try {
      await api.delete(`/admin/lessons/${lessonId}`);
      toast.success("Lesson deleted");
      setLessons(lessons.filter(l => l._id !== lessonId));
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleIgnoreReports = async (lessonId) => {
    try {
      await api.put(`/admin/reported-lessons/${lessonId}/ignore`);
      toast.success("Reports ignored");
      setReportedLessons(reportedLessons.filter(r => r._id !== lessonId));
    } catch (error) {
      toast.error("Ignore failed");
    }
  };

  if (loading) return <p className="text-center py-20 text-2xl text-indigo-700">Loading Admin Panel...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-5xl font-bold text-red-600 text-center mb-12">
        Admin Panel 👑
      </h1>

      {/* Users Management */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">Manage Users</h2>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Premium</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{user.name || "N/A"}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="border rounded px-3 py-1 focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4">
                    {user.isPremium ? "Yes ⭐" : "No"}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="text-red-600 hover:underline font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Lessons Management */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">Manage Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson) => (
            <div key={lesson._id} className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{lesson.description}</p>
              <p className="text-sm text-gray-500 mb-4">By {lesson.creatorName || "Anonymous"}</p>
              <button
                onClick={() => handleDeleteLesson(lesson._id)}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
              >
                Delete Lesson
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Reported Lessons */}
      <section>
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">Reported Lessons</h2>
        {reportedLessons.length === 0 ? (
          <p className="text-gray-600 text-xl">No reported lessons</p>
        ) : (
          <div className="space-y-8">
            {reportedLessons.map((report) => (
              <div key={report._id} className="bg-red-50 border-2 border-red-300 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-red-700 mb-3">
                  {report.lesson?.title || "Unknown Lesson"}
                </h3>
                <p className="text-gray-700 mb-4">Report count: <span className="font-bold">{report.count}</span></p>
                <div className="bg-white rounded-lg p-4 mb-6">
                  <p className="font-medium mb-2">Reasons:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {report.reasons.map((reason, i) => (
                      <li key={i} className="text-gray-700">{reason}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-6">
                  <button
                    onClick={() => handleDeleteLesson(report.lesson?._id)}
                    className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-bold"
                  >
                    Delete Lesson
                  </button>
                  <button
                    onClick={() => handleIgnoreReports(report._id)}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-bold"
                  >
                    Ignore Reports
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminPanel;