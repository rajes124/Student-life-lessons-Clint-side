// src/components/TopContributors.jsx
import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { Trophy, Medal, Award } from "lucide-react";

const TopContributors = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTop = async () => {
      try {
        const res = await api.get("/lessons/top-contributors");
        setContributors(res.data);
      } catch (error) {
        toast.error("Failed to load top contributors");

        // Fallback data (kept your original)
        setContributors([
          {
            name: "Alex Johnson",
            lessonCount: 42,
            photoURL: "https://randomuser.me/api/portraits/men/32.jpg",
          },
          {
            name: "Sarah Ahmed",
            lessonCount: 38,
            photoURL: "https://randomuser.me/api/portraits/women/44.jpg",
          },
          {
            name: "Rahim Khan",
            lessonCount: 35,
            photoURL: "https://randomuser.me/api/portraits/men/45.jpg",
          },
          {
            name: "Priya Singh",
            lessonCount: 31,
            photoURL: "https://randomuser.me/api/portraits/women/68.jpg",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTop();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
        <p className="mt-4 text-lg text-gray-600">Loading top contributors...</p>
      </div>
    );
  }

  if (contributors.length === 0) {
    return (
      <p className="text-center py-16 text-lg text-gray-500">
        No contributors data available yet.
      </p>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 md:mb-16 text-gray-800">
        Top Contributors This Week
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-7xl mx-auto">
        {contributors.map((user, index) => (
          <div
            key={index}
            className="group text-center bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 p-6 md:p-8 flex flex-col items-center"
          >
            {/* Avatar with ring effect */}
            <div className="relative mb-6">
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-indigo-200 ring-offset-4 group-hover:ring-indigo-400 group-hover:ring-offset-8 transition-all duration-300">
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Rank icon on top-right */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-400 to-amber-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg border-2 border-white">
                {index === 0 ? (
                  <Trophy className="w-6 h-6" />
                ) : index === 1 ? (
                  <Medal className="w-6 h-6" />
                ) : (
                  <Award className="w-6 h-6" />
                )}
              </div>
            </div>

            {/* Name */}
            <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
              {user.name}
            </h4>

            {/* Lesson Count */}
            <p className="text-gray-600 text-base md:text-lg mb-4">
              {user.lessonCount} Lessons Shared
            </p>

            {/* Contributor Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm md:text-base font-medium shadow-sm">
              <Trophy className="w-4 h-4 text-amber-600" />
              Top Contributor
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopContributors;