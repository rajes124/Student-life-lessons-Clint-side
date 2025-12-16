// src/pages/PublicLessons.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const PublicLessons = () => {
  const { currentUser, userData } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicLessons = async () => {
      try {
        let q = query(
          collection(db, "lessons"),
          where("visibility", "==", "Public")
        );

        if (!userData?.isPremium) {
          q = query(q, where("accessLevel", "==", "Free"));
        }

        const snapshot = await getDocs(q);
        const lessonsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Latest first
        lessonsList.sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate());

        setLessons(lessonsList);
      } catch (error) {
        toast.error("Failed to load lessons");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicLessons();
  }, [userData?.isPremium]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="w-20 h-20 border-8 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-3xl font-bold text-indigo-700">Loading Lessons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
          Public Life Lessons
        </h1>
        <p className="text-center text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
          Discover inspiring stories and wisdom shared by the community.
        </p>

        {userData?.isPremium && (
          <p className="text-center text-lg font-bold text-green-600 mb-10">
            ⭐ Premium Member: You can view all Public lessons (Free + Premium)
          </p>
        )}

        {lessons.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-3xl text-gray-600 mb-6">No public lessons yet.</p>
            <p className="text-xl text-gray-500">Be the first to share your story!</p>
            {currentUser && (
              <Link
                to="/dashboard/add-lesson"
                className="mt-8 inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition transform hover:scale-110"
              >
                Share Your Lesson
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {lessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                to={`/lessons/${lesson.id}`}
                className="group relative transform-gpu"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 group-hover:shadow-3xl group-hover:-translate-y-8 group-hover:rotate-3 group-hover:scale-105">
                  {/* 3D Tilt Effect Container */}
                  <div className="preserve-3d group-hover:rotate-x-12 group-hover:rotate-y-12 transition-transform duration-700">
                    {/* Image */}
                    {lesson.imageURL ? (
                      <img
                        src={lesson.imageURL}
                        alt={lesson.title}
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gradient-to-br from-indigo-200 to-purple-300 flex items-center justify-center">
                        <span className="text-8xl">📖</span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-indigo-700 mb-3 line-clamp-2 group-hover:text-purple-600 transition">
                        {lesson.title}
                      </h3>

                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {lesson.description}
                      </p>

                      <div className="flex flex-wrap gap-3 mb-6">
                        <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium shadow-md">
                          {lesson.category}
                        </span>
                        <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium shadow-md">
                          {lesson.emotionalTone}
                        </span>
                        {lesson.accessLevel === "Premium" && (
                          <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-indigo-900 px-4 py-2 rounded-full text-sm font-bold shadow-md">
                            Premium ⭐
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-500">
                        By <span className="font-bold text-indigo-600">{lesson.creatorName || "Anonymous"}</span>
                      </p>
                    </div>

                    {/* Glow Effect on Hover */}
                    <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-3xl blur-xl scale-110"></div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicLessons;