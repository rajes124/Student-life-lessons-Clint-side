// src/dashboard/user/AddLesson.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// AOS Import
import AOS from "aos";
import "aos/dist/aos.css";

import {
  BookOpen,
  FileText,
  Tag,
  Smile,
  Image as ImageIcon,
  Eye,
  Lock,
  PlusCircle,
  Loader2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Globe
} from "lucide-react";

const AddLesson = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Personal Growth");
  const [emotionalTone, setEmotionalTone] = useState("Motivational");
  const [imageURL, setImageURL] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [accessLevel, setAccessLevel] = useState("Free");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(null);

  const categories = ["Personal Growth", "Career", "Relationships", "Mindset", "Mistakes Learned"];
  const tones = ["Motivational", "Sad", "Realization", "Gratitude"];

  // --- Logic Remains 100% Same ---
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
      navigate("/dashboard/my-lessons");
    } catch (error) {
      console.error("Add lesson error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 md:py-16 overflow-hidden">
      
      {/* Header Section */}
      <div className="text-center mb-12" data-aos="fade-down">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-indigo-600 text-white mb-6 shadow-lg shadow-indigo-200">
          <Sparkles className="w-4 h-4 fill-current" />
          <span className="text-xs font-black uppercase tracking-widest">Creator Studio</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-base-100 tracking-tighter mb-4">
          Share Your <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Wisdom</span>
        </h2>
        <p className="text-base-content/70 font-bold text-lg max-w-lg mx-auto">
          Create high-impact life lessons with clarity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Form */}
        <div className="lg:col-span-8 order-2 lg:order-1" data-aos="fade-right">
          <form onSubmit={handleSubmit} className="space-y-8 bg-base-100 p-6 md:p-10 rounded-[2.5rem] shadow-2xl border border-base-300">
            
            {/* Title Input */}
            <div className="space-y-3">
              <label className="text-sm font-black uppercase tracking-widest text-base-content ml-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" /> Lesson Title *
              </label>
              <input
                type="text"
                value={title}
                onFocus={() => setIsFocused('title')}
                onBlur={() => setIsFocused(null)}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-6 py-5 rounded-2xl bg-base-100 border-2 transition-all font-bold text-base-content text-lg placeholder:text-base-content/40 ${isFocused === 'title' ? 'border-indigo-600 bg-white ring-4 ring-indigo-50 shadow-inner' : 'border-base-300'}`}
                placeholder="Enter a bold title..."
              />
            </div>

            {/* Description Textarea */}
            <div className="space-y-3">
              <label className="text-sm font-black uppercase tracking-widest text-base-content ml-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" /> Detailed Insight *
              </label>
              <textarea
                value={description}
                rows="7"
                onFocus={() => setIsFocused('desc')}
                onBlur={() => setIsFocused(null)}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full px-6 py-5 rounded-2xl bg-base-100 border-2 transition-all font-semibold text-base-content text-lg placeholder:text-base-content/40 leading-relaxed ${isFocused === 'desc' ? 'border-indigo-600 bg-white ring-4 ring-indigo-50 shadow-inner' : 'border-base-300'}`}
                placeholder="Write your story here with full transparency..."
              />
            </div>

            {/* Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-black uppercase tracking-widest text-base-content ml-2 flex items-center gap-2">
                   <Tag className="w-4 h-4 text-indigo-600" /> Category
                </label>
                <div className="relative">
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-6 py-5 rounded-2xl bg-base-100 border-2 border-base-300 focus:border-indigo-600 font-bold text-base-content appearance-none shadow-sm cursor-pointer"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-base-content/40 font-bold">↓</div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-black uppercase tracking-widest text-base-content ml-2 flex items-center gap-2">
                   <Smile className="w-4 h-4 text-indigo-600" /> Emotional Tone
                </label>
                <div className="relative">
                  <select 
                    value={emotionalTone} 
                    onChange={(e) => setEmotionalTone(e.target.value)}
                    className="w-full px-6 py-5 rounded-2xl bg-base-100 border-2 border-base-300 focus:border-indigo-600 font-bold text-base-content appearance-none shadow-sm cursor-pointer"
                  >
                    {tones.map(tone => <option key={tone} value={tone}>{tone}</option>)}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-base-content/40 font-bold">↓</div>
                </div>
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-3">
                <label className="text-sm font-black uppercase tracking-widest text-base-content ml-2 flex items-center gap-2">
                   <ImageIcon className="w-4 h-4 text-indigo-600" /> Featured Image URL (High Definition)
                </label>
                <input
                    type="url"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                    className="w-full px-6 py-5 rounded-2xl bg-base-200 border-2 border-base-300 focus:border-indigo-600 font-bold text-base-content shadow-sm placeholder:text-base-content/40"
                    placeholder="Paste image link here..."
                />
            </div>

            {/* Visibility & Access Control */}
            <div className="p-8 rounded-3xl bg-slate-900 border-4 border-indigo-500 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-indigo-300">Privacy Setting</label>
                  <div className="flex bg-slate-800 p-1.5 rounded-2xl">
                    {['Public', 'Private'].map(v => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setVisibility(v)}
                        className={`flex-1 py-4 rounded-xl text-sm font-black transition-all duration-300 ${visibility === v ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                      >
                        {v === 'Public' ? <div className="flex items-center justify-center gap-2"><Globe className="w-4 h-4" /> PUBLIC</div> : <div className="flex items-center justify-center gap-2"><Lock className="w-4 h-4" /> PRIVATE</div>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-indigo-300">Monetization</label>
                  <select
                    value={accessLevel}
                    onChange={(e) => setAccessLevel(e.target.value)}
                    disabled={!userData?.isPremium}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-800 border-2 border-slate-700 text-white font-black uppercase tracking-widest focus:border-indigo-500 disabled:opacity-25 outline-none cursor-pointer"
                  >
                    <option value="Free">🔓 Free Access</option>
                    <option value="Premium">💎 Premium Only</option>
                  </select>
                </div>
              </div>
              
              {!userData?.isPremium && (
                <div className="mt-6 flex items-center gap-4 p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 text-xs font-bold">
                   <AlertTriangle className="w-6 h-6 animate-pulse" />
                   Premium mode is locked. Upgrade your account to enable monetization.
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-7 bg-indigo-600 hover:bg-slate-900 text-white rounded-3xl font-black text-xl uppercase tracking-widest shadow-2xl shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-4 group disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : (
                <>
                  Publish Insight <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Live High-HD Preview */}
        <div className="lg:col-span-4 order-1 lg:order-2" data-aos="fade-left">
            <div className="sticky top-10 space-y-6">
                <div className="bg-base-100 border-2 border-base-300 p-3 rounded-[2.5rem] shadow-[15px_15px_0px_0px_rgba(79,70,229,1)] overflow-hidden">
                    <div className="relative h-72 rounded-[2rem] overflow-hidden bg-base-200 border border-base-300">
                        {imageURL ? (
                             <img src={imageURL} className="w-full h-full object-cover" alt="Preview" />
                        ) : (
                             <div className="w-full h-full flex flex-col items-center justify-center text-base-content/50 gap-2">
                                <ImageIcon className="w-10 h-10 opacity-20" />
                                <span className="text-xs font-black tracking-widest uppercase text-base-content/70">No Image URL Provided</span>
                             </div>
                        )}
                        <div className="absolute top-5 left-5">
                            <span className="px-5 py-2 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase shadow-xl">{category}</span>
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-black text-base-content mb-3 line-clamp-2 leading-tight uppercase tracking-tighter">{title || "Your Awesome Title"}</h3>
                        <p className="text-base-content/60 text-sm line-clamp-4 mb-8 font-bold leading-relaxed border-l-4 border-indigo-100 pl-4 italic">
                            {description || "Start writing to see how your insight will appear to your readers..."}
                        </p>
                        <div className="flex items-center justify-between pt-6 border-t-2 border-slate-50">
                            <span className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest"><Smile className="w-5 h-5" /> {emotionalTone}</span>
                            <span className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">{accessLevel}</span>
                        </div>
                    </div>
                </div>
                
                {/* Writing Checklist */}
                <div className="p-8 bg-indigo-50 border-2 border-indigo-200 rounded-[2.5rem]">
                    <h5 className="font-black text-indigo-900 text-md mb-4 flex items-center gap-2">
                        <PlusCircle className="w-5 h-5" /> Quick Checklist
                    </h5>
                    <ul className="text-sm text-indigo-800/80 space-y-3 font-bold">
                        <li className="flex gap-2">✅ <span className={title.length > 5 ? 'text-green-600' : ''}>Catchy Headline</span></li>
                        <li className="flex gap-2">✅ <span className={description.length > 20 ? 'text-green-600' : ''}>Emotional Depth</span></li>
                        <li className="flex gap-2">✅ <span>High Resolution Image</span></li>
                    </ul>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AddLesson;