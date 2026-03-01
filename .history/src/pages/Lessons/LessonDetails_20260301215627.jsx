// src/pages/LessonDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; 
import api from "../../utils/api"; 
import toast from "react-hot-toast";
import { 
  Lock, Heart, Bookmark, Share2, Flag, Calendar, Clock, User, Eye, ArrowLeft
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

        if (data.accessLevel === "Premium" && !userData?.isPremium) {
          toast.error("Premium lesson! Redirecting to pricing...");
          navigate("/pricing");
          return;
        }

        if (currentUser) {
          setLiked(data.likes?.includes(currentUser.uid) || false);
          setSaved(data.savedBy?.includes(currentUser.uid) || false);
        }

        setViews(Math.floor(Math.random() * 10000) + 1000);
        fetchSimilarLessons(data.category, data.emotionalTone, data._id);

      } catch (error) {
        toast.error("Lesson not found.");
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
          .slice(0, 3);
        setSimilarLessons(filtered);
      } catch (err) {
        console.error("Failed to load similar lessons.");
      }
    };

    fetchLesson();
    window.scrollTo(0, 0); // পেজ লোড হলে একদম উপরে নিয়ে যাবে
  }, [id, navigate, currentUser, userData]);

  const handleLike = async () => {
    if (!currentUser) return navigate("/login");
    try {
      await api.post(`/lessons/like/${id}`);
      setLiked(!liked);
      setLesson(prev => ({
        ...prev,
        likesCount: liked ? (prev.likesCount || 1) - 1 : (prev.likesCount || 0) + 1
      }));
      toast.success(liked ? "Like removed." : "Added to favorites!", { icon: "❤️" });
    } catch (error) {
      toast.error("Failed to update like status.");
    }
  };

  const handleSave = async () => {
    if (!currentUser) return navigate("/login");
    try {
      await api.post(`/lessons/favorite/${id}`);
      setSaved(!saved);
      toast.success(saved ? "Removed from saved." : "Saved for later!", { icon: "🔖" });
    } catch (error) {
      toast.error("Failed to save lesson.");
    }
  };

  const handleReport = () => {
    if (!currentUser) return toast.error("Please login to report.");
    const reason = window.prompt("Why are you reporting this? (Inappropriate/Spam/Other)");
    if (reason?.trim()) {
      toast.success("Thank you for your report.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 animate-pulse">Loading amazing story...</p>
      </div>
    );
  }

  if (!lesson) return null;

  const isPremiumLocked = lesson.accessLevel === "Premium" && !userData?.isPremium;

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      {/* Header/Back Button */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 transition"
        >
          <ArrowLeft size={20} /> Back
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Main Content Card */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
          
          {/* Hero Section */}
          <div className="relative group">
            <img
              src={lesson.imageURL || defaultImage}
              alt={lesson.title}
              className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                  {lesson.category}
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                  {lesson.emotionalTone}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-md">
                {lesson.title}
              </h1>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-50">
            <div className="p-4 flex flex-col items-center justify-center border-r border-gray-50">
              <Calendar className="text-gray-400 mb-1" size={18} />
              <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Date</p>
              <p className="text-sm font-bold text-gray-800">{new Date(lesson.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="p-4 flex flex-col items-center justify-center border-r border-gray-50">
              <Clock className="text-gray-400 mb-1" size={18} />
              <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Reading</p>
              <p className="text-sm font-bold text-gray-800">5 Mins</p>
            </div>
            <div className="p-4 flex flex-col items-center justify-center border-r border-gray-50">
              <Eye className="text-gray-400 mb-1" size={18} />
              <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Views</p>
              <p className="text-sm font-bold text-gray-800">{views.toLocaleString()}</p>
            </div>
            <div className="p-4 flex flex-col items-center justify-center">
              <div className={`w-3 h-3 rounded-full animate-pulse mb-1 ${lesson.visibility === "Public" ? "bg-green-500" : "bg-orange-500"}`} />
              <p className="text-xs font-bold text-gray-800 uppercase">{lesson.visibility}</p>
            </div>
          </div>

          {/* Article Body */}
          <div className="p-6 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-indigo-600 rounded-full" />
              The Full Story
            </h2>
            <div className="prose prose-indigo max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line font-medium">
                {lesson.description}
              </p>
            </div>
          </div>

          {/* Author Card */}
          <div className="mx-6 md:mx-12 mb-8 p-6 bg-indigo-50 rounded-2xl flex flex-col sm:flex-row items-center gap-6">
            <img
              src={lesson.creatorPhoto || "https://i.pravatar.cc/150"}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-lg"
              alt="author"
            />
            <div className="text-center sm:text-left flex-1">
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">Created By</p>
              <h3 className="text-xl font-black text-gray-900 mb-3">{lesson.creatorName || "Anonymous Student"}</h3>
              <button
                onClick={() => navigate(`/profile/${lesson.creatorId}`)}
                className="text-sm font-bold bg-white text-indigo-600 px-4 py-2 rounded-xl shadow-sm hover:bg-indigo-600 hover:text-white transition-all"
              >
                View Profile
              </button>
            </div>
          </div>

          {/* Interaction Bar */}
          <div className="px-6 py-8 bg-gray-50/50 border-t border-gray-100">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                  liked ? "bg-red-500 text-white shadow-lg shadow-red-200" : "bg-white text-gray-700 border border-gray-200 hover:bg-red-50"
                }`}
              >
                <Heart size={20} fill={liked ? "white" : "none"} />
                {lesson.likesCount || 0}
              </button>

              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                  saved ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-white text-gray-700 border border-gray-200 hover:bg-blue-50"
                }`}
              >
                <Bookmark size={20} fill={saved ? "white" : "none"} />
                {saved ? "Saved" : "Save"}
              </button>

              <div className="h-8 w-[1px] bg-gray-200 hidden sm:block" />

              <button className="p-3 rounded-2xl bg-white border border-gray-200 text-gray-600 hover:text-teal-600 hover:border-teal-200 transition-all">
                <Share2 size={20} />
              </button>

              <button 
                onClick={handleReport}
                className="p-3 rounded-2xl bg-white border border-gray-200 text-gray-400 hover:text-orange-600 transition-all"
              >
                <Flag size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Similar Lessons Section */}
        {similarLessons.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-black text-gray-900 mb-8 px-2 uppercase tracking-tight">
              More Recommended for you
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarLessons.map((sim) => (
                <Link
                  key={sim._id}
                  to={`/lessons/${sim._id}`}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={sim.imageURL || defaultImage}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt="similar"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold text-indigo-600 uppercase">
                      {sim.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition">
                      {sim.title}
                    </h4>
                    <div className="mt-4 flex items-center gap-2">
                      <img src={sim.creatorPhoto || "https://i.pravatar.cc/100"} className="w-6 h-6 rounded-full" alt="sm" />
                      <span className="text-xs font-medium text-gray-500">{sim.creatorName || "Student"}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonDetails;