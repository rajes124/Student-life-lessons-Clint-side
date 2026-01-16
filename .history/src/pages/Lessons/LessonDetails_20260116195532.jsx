// src/pages/LessonDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; 
import api from "../../utils/api"; 
import toast from "react-hot-toast";
import { 
  Lock, Heart, Bookmark, Share2, Flag, Calendar, Clock, User, Eye 
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const LessonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [similarLessons, setSimilarLessons] = useState([]);
  const [views, setViews] = useState(0);

  const defaultImage = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1473&q=80";

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await api.get(`/lessons/details/${id}`);
        const data = res.data.lesson || res.data;

        setLesson(data);

        // Premium check
        if (data.accessLevel === "Premium" && !userData?.isPremium) {
          toast.error("This is a Premium lesson. Upgrade to view full content.");
          navigate("/pricing");
          return;
        }

        // Like & Save status
        if (currentUser) {
          setLiked(data.likes?.includes(currentUser.uid) || false);
          setSaved(data.savedBy?.includes(currentUser.uid) || false);
        }

        // Random views count (for demo – in real app use backend count)
        setViews(Math.floor(Math.random() * 10000) + 1000);

        // Fetch similar lessons
        fetchSimilarLessons(data.category, data.emotionalTone, data._id);

      } catch (error) {
        toast.error("Lesson not found or access denied");
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };

    const fetchSimilarLessons = async (category, tone, currentId) => {
      try {
        const res = await api.get("/lessons/public");
        const allLessons = res.data.lessons || [];

        const filtered = allLessons
          .filter(l => l._id !== currentId && (l.category === category || l.emotionalTone === tone))
          .sort(() => 0.5 - Math.random())
          .slice(0, 6);

        setSimilarLessons(filtered);
      } catch (err) {
        toast.error("Failed to load similar lessons");
      }
    };

    fetchLesson();
  }, [id, navigate, currentUser, userData]);

  const handleLike = async () => {
    if (!currentUser) {
      toast.error("Please log in to like this lesson");
      navigate("/login");
      return;
    }

    try {
      await api.post(`/lessons/like/${id}`);
      setLiked(!liked);
      setLesson(prev => ({
        ...prev,
        likesCount: liked ? (prev.likesCount || 1) - 1 : (prev.likesCount || 0) + 1
      }));
      toast.success(liked ? "Like removed" : "Lesson liked!");
    } catch (error) {
      toast.error("Failed to like lesson");
    }
  };

  const handleSave = async () => {
    if (!currentUser) {
      toast.error("Please log in to save this lesson");
      navigate("/login");
      return;
    }

    try {
      await api.post(`/lessons/favorite/${id}`);
      setSaved(!saved);
      toast.success(saved ? "Removed from favorites" : "Saved to favorites!");
    } catch (error) {
      toast.error("Failed to save lesson");
    }
  };

  const handleReport = () => {
    if (!currentUser) {
      toast.error("Please log in to report");
      return;
    }

    const reason = window.prompt(
      "Why are you reporting this lesson?\n\nOptions:\n• Inappropriate Content\n• Hate Speech or Harassment\n• Misleading or False Information\n• Spam or Promotional Content\n• Sensitive or Disturbing Content\n• Other"
    );

    if (reason && reason.trim()) {
      toast.success("Lesson reported. Thank you for helping keep the community safe.");
    } else if (reason !== null) {
      toast.error("Please provide a reason for reporting");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-8 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6" />
        <p className="text-2xl font-medium text-gray-700">Loading lesson details...</p>
      </div>
    );
  }

  if (!lesson) return null;

  const isPremiumLocked = lesson.accessLevel === "Premium" && !userData?.isPremium;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Premium Lock Overlay */}
        {isPremiumLocked && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl p-10 md:p-12 text-center shadow-2xl max-w-md w-full">
              <Lock className="w-20 h-20 text-amber-500 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Premium Lesson</h2>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Unlock full access to this inspiring student life lesson by upgrading to Premium.
              </p>
              <button
                onClick={() => navigate("/pricing")}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg transition transform hover:scale-105 w-full sm:w-auto"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={`transition-all duration-1000 ${isPremiumLocked ? "filter blur-lg pointer-events-none" : ""}`}>
          {/* Hero Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-10 md:mb-12">
            <img
              src={lesson.imageURL || defaultImage}
              alt={lesson.title}
              className="w-full h-64 sm:h-80 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-10 text-white">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-2xl leading-tight">
                {lesson.title}
              </h1>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <span className="bg-indigo-600/80 px-4 sm:px-5 py-2 rounded-full text-base sm:text-lg font-medium">
                  {lesson.category}
                </span>
                <span className="bg-purple-600/80 px-4 sm:px-5 py-2 rounded-full text-base sm:text-lg font-medium">
                  {lesson.emotionalTone}
                </span>
                {lesson.accessLevel === "Premium" && (
                  <span className="bg-amber-500/90 px-4 sm:px-5 py-2 rounded-full text-base sm:text-lg font-bold">
                    Premium
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl mb-10 md:mb-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 text-center">
              <div>
                <Calendar className="w-10 h-10 md:w-12 md:h-12 mx-auto text-indigo-600 mb-3" />
                <p className="text-sm text-gray-600">Created</p>
                <p className="text-lg md:text-xl font-semibold">
                  {new Date(lesson.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <Clock className="w-10 h-10 md:w-12 md:h-12 mx-auto text-purple-600 mb-3" />
                <p className="text-sm text-gray-600">Reading Time</p>
                <p className="text-lg md:text-xl font-semibold">~5 min</p>
              </div>
              <div>
                <Eye className="w-10 h-10 md:w-12 md:h-12 mx-auto text-teal-600 mb-3" />
                <p className="text-sm text-gray-600">Views</p>
                <p className="text-lg md:text-xl font-semibold">{views.toLocaleString()}</p>
              </div>
              <div>
                <span className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-base sm:text-lg font-medium ${lesson.visibility === "Public" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                  {lesson.visibility}
                </span>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xl mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-6 md:mb-8">
              The Full Story
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-line">
              {lesson.description}
            </p>
          </div>

          {/* Author Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl mb-10 md:mb-12 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <img
              src={lesson.creatorPhoto || "https://i.pravatar.cc/150"}
              alt={lesson.creatorName}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-indigo-200 flex-shrink-0"
              onError={(e) => e.target.src = "https://i.pravatar.cc/150"}
            />
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold flex items-center justify-center sm:justify-start gap-3 mb-3">
                <User className="w-8 h-8 text-indigo-600" />
                {lesson.creatorName || "Anonymous Student"}
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Sharing wisdom from student life experiences
              </p>
              <button
                onClick={() => navigate(`/profile/${lesson.creatorId}`)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg transition transform hover:scale-105 w-full sm:w-auto"
              >
                View All Lessons by This Student
              </button>
            </div>
          </div>

          {/* Stats & Interaction */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xl mb-10 md:mb-12">
            <div className="grid grid-cols-3 gap-6 md:gap-12 text-center mb-10 md:mb-12">
              <div>
                <Heart className={`w-12 h-12 md:w-14 md:h-14 mx-auto mb-4 ${liked ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
                <p className="text-3xl md:text-4xl font-bold">{lesson.likesCount || 0}</p>
                <p className="text-base md:text-lg text-gray-600">Likes</p>
              </div>
              <div>
                <Bookmark className={`w-12 h-12 md:w-14 md:h-14 mx-auto mb-4 ${saved ? "text-blue-500 fill-blue-500" : "text-gray-400"}`} />
                <p className="text-3xl md:text-4xl font-bold">{lesson.savedBy?.length || 0}</p>
                <p className="text-base md:text-lg text-gray-600">Saves</p>
              </div>
              <div>
                <Eye className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-4 text-teal-600" />
                <p className="text-3xl md:text-4xl font-bold">{views.toLocaleString()}</p>
                <p className="text-base md:text-lg text-gray-600">Views</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <button
                onClick={handleLike}
                className={`flex items-center gap-3 sm:gap-4 px-6 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl transition transform hover:scale-105 shadow-lg ${
                  liked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                <Heart className={`w-7 h-7 sm:w-8 sm:h-8 ${liked ? "fill-white" : ""}`} />
                {liked ? "Liked" : "Like"}
              </button>

              <button
                onClick={handleSave}
                className={`flex items-center gap-3 sm:gap-4 px-6 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl transition transform hover:scale-105 shadow-lg ${
                  saved ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                <Bookmark className={`w-7 h-7 sm:w-8 sm:h-8 ${saved ? "fill-white" : ""}`} />
                {saved ? "Saved" : "Save"}
              </button>

              <button
                onClick={handleReport}
                className="flex items-center gap-3 sm:gap-4 px-6 sm:px-10 py-4 sm:py-5 rounded-full bg-orange-100 text-orange-700 font-bold text-lg sm:text-xl hover:bg-orange-200 transition shadow-lg"
              >
                <Flag className="w-7 h-7 sm:w-8 sm:h-8" />
                Report
              </button>

              <button className="flex items-center gap-3 sm:gap-4 px-6 sm:px-10 py-4 sm:py-5 rounded-full bg-teal-100 text-teal-700 font-bold text-lg sm:text-xl hover:bg-teal-200 transition shadow-lg">
                <Share2 className="w-7 h-7 sm:w-8 sm:h-8" />
                Share
              </button>
            </div>
          </div>

          {/* Similar Lessons */}
          {similarLessons.length > 0 && (
            <div className="mt-12 md:mt-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 md:mb-14 text-indigo-800">
                Similar Student Life Lessons
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {similarLessons.map((sim) => (
                  <Link
                    key={sim._id}
                    to={`/lessons/${sim._id}`}
                    className="group bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 flex flex-col h-full"
                  >
                    <img
                      src={sim.imageURL || defaultImage}
                      alt={sim.title}
                      className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="p-6 sm:p-8 flex flex-col flex-grow">
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 line-clamp-2">{sim.title}</h3>
                      <p className="text-gray-600 text-sm sm:text-base mb-6 line-clamp-3 flex-grow">
                        {sim.description}
                      </p>
                      <div className="flex items-center gap-3 mt-auto">
                        <img
                          src={sim.creatorPhoto || "https://i.pravatar.cc/100"}
                          alt={sim.creatorName}
                          className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100"
                        />
                        <div>
                          <p className="font-medium text-gray-800">{sim.creatorName || "Student"}</p>
                          <p className="text-sm text-gray-500">{sim.category}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;