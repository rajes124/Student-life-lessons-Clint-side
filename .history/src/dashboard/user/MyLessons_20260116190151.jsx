// src/pages/Dashboard/MyLessons.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  User,
  Heart,
  Bookmark,
  Eye,
  Edit,
  Trash2,
  Lock,
  Globe,
  Star,
  Loader2,
} from "lucide-react";

const MyLessons = () => {
  const { currentUser, userData } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const fetchLessons = async () => {
      try {
        const res = await api.get("/lessons/my-lessons");
        setLessons(res.data.lessons || res.data || []);
      } catch (error) {
        console.error("Failed to load lessons:", error);
        toast.error("Failed to load your lessons");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [currentUser]);

  const handleVisibilityChange = async (id, newVisibility) => {
    try {
      await api.put(`/lessons/${id}`, { visibility: newVisibility });
      setLessons(lessons.map(l => l._id === id ? { ...l, visibility: newVisibility } : l));
      toast.success("Visibility updated");
    } catch (error) {
      toast.error("Failed to update visibility");
    }
  };

  const handleAccessLevelChange = async (id, newLevel) => {
    if (newLevel === "Premium" && !userData?.isPremium) {
      toast.error("Upgrade to Premium to make lesson Premium");
      return;
    }

    try {
      await api.put(`/lessons/${id}`, { accessLevel: newLevel });
      setLessons(lessons.map(l => l._id === id ? { ...l, accessLevel: newLevel } : l));
      toast.success("Access level updated");
    } catch (error) {
      toast.error("Failed to update access level");
    }
  };

  const handleDelete = (id, title) => {
    toast(
      (t) => (
        <div className="text-center p-6 bg-white rounded-2xl shadow-2xl max-w-sm mx-auto border border-red-100">
          <Trash2 className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="font-bold text-2xl mb-3 text-gray-900">Delete Lesson?</p>
          <p className="text-gray-700 mb-2">This action cannot be undone.</p>
          <p className="font-semibold text-indigo-700 mb-6 text-lg line-clamp-2">
            "{title}"
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await api.delete(`/lessons/delete/${id}`);
                  setLessons((prev) => prev.filter((l) => l._id !== id));
                  toast.success("Lesson deleted successfully");
                } catch {
                  toast.error("Failed to delete lesson");
                }
              }}
              className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-md transition-all min-w-[120px]"
            >
              Yes, Delete
            </button>

            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-8 py-3.5 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold shadow-md transition-all min-w-[120px]"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
        style: { background: "transparent", boxShadow: "none", padding: 0 },
      }
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mx-auto mb-6" />
          <p className="text-3xl font-bold text-indigo-700">Loading your lessons...</p>
        </div>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <BookOpen className="w-32 h-32 text-indigo-300 mx-auto mb-8 opacity-70" />
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
            No Lessons Yet
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Start sharing your wisdom by creating your first life lesson!
          </p>
          <Link
            to="/dashboard/add-lesson"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-10 py-5 rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl transition transform hover:scale-110"
          >
            <PlusCircle className="w-8 h-8" />
            Add Your First Lesson
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10">
      <h2 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-10 flex items-center gap-3">
        <BookOpen className="w-10 h-10 text-indigo-600" />
        My Lessons ({lessons.length})
      </h2>

      <div className="overflow-x-auto rounded-2xl shadow-2xl border border-indigo-100">
        <table className="w-full border-collapse bg-white min-w-max table-fixed">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
              <th className="p-5 text-left text-lg font-bold w-2/5">Lesson</th>
              <th className="p-5 text-left text-lg font-bold w-1/6">Category</th>
              <th className="p-5 text-left text-lg font-bold w-1/6">Tone</th>
              <th className="p-5 text-left text-lg font-bold w-1/12">Visibility</th>
              <th className="p-5 text-left text-lg font-bold w-1/12">Access</th>
              <th className="p-5 text-left text-lg font-bold w-1/12">Created</th>
              <th className="p-5 text-left text-lg font-bold w-1/12">Stats</th>
              <th className="p-5 text-center text-lg font-bold w-1/6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr
                key={lesson._id}
                className="border-b hover:bg-indigo-50/50 transition-all duration-200 h-20"
              >
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    {lesson.imageURL ? (
                      <img
                        src={lesson.imageURL}
                        alt={lesson.title}
                        className="w-16 h-16 object-cover rounded-lg shadow-md ring-2 ring-indigo-100 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-lg flex items-center justify-center text-3xl shadow-md flex-shrink-0">
                        <BookOpen className="w-8 h-8 text-indigo-600" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-bold text-lg text-indigo-800 line-clamp-1">
                        {lesson.title}
                      </p>
                      {/* Description দেখানো হবে না */}
                    </div>
                  </div>
                </td>

                <td className="p-5 text-gray-700 truncate">{lesson.category}</td>
                <td className="p-5 text-gray-700 truncate">{lesson.emotionalTone}</td>

                <td className="p-5">
                  <select
                    value={lesson.visibility}
                    onChange={(e) => handleVisibilityChange(lesson._id, e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </td>

                <td className="p-5">
                  <select
                    value={lesson.accessLevel}
                    onChange={(e) => handleAccessLevelChange(lesson._id, e.target.value)}
                    disabled={!userData?.isPremium}
                    className={`w-full px-3 py-2 border rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm ${
                      !userData?.isPremium ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  >
                    <option value="Free">Free</option>
                    <option value="Premium">Premium</option>
                  </select>
                </td>

                <td className="p-5 text-gray-600 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    {new Date(lesson.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </td>

                <td className="p-5 text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span>{lesson.likesCount || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bookmark className="w-4 h-4 text-blue-500" />
                      <span>{lesson.savedBy?.length || 0}</span>
                    </div>
                  </div>
                </td>

                <td className="p-5 text-center flex items-center justify-center gap-4">
                  <Link
                    to={`/lessons/${lesson._id}`}
                    className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-medium transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Link>

                  <Link
                    to={`/dashboard/update-lesson/${lesson._id}`}
                    className="flex items-center gap-1.5 text-green-600 hover:text-green-800 font-medium transition-colors text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Update
                  </Link>

                  <button
                    onClick={() => handleDelete(lesson._id, lesson.title)}
                    className="flex items-center gap-1.5 text-red-600 hover:text-red-800 font-medium transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyLessons;