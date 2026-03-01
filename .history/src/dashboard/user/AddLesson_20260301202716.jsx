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
  Image as ImageIcon,
  Eye,
  Lock,
  PlusCircle,
  Loader2,
  AlertTriangle,
  Sparkles,
  ArrowRight
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
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">
      
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-50 text-indigo-600 mb-6 border border-indigo-100 animate-bounce">
          <Sparkles className="w-4 h-4 fill-current" />
          <span className="text-xs font-black uppercase tracking-widest">Creator Studio</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4">
          Share Your <span className="text-indigo-600 italic">Wisdom</span>
        </h2>
        <p className="text-slate-500 font-medium max-w-lg mx-auto">
          Turn your life experiences into valuable lessons for the world.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Form */}
        <div className="lg:col-span-8 order-2 lg:order-1">
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08)] border border-slate-50">
            
            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
                <BookOpen className="w-3 h-3 text-indigo-500" /> Lesson Title
              </label>
              <input
                type="text"
                value={title}
                onFocus={() => setIsFocused('title')}
                onBlur={() => setIsFocused(null)}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-8 py-5 rounded-[2rem] bg-slate-50 border-none focus:ring-4 transition-all font-bold text-slate-700 placeholder-slate-300 ${isFocused === 'title' ? 'ring-indigo-500/10 bg-white shadow-xl' : 'ring-transparent'}`}
                placeholder="e.g., How to handle failure gracefully"
              />
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
                <FileText className="w-3 h-3 text-indigo-500" /> The Story / Insights
              </label>
              <textarea
                value={description}
                rows="6"
                onFocus={() => setIsFocused('desc')}
                onBlur={() => setIsFocused(null)}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full px-8 py-6 rounded-[2.5rem] bg-slate-50 border-none focus:ring-4 transition-all font-medium text-slate-700 placeholder-slate-300 leading-relaxed ${isFocused === 'desc' ? 'ring-indigo-500/10 bg-white shadow-xl' : 'ring-transparent'}`}
                placeholder="Deep dive into your experience..."
              />
            </div>

            {/* Horizontal Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
                   <Tag className="w-3 h-3" /> Category
                </label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 border-none focus:ring-4 focus:ring-indigo-500/10 font-bold text-slate-600 appearance-none shadow-sm"
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
                   <Smile className="w-3 h-3" /> Emotional Tone
                </label>
                <select 
                  value={emotionalTone} 
                  onChange={(e) => setEmotionalTone(e.target.value)}
                  className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 border-none focus:ring-4 focus:ring-indigo-500/10 font-bold text-slate-600 appearance-none shadow-sm"
                >
                  {tones.map(tone => <option key={tone} value={tone}>{tone}</option>)}
                </select>
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
                   <ImageIcon className="w-3 h-3" /> Cover Image URL
                </label>
                <input
                    type="url"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                    className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 border-none focus:ring-4 focus:ring-indigo-500/10 font-bold text-slate-600 shadow-sm"
                    placeholder="https://images.unsplash.com/photo-..."
                />
            </div>

            {/* Visibility & Access */}
            <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white space-y-6 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 ml-2">Visibility</label>
                  <div className="flex gap-2">
                    {['Public', 'Private'].map(v => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setVisibility(v)}
                        className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${visibility === v ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40' : 'bg-slate-800 text-slate-400'}`}
                      >
                        {v === 'Public' ? <div className="flex items-center justify-center gap-2"><Globe className="w-3 h-3" /> Public</div> : <div className="flex items-center justify-center gap-2"><Lock className="w-3 h-3" /> Private</div>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 ml-2">Access Control</label>
                  <select
                    value={accessLevel}
                    onChange={(e) => setAccessLevel(e.target.value)}
                    disabled={!userData?.isPremium}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border-none text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-indigo-500 disabled:opacity-30"
                  >
                    <option value="Free">Free Access</option>
                    <option value="Premium">✨ Premium Member Only</option>
                  </select>
                </div>
              </div>
              
              {!userData?.isPremium && (
                <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-500 text-xs font-bold leading-relaxed">
                   <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                   Upgrade to Premium to unlock exclusive content options.
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-indigo-600 hover:bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-2xl shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-4 group disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                <>
                  Publish Lesson <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Preview Card */}
        <div className="lg:col-span-4 order-1 lg:order-2">
            <div className="sticky top-10 space-y-6">
                <div className="bg-white border border-slate-100 p-2 rounded-[2.5rem] shadow-xl overflow-hidden group">
                    <div className="relative h-64 rounded-[2rem] overflow-hidden bg-slate-100">
                        {imageURL ? (
                             <img src={imageURL} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Preview" />
                        ) : (
                             <div className="w-full h-full flex items-center justify-center text-slate-300 italic text-sm">Preview Image Here</div>
                        )}
                        <div className="absolute top-4 left-4 flex gap-2">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-black uppercase">{category}</span>
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-black text-slate-800 mb-2 line-clamp-2">{title || "Your Incredible Title"}</h3>
                        <p className="text-slate-400 text-sm line-clamp-3 mb-6 font-medium italic">
                            {description || "The story you share will appear here. Captivate your readers with your unique perspective..."}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                            <span className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase"><Smile className="w-4 h-4" /> {emotionalTone}</span>
                            <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase">{accessLevel}</span>
                        </div>
                    </div>
                </div>
                
                {/* Info Tip */}
                <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl">
                    <h5 className="font-black text-indigo-900 text-sm mb-2 flex items-center gap-2">
                        <PlusCircle className="w-4 h-4" /> Writing Tips
                    </h5>
                    <ul className="text-xs text-indigo-600/70 space-y-2 font-bold leading-relaxed">
                        <li>• Keep your title punchy and emotional.</li>
                        <li>• Share real mistakes to build trust.</li>
                        <li>• Use a high-quality cover image URL.</li>
                    </ul>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

// Simple Globe Icon for consistency
const Globe = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);

export default AddLesson;