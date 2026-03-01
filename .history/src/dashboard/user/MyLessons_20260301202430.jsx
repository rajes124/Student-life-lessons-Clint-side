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
  Globe
} from "lucide-react";

const MyLessons = () => {
  const { currentUser, userData } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Logic Remains Same ---
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
        <div className="text-center p-6 bg-white rounded-3xl shadow-2xl max-w-sm mx-auto border border-red-50">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-10 h-10 text-red-500" />
          </div>
          <p className="font-black text-2xl mb-2 text-slate-900">Delete Lesson?</p>
          <p className="text-slate-500 mb-6 italic">"{title}"</p>
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
              className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-red-100"
            >
              Confirm
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: Infinity, position: "top-center", style: { background: "transparent", boxShadow: "none" } }
    );
  };

  // --- UI UX Components ---

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
        <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
            <BookOpen className="w-8 h-8 text-indigo-600 absolute inset-0 m-auto" />
        </div>
        <p className="text-xl font-black text-slate-400 tracking-tighter uppercase">Syncing Lessons...</p>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="text-center group">
          <div className="relative mb-8 inline-block">
             <div className="absolute inset-0 bg-indigo-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
             <BookOpen className="w-32 h-32 text-indigo-100 relative z-10 mx-auto" />
          </div>
          <h2 className="text-4xl font-black text-slate-800 mb-4">No Wisdom Shared Yet</h2>
          <p className="text-slate-500 mb-10 max-w-md mx-auto">Your dashboard is empty. Time to create your first impactful life lesson!</p>
          <Link
            to="/dashboard/add-lesson"
            className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl text-xl font-black shadow-xl hover:shadow-indigo-200 transition-all transform hover:-translate-y-1"
          >
            <PlusCircle className="w-6 h-6" />
            Create Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight flex items-center gap-4">
            My <span className="text-indigo-600">Lessons</span>
          </h2>
          <p className="text-slate-500 font-medium mt-2 flex items-center gap-2">
            <span className="w-8 h-1 bg-indigo-600 rounded-full inline-block"></span>
            Manage and monitor your shared wisdom ({lessons.length} items)
          </p>
        </div>
        <Link 
          to="/dashboard/add-lesson" 
          className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
        >
          <PlusCircle className="w-5 h-5" />
          New Lesson
        </Link>
      </div>

      {/* Modern Table Container */}
      <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">Lesson Info</th>
                <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 hidden lg:table-cell">Meta Data</th>
                <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">Visibility & Access</th>
                <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 hidden md:table-cell text-center">Engagement</th>
                <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {lessons.map((lesson) => (
                <tr key={lesson._id} className="group hover:bg-indigo-50/30 transition-colors">
                  
                  {/* Lesson Info */}
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        {lesson.imageURL ? (
                          <img src={lesson.imageURL} alt="" className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-2xl shadow-sm border border-white" />
                        ) : (
                          <div className="w-14 h-14 md:w-16 md:h-16 bg-indigo-50 rounded-2xl flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-indigo-300" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-800 truncate text-lg group-hover:text-indigo-600 transition-colors">{lesson.title}</h4>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-400 font-bold uppercase tracking-tighter">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(lesson.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Meta Data - Hidden on Mobile */}
                  <td className="p-6 hidden lg:table-cell">
                    <div className="space-y-1">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest">{lesson.category}</span>
                      <p className="text-sm text-slate-400 italic">Tone: {lesson.emotionalTone}</p>
                    </div>
                  </td>

                  {/* Settings */}
                  <td className="p-6">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <select
                        value={lesson.visibility}
                        onChange={(e) => handleVisibilityChange(lesson._id, e.target.value)}
                        className={`text-[10px] font-black uppercase tracking-tighter px-3 py-2 rounded-xl border-none outline-none ring-1 transition-all ${lesson.visibility === 'Public' ? 'ring-green-100 bg-green-50 text-green-600' : 'ring-slate-100 bg-slate-50 text-slate-500'}`}
                      >
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                      </select>

                      <select
                        value={lesson.accessLevel}
                        onChange={(e) => handleAccessLevelChange(lesson._id, e.target.value)}
                        disabled={!userData?.isPremium}
                        className={`text-[10px] font-black uppercase tracking-tighter px-3 py-2 rounded-xl border-none outline-none ring-1 transition-all ${lesson.accessLevel === 'Premium' ? 'ring-amber-100 bg-amber-50 text-amber-600' : 'ring-indigo-100 bg-indigo-50 text-indigo-600'} disabled:opacity-40`}
                      >
                        <option value="Free">Free</option>
                        <option value="Premium">✨ Premium</option>
                      </select>
                    </div>
                  </td>

                  {/* Stats - Hidden on Small Mobile */}
                  <td className="p-6 hidden md:table-cell">
                    <div className="flex justify-center items-center gap-4">
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-rose-500 font-bold"><Heart className="w-4 h-4 fill-current" /> {lesson.likesCount || 0}</div>
                        <p className="text-[10px] uppercase font-black text-slate-300">Likes</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-blue-500 font-bold"><Bookmark className="w-4 h-4 fill-current" /> {lesson.savedBy?.length || 0}</div>
                        <p className="text-[10px] uppercase font-black text-slate-300">Saves</p>
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/lessons/${lesson._id}`} className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm" title="View"><Eye className="w-5 h-5" /></Link>
                      <Link to={`/dashboard/update-lesson/${lesson._id}`} className="p-3 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-600 hover:text-white transition-all shadow-sm" title="Edit"><Edit className="w-5 h-5" /></Link>
                      <button onClick={() => handleDelete(lesson._id, lesson.title)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm" title="Delete"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Desktop Footer Stats */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-sm font-bold uppercase tracking-widest px-6">
          <p>© {new Date().getFullYear()} Studio Insights</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Secure Data</span>
              <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> Global Access</span>
          </div>
      </div>
    </div>
  );
};

export default MyLessons;