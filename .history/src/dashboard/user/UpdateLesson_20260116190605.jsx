// src/dashboard/user/UpdateLesson.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../utils/api";
import toast from "react-hot-toast";
import {
  BookOpen,
  FileText,
  Tag,
  Smile,
  Image as ImageIcon,
  Eye,
  Lock,
  Loader2,
  ArrowLeft,
} from "lucide-react";

const UpdateLesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Personal Growth");
  const [emotionalTone, setEmotionalTone] = useState("Motivational");
  const [imageURL, setImageURL] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [accessLevel, setAccessLevel] = useState("Free");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    "Personal Growth",
    "Career",
    "Relationships",
    "Mindset",
    "Mistakes Learned",
  ];

  const tones = ["Motivational", "Sad", "Realization", "Gratitude"];

  // Fetch lesson data by ID
  useEffect(() => {
    const fetchLesson = async () => {
      if (!id) return;

      try {
        const res = await api.get(`/lessons/${id}`);
        const lesson = res.data;

        // Check if current user is the owner
        if (lesson.creatorId !== userData?.uid) {
          toast.error("You are not authorized to edit this lesson");
          navigate("/dashboard/my-lessons");
          return;
        }

        setTitle(lesson.title || "");
        setDescription(lesson.description || "");
        setCategory(lesson.category || "Personal Growth");
        setEmotionalTone(lesson.emotionalTone || "Motivational");
        setImageURL(lesson.imageURL || "");
        setVisibility(lesson.visibility === "public" ? "Public" : "Private");
        setAccessLevel(lesson.accessLevel === "premium" ? "Premium" : "Free");
      } catch (error) {
        toast.error("Failed to load lesson data");
        console.error(error);
        navigate("/dashboard/my-lessons");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id, userData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("Title and Description are required");
      return;
    }

    if (accessLevel === "Premium" && !userData?.isPremium) {
      toast.error("Upgrade to Premium to make lesson Premium");
      return;
    }

    setSubmitting(true);

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

      await api.put(`/lessons/${id}`, payload);

      toast.success("Lesson updated successfully!");
      navigate("/dashboard/my-lessons");
    } catch (error) {
      console.error("Update lesson error:", error);
      toast.error(error.response?.data?.message || "Failed to update lesson");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mx-auto mb-6" />
          <p className="text-3xl font-bold text-indigo-700">Loading lesson data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10 bg-white rounded-3xl shadow-2xl mt-10 border border-indigo-100">
      <div className="flex items-center gap-4 mb-10">
        <button
          onClick={() => navigate("/dashboard/my-lessons")}
          className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h2 className="text-4xl md:text-5xl font-bold text-indigo-700 flex items-center gap-3">
          <Edit className="w-10 h-10 text-indigo-600" />
          Update Lesson
        </h2>
      </div>

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
            placeholder="Enter lesson title"
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
            placeholder="Update your story or lesson details..."
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
            <LinkIcon className="w-5 h-5 text-indigo-600" />
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

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8">
          <button
            type="button"
            onClick={() => navigate("/dashboard/my-lessons")}
            className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl transition shadow-md"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-2xl transition transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 min-w-[200px]"
          >
            {submitting ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateLesson;