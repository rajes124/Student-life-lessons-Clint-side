// src/dashboard/user/MyLessons.jsx

import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase/firebaseConfig";
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const MyLessons = () => {
  const { currentUser, userData } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      if (!currentUser) return;

      try {
        const q = query(
          collection(db, "lessons"),
          where("creatorId", "==", currentUser.uid)
        );
        const snapshot = await getDocs(q);
        const lessonsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLessons(lessonsList);
      } catch (error) {
        toast.error("Failed to load lessons");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [currentUser]);

  const handleVisibilityChange = async (id, newVisibility) => {
    try {
      await updateDoc(doc(db, "lessons", id), {
        visibility: newVisibility,
        updatedAt: new Date(),
      });
      setLessons(lessons.map(l => l.id === id ? { ...l, visibility: newVisibility } : l));
      toast.success("Visibility updated");
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  const handleAccessLevelChange = async (id, newLevel) => {
    if (newLevel === "Premium" && !userData?.isPremium) {
      toast.error("Upgrade to Premium to make lesson Premium");
      return;
    }

    try {
      await updateDoc(doc(db, "lessons", id), {
        accessLevel: newLevel,
        updatedAt: new Date(),
      });
      setLessons(lessons.map(l => l.id === id ? { ...l, accessLevel: newLevel } : l));
      toast.success("Access level updated");
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;

    try {
      await deleteDoc(doc(db, "lessons", id));
      setLessons(lessons.filter(l => l.id !== id));
      toast.success("Lesson deleted");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  if (loading) return <p className="text-center text-xl mt-20">Loading your lessons...</p>;

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
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Tone</th>
              <th className="p-4 text-left">Visibility</th>
              <th className="p-4 text-left">Access Level</th>
              <th className="p-4 text-left">Created</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{lesson.title}</td>
                <td className="p-4">{lesson.category}</td>
                <td className="p-4">{lesson.emotionalTone}</td>
                <td className="p-4">
                  <select
                    value={lesson.visibility}
                    onChange={(e) => handleVisibilityChange(lesson.id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </td>
                <td className="p-4">
                  <select
                    value={lesson.accessLevel}
                    onChange={(e) => handleAccessLevelChange(lesson.id, e.target.value)}
                    disabled={!userData?.isPremium && e.target.value === "Premium"}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Free">Free</option>
                    <option value="Premium">Premium</option>
                  </select>
                </td>
                <td className="p-4">
                  {lesson.createdAt?.toDate().toLocaleDateString()}
                </td>
                <td className="p-4">
                  <Link
                    to={`/lessons/${lesson.id}`}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(lesson.id)}
                    className="text-red-600 hover:underline"
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