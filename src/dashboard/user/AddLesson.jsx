// src/dashboard/user/AddLesson.jsx

import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddLesson = () => {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Personal Growth");
  const [emotionalTone, setEmotionalTone] = useState("Motivational");
  const [imageURL, setImageURL] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [accessLevel, setAccessLevel] = useState("Free");
  const [loading, setLoading] = useState(false);

  const categories = [
    "Personal Growth",
    "Career",
    "Relationships",
    "Mindset",
    "Mistakes Learned",
  ];

  const tones = [
    "Motivational",
    "Sad",
    "Realization",
    "Gratitude",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("Title and Description are required");
      return;
    }

    if (accessLevel === "Premium" && !userData?.isPremium) {
      toast.error("Upgrade to Premium to create Premium lessons");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "lessons"), {
        title,
        description,
        category,
        emotionalTone,
        imageURL: imageURL || null,
        visibility,
        accessLevel,
        creatorId: currentUser.uid,
        creatorName: currentUser.displayName || "Anonymous",
        creatorPhoto: currentUser.photoURL || null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        likes: [],
        favorites: [],
      });

      toast.success("Lesson added successfully!");
      navigate("/dashboard/my-lessons");
    } catch (error) {
      toast.error("Failed to add lesson");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-10">
      <h2 className="text-4xl font-bold text-indigo-700 mb-8 text-center">
        Add New Life Lesson
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Lesson Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter a meaningful title"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Full Description / Story *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="8"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Share your insight, story or lesson learned..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Emotional Tone
            </label>
            <select
              value={emotionalTone}
              onChange={(e) => setEmotionalTone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {tones.map((tone) => (
                <option key={tone} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Featured Image URL (optional)
          </label>
          <input
            type="url"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Visibility
            </label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Access Level
            </label>
            <select
              value={accessLevel}
              onChange={(e) => setAccessLevel(e.target.value)}
              disabled={!userData?.isPremium}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 ${
                !userData?.isPremium
                  ? "bg-gray-100 cursor-not-allowed"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            >
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
            </select>
            {!userData?.isPremium && (
              <p className="text-sm text-orange-600 mt-2">
                Upgrade to Premium to create Premium lessons
              </p>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-12 rounded-lg text-xl shadow-lg transition transform hover:scale-105 disabled:opacity-70"
          >
            {loading ? "Adding Lesson..." : "Add Lesson"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLesson;