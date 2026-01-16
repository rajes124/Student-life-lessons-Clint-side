// src/dashboard/user/AddLesson.jsx
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  FileText,
  Tag,
  Smile,
  Image,
  Eye,
  Lock,
  PlusCircle,
  Loader2,
  AlertTriangle,           // ← এটা যোগ করা হয়েছে (error fix)
} from "lucide-react";

const AddLesson = () => {
  const { userData } = useAuth();
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

  const tones = ["Motivational", "Sad", "Realization", "Gratitude"];

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
      const payload = {
        title: title.trim(),
        description: description.trim(),
        category,
        emotionalTone,
        imageURL: imageURL.trim() || null,
        visibility: visibility.toLowerCase(),
        accessLevel: accessLevel.toLowerCase(),
      };

      const res = await api.post("/lessons/add", payload);

      toast.success(res.data?.message || "Lesson added successfully!");

      // Reset form
      setTitle("");
      setDescription("");
      setImageURL("");
      setCategory("Personal Growth");
      setEmotionalTone("Motivational");
      setVisibility("Public");
      setAccessLevel("Free");

      navigate("/dashboard/my-lessons");
    } catch (error) {
      console.error("Add lesson error:", error);

      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Unauthorized. Please login again.");
          navigate("/login");
        } else {
          toast.error(error.response.data?.message || "Server Error");
        }
      } else if (error.request) {
        toast.error("No response from server. Check backend.");
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-10 border border-indigo-100">
      <h2 className="text-4xl font-bold text-indigo-700 mb-10 text-center flex items-center justify-center gap-3">
        <PlusCircle className="w-10 h-10 text-indigo-600" />
        Add New Life Lesson
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div className="relative">
          <label className="block text-lg font-medium text-gray-700 mb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            Lesson Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-lg placeholder-gray-400 shadow-sm"
            placeholder="Enter a meaningful title for your lesson"
          />
        </div>

        {/* Description */}
        <div className="relative">
          <label className="block text-lg font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            Full Description / Story *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="8"
            className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-lg placeholder-gray-400 shadow-sm resize-y"
            placeholder="Share your insight, personal story or life lesson..."
          />
        </div>

        {/* Category + Tone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-lg font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Tag className="w-5 h-5 text-purple-600" />
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-lg shadow-sm"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <label className="block text-lg font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Smile className="w-5 h-5 text-amber-600" />
              Emotional Tone
            </label>
            <select
              value={emotionalTone}
              onChange={(e) => setEmotionalTone(e.target.value)}
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-lg shadow-sm"
            >
              {tones.map((tone) => (
                <option key={tone} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Image URL */}
        <div className="relative">
          <label className="block text-lg font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Image className="w-5 h-5 text-indigo-600" />
            Featured Image URL (optional)
          </label>
          <input
            type="url"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-lg placeholder-gray-400 shadow-sm"
            placeholder="https://example.com/your-image.jpg"
          />
        </div>

        {/* Visibility + Access Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-lg font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-600" />
              Visibility
            </label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-lg shadow-sm"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          <div className="relative">
            <label className="block text-lg font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Lock className="w-5 h-5 text-orange-600" />
              Access Level
            </label>
            <select
              value={accessLevel}
              onChange={(e) => setAccessLevel(e.target.value)}
              disabled={!userData?.isPremium}
              className={`w-full px-5 py-4 border rounded-xl focus:ring-2 transition-all text-lg shadow-sm ${
                !userData?.isPremium
                  ? "bg-gray-100 cursor-not-allowed border-gray-300"
                  : "border-gray-300 focus:ring-indigo-500 focus:border-transparent"
              }`}
            >
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
            </select>

            {!userData?.isPremium && (
              <p className="mt-3 text-sm text-orange-600 flex items-center gap-2 font-medium">
                <AlertTriangle className="w-5 h-5" />
                Upgrade to Premium to create Premium lessons
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-8">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-12 rounded-xl text-xl shadow-lg transition-all transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 mx-auto min-w-[220px]"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Adding Lesson...
              </>
            ) : (
              <>
                <PlusCircle className="w-6 h-6" />
                Add Lesson
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLesson;