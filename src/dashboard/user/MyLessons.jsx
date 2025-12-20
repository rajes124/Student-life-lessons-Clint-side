// src/dashboard/user/MyLessons.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Heart, Bookmark, Calendar } from "lucide-react";

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

  // 🔥 ঠিক করা handleDelete – এখন ১০০% কাজ করবে
  const handleDelete = (id, title) => {
    toast(
      (t) => (
        <div className="text-center p-5 bg-white rounded-xl shadow-lg">
          <p className="font-bold text-xl mb-3 text-gray-800">Delete Lesson?</p>
          <p className="text-gray-700 mb-2">This action cannot be undone.</p>
          <p className="font-semibold text-indigo-700 mb-6 text-lg">
            "{title}"
          </p>

          <div className="flex justify-center gap-5">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await api.delete(`/lessons/delete/${id}`);
                  setLessons((prev) =>
                    prev.filter((l) => l._id !== id)
                  );
                  toast.success("Lesson deleted successfully! 🎉");
                } catch {
                  toast.error("Failed to delete lesson 😔");
                }
              }}
              className="px-8 py-3 bg-red-600 text-white rounded-lg font-bold"
            >
              Yes, Delete
            </button>

            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-8 py-3 bg-gray-400 text-white rounded-lg font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
      }
    );
  };

  if (loading) {
    return <p className="text-center text-xl mt-20">Loading your lessons...</p>;
  }

  if (lessons.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-4xl font-bold text-indigo-700 mb-6">My Lessons</h2>
        <p className="text-xl text-gray-600">You haven't created any lessons yet.</p>
        <Link
          to="/dashboard/add-lesson"
          className="mt-6 inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-indigo-700"
        >
          Add Your First Lesson
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-indigo-700 mb-8">My Lessons</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-4 text-left">Lesson</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Tone</th>
              <th className="p-4 text-left">Visibility</th>
              <th className="p-4 text-left">Access Level</th>
              <th className="p-4 text-left">Created</th>
              <th className="p-4 text-left">Stats</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    {lesson.imageURL ? (
                      <img
                        src={lesson.imageURL}
                        alt={lesson.title}
                        className="w-16 h-16 object-cover rounded-lg shadow-md"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-lg flex items-center justify-center text-3xl shadow-md">
                        📚
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-lg">{lesson.title}</p>
                      <p className="text-sm text-gray-600 line-clamp-2">{lesson.description}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">{lesson.category}</td>
                <td className="p-4">{lesson.emotionalTone}</td>
                <td className="p-4">
                  <select
                    value={lesson.visibility}
                    onChange={(e) => handleVisibilityChange(lesson._id, e.target.value)}
                    className="border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </td>
                <td className="p-4">
                  <select
                    value={lesson.accessLevel}
                    onChange={(e) => handleAccessLevelChange(lesson._id, e.target.value)}
                    disabled={!userData?.isPremium}
                    className="border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="Free">Free</option>
                    <option value="Premium">Premium</option>
                  </select>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    {new Date(lesson.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="font-medium">{lesson.likesCount || 0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bookmark className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">{lesson.savedBy?.length || 0}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 flex items-center gap-6">
                  <Link
                    to={`/lessons/${lesson._id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View Details
                  </Link>

                  {/* নতুন যোগ করা Update লিঙ্ক */}
                  <Link
                    to={`/dashboard/update-lesson/${lesson._id}`}
                    className="text-green-600 hover:underline font-medium"
                  >
                    Update
                  </Link>

                  <button
                    onClick={() => handleDelete(lesson._id, lesson.title)}
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
    </div>
  );
};

export default MyLessons;