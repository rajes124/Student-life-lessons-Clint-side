// src/pages/LessonDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";

const LessonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPremiumUser, setIsPremiumUser] = useState(true); // Auth অনুযায়ী
  const [animate, setAnimate] = useState(false); // Animation trigger

  const defaultImage =
    "https://thumbs.dreamstime.com/b/stack-books-cozy-chair-sunlit-window-self-improvement-391352127.jpg";

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await api.get(`/lessons/${id}`);
        setLesson(res.data);

        if (res.data.accessLevel === "premium" && !isPremiumUser) {
          toast.error("Upgrade to Premium to view this lesson");
          navigate("/pricing");
        } else {
          // Animation trigger after data loaded
          setAnimate(true);
        }
      } catch (error) {
        toast.error("Lesson not found");
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [id, navigate, isPremiumUser]);

  if (loading) return <p className="text-center py-20">Loading lesson...</p>;
  if (!lesson) return null;

  return (
   <section className="py-16 px-4 max-w-4xl mx-auto">
  <div className="relative w-full h-72 mb-6 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
    <img
      src={lesson.image || defaultImage}
      alt={lesson.title}
      className="w-full h-full object-cover"
    />
    {lesson.accessLevel === "premium" && !isPremiumUser && (
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-center p-4">
        <Lock className="w-12 h-12 mb-2" />
        <p className="font-bold text-lg">Premium Lesson</p>
        <p className="text-sm opacity-90">Upgrade to view</p>
      </div>
    )}
  </div>

  <h1 className="text-3xl font-bold mb-4 animate-slideUp">
    {lesson.title}
  </h1>

  <div className="flex flex-wrap gap-2 mb-6">
    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
      {lesson.category}
    </span>
    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
      {lesson.emotionalTone}
    </span>
    {lesson.accessLevel === "premium" && (
      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm flex items-center gap-1">
        ⭐ Premium
      </span>
    )}
  </div>

  <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line animate-slideUp">
    {lesson.description}
  </p>

  {lesson.creatorName && (
    <p className="text-gray-500 mt-6 text-sm animate-slideUp">
      By {lesson.creatorName}
    </p>
  )}
</section>

  );
};

export default LessonDetails;
