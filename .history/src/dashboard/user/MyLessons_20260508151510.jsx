// src/pages/Dashboard/MyLessons.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  Heart,
  Bookmark,
  Eye,
  Edit,
  Trash2,
  Loader2,
  PlusCircle,
  MoreVertical,
  ChevronRight,
  ShieldCheck,
  Globe,
  Tag,
  Lock
} from "lucide-react";

const MyLessons = () => {
  const { currentUser, userData } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Logic Remains Exactly Same ---
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
        <div className="text-center p-6 bg-base-100 rounded-3xl shadow-2xl max-w-[90vw] md:max-w-sm mx-auto border border-red-200">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 md:w-10 md:h-10 text-red-500" />
          </div>
          <p className="font-black text-xl md:text-2xl mb-2 text-base-content">Delete Lesson?</p>
          <p className="text-base-content/70 mb-6 italic text-sm md:text-base line-clamp-2">"{title}"</p>
          <div className="flex justify-center gap-3">
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
              className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-red-100 text-sm md:text-base"
            >
              Confirm
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex-1 py-3 bg-base-200 hover:bg-base-300 text-base-content/70 rounded-2xl font-bold transition-all text-sm md:text-base"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: Infinity, position: "top-center", style: { background: "transparent", boxShadow: "none" } }
    );
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4 px-4">
        <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
            <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-indigo-600 absolute inset-0 m-auto" />
        </div>
        <p className="text-sm md:text-xl font-black text-base-content/70 tracking-tighter uppercase text-center">Syncing Insights...</p>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="text-center group w-full max-w-md">
          <div className="relative mb-6 md:mb-8 inline-block">
             <div className="absolute inset-0 bg-indigo-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
             <BookOpen className="w-24 h-24 md:w-32 md:h-32 text-indigo-100 relative z-10 mx-auto" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-base-content mb-4">No Wisdom Shared</h2>
          <p className="text-base-content/70 mb-8 px-4 font-bold text-sm md:text-base">Your digital archive is waiting for its first spark of wisdom.</p>
          <Link
            to="/dashboard/add-lesson"
            className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-slate-900 text-white px-8 py-4 rounded-2xl text-lg md:text-xl font-black shadow-xl transition-all active:scale-95"
          >
            <PlusCircle className="w-6 h-6" />
            Create Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 md:px-8">
      
      {/* Header Section - Mobile Optimized */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-6xl font-black text-base-content tracking-tight flex items-center justify-center md:justify-start gap-4">
            My <span className="text-indigo-600 underline decoration-indigo-100 underline-offset-8">Lessons</span>
          </h2>
          <p className="text-base-content/70 font-bold mt-4 flex items-center justify-center md:justify-start gap-2 text-xs md:text-sm uppercase tracking-widest">
            <span className="w-6 h-1 bg-indigo-600 rounded-full hidden md:inline-block"></span>
            MANAGING {lessons.length} PUBLISHED INSIGHTS
          </p>
        </div>
        <Link 
          to="/dashboard/add-lesson" 
          className="w-full md:w-auto bg-slate-900 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
        >
          <PlusCircle className="w-5 h-5" />
          New Lesson
        </Link>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="bg-base-100 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-base-300 overflow-hidden">
        <div className="overflow-x-auto overflow-y-hidden">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-base-200/70">
                <th className="p-4 md:p-6 text-[10px] font-black uppercase tracking-widest text-base-content/50 border-b border-base-300">Lesson & Details</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-base-content/50 border-b border-base-300 hidden lg:table-cell">Category</th>
                <th className="p-4 md:p-6 text-[10px] font-black uppercase tracking-widest text-base-content/50 border-b border-base-300">Status & Access</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-base-content/50 border-b border-base-300 hidden md:table-cell text-center">Stats</th>
                <th className="p-4 md:p-6 text-[10px] font-black uppercase tracking-widest text-base-content/50 border-b border-base-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200">
              {lessons.map((lesson) => (
<tr key={lesson._id} className="group hover:bg-base-200/80 transition-all">
                   
                  {/* Lesson Info - High HD Image Handling */}
                  <td className="p-4 md:p-6">
                    <div className="flex items-center gap-3 md:gap-5">
                      <div className="relative flex-shrink-0">
                        {lesson.imageURL ? (
                          <img src={lesson.imageURL} alt="" className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-xl md:rounded-2xl shadow-md border-2 border-white ring-1 ring-base-300" />
                        ) : (
                          <div className="w-12 h-12 md:w-16 md:h-16 bg-base-200 rounded-xl md:rounded-2xl flex items-center justify-center">
                            <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-base-content/40" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 max-w-[120px] sm:max-w-xs lg:max-w-md">
                        <h4 className="font-black text-base-content truncate text-sm md:text-lg group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{lesson.title}</h4>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-base-content/50 font-bold">
                          <Calendar className="w-3 h-3 text-indigo-500" /> {new Date(lesson.createdAt).toLocaleDateString()}
                          <span className="lg:hidden text-indigo-400">• {lesson.category}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Meta Data - Desktop Only */}
                  <td className="p-6 hidden lg:table-cell">
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest w-fit">
                        <Tag className="w-3 h-3" /> {lesson.category}
                      </span>
                      <p className="text-[11px] text-base-content/50 font-bold italic pl-1">Tone: {lesson.emotionalTone}</p>
                    </div>
                  </td>

                  {/* Settings - Mobile Touch Friendly */}
                  <td className="p-4 md:p-6">
                    <div className="flex flex-col gap-2">
                      <div className="relative group/select">
                        <select
                          value={lesson.visibility}
                          onChange={(e) => handleVisibilityChange(lesson._id, e.target.value)}
                          className={`w-full text-[9px] md:text-[10px] font-black uppercase px-2 md:px-3 py-1.5 md:py-2 rounded-lg border-2 border-transparent transition-all cursor-pointer outline-none ${lesson.visibility === 'public' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-base-200 text-base-content/70'}`}
                        >
                          <option value="public">🌐 Public</option>
                          <option value="private">🔒 Private</option>
                        </select>
                      </div>

                      <select
                        value={lesson.accessLevel}
                        onChange={(e) => handleAccessLevelChange(lesson._id, e.target.value)}
                        disabled={!userData?.isPremium}
                        className={`w-full text-[9px] md:text-[10px] font-black uppercase px-2 md:px-3 py-1.5 md:py-2 rounded-lg border-2 border-transparent transition-all cursor-pointer outline-none ${lesson.accessLevel === 'premium' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'} disabled:opacity-30 disabled:grayscale`}
                      >
                        <option value="free">🔓 Free</option>
                        <option value="premium">💎 Premium</option>
                      </select>
                    </div>
                  </td>

                  {/* Stats - Hidden on Small Devices */}
                  <td className="p-6 hidden md:table-cell">
                    <div className="flex justify-center items-center gap-6">
                      <div className="text-center group/stat">
                        <div className="flex items-center justify-center gap-1.5 text-rose-500 font-black text-lg">
                           <Heart className="w-4 h-4 fill-current group-hover/stat:scale-125 transition-transform" /> 
                           {lesson.likesCount || 0}
                        </div>
                        <p className="text-[9px] uppercase font-black text-base-content/50 tracking-widest">Appreciation</p>
                      </div>
                      <div className="text-center group/stat">
                        <div className="flex items-center justify-center gap-1.5 text-blue-500 font-black text-lg">
                           <Bookmark className="w-4 h-4 fill-current group-hover/stat:scale-125 transition-transform" /> 
                           {lesson.savedBy?.length || 0}
                        </div>
                        <p className="text-[9px] uppercase font-black text-base-content/50 tracking-widest">Collections</p>
                      </div>
                    </div>
                  </td>

                  {/* Actions - Flex centered for Mobile */}
                  <td className="p-4 md:p-6 text-right">
                    <div className="flex items-center justify-end gap-1.5 md:gap-3">
                      <Link to={`/lessons/${lesson._id}`} className="p-2 md:p-3 bg-base-200 text-base-content/70 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm" title="View"><Eye className="w-4 h-4 md:w-5 md:h-5" /></Link>
                      <Link to={`/dashboard/update-lesson/${lesson._id}`} className="p-2 md:p-3 bg-base-200 text-base-content/70 rounded-xl hover:bg-amber-500 hover:text-white transition-all shadow-sm" title="Edit"><Edit className="w-4 h-4 md:w-5 md:h-5" /></Link>
                      <button onClick={() => handleDelete(lesson._id, lesson.title)} className="p-2 md:p-3 bg-base-200 text-base-content/70 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm" title="Delete"><Trash2 className="w-4 h-4 md:w-5 md:h-5" /></button>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern Footer Section */}
      <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-between text-base-content/50 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] px-4 md:px-8 gap-4">
          <p className="text-center sm:text-left opacity-60">© {new Date().getFullYear()} STUDIO INSIGHTS ENGINE</p>
          <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 hover:text-indigo-600 transition-colors cursor-help"><ShieldCheck className="w-4 h-4" /> ENCRYPTED</span>
              <span className="flex items-center gap-2 hover:text-indigo-600 transition-colors cursor-help"><Globe className="w-4 h-4" /> MULTI-REGION</span>
          </div>
      </div>
    </div>
  );
};

export default MyLessons;