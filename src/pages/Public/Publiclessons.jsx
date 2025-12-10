// src/pages/Public/Publiclessons.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Publiclessons = () => {
  const { user, isPremium, loading: authLoading } = useAuth();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    tone: "all",
    sort: "newest",
  });

  const categories = ["all", "Personal Growth", "Career", "Relationships", "Mindset", "Mistakes Learned"];
  const tones = ["all", "Motivational", "Sad", "Realization", "Gratitude", "Reflective"];

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/lessons/public`, {
          params: {
            search: filters.search || undefined,
            category: filters.category === "all" ? undefined : filters.category,
            tone: filters.tone === "all" ? undefined : filters.tone,
            sort: filters.sort,
            page: currentPage,
            limit: 12,
          },
        });

        setLessons(res.data.lessons);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching lessons:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [filters, currentPage]);

  // Search on Enter
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") setCurrentPage(1);
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-12 text-indigo-800">
          Public Life Lessons
        </h1>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search by title or description..."
              className="input input-bordered input-primary"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              onKeyDown={handleSearchKeyDown}
            />

            <select
              className="select select-bordered select-primary"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered select-primary"
              value={filters.tone}
              onChange={(e) => setFilters({ ...filters, tone: e.target.value })}
            >
              {tones.map((tone) => (
                <option key={tone} value={tone}>
                  {tone === "all" ? "All Tones" : tone}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered select-primary"
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            >
              <option value="newest">Newest First</option>
              <option value="mostSaved">Most Saved</option>
            </select>
          </div>
        </div>

        {/* Lessons Grid */}
        {lessons.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-3xl text-gray-500">No public lessons found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {lessons.map((lesson) => {
              const locked = lesson.accessLevel === "Premium" && !isPremium;

              return (
                <div
                  key={lesson._id}
                  className={`relative group card bg-white shadow-xl rounded-2xl overflow-hidden transition-all hover:scale-105 ${
                    locked ? "opacity-90" : ""
                  }`}
                >
                  {/* Premium Lock Overlay */}
                  {locked && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-white">
                      <Lock className="w-20 h-20 mb-4" />
                      <p className="text-2xl font-bold">Premium Only</p>
                      <Link
                        to="/pricing"
                        className="mt-4 btn btn-warning btn-lg"
                      >
                        Upgrade Now
                      </Link>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className={locked ? "blur-sm" : ""}>
                    {lesson.image ? (
                      <img
                        src={lesson.image}
                        alt={lesson.title}
                        className="w-full h-56 object-cover"
                      />
                    ) : (
                      <div className="bg-gray-200 border-2 border-dashed rounded-t-2xl w-full h-56" />
                    )}

                    <div className="p-6">
                      <h3 className="text-xl font-bold line-clamp-2 mb-3">
                        {lesson.title}
                      </h3>

                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {lesson.description.substring(0, 130)}...
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="badge badge-outline badge-sm">
                          {lesson.category}
                        </span>
                        <span className="badge badge-ghost badge-sm">
                          {lesson.emotionalTone}
                        </span>
                        {lesson.accessLevel === "Premium" && (
                          <span className="badge badge-warning badge-sm">
                            Premium
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={lesson.creator?.photoURL || "/default-avatar.png"}
                            alt={lesson.creator?.name}
                            className="w-10 h-10 rounded-full ring-2 ring-indigo-300"
                          />
                          <div>
                            <p className="font-medium text-sm">
                              {lesson.creator?.name || "Unknown"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(lesson.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <Link
                          to={`/lesson/${lesson._id}`}
                          className="btn btn-primary btn-sm"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-16">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="btn btn-outline"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`btn ${currentPage === i + 1 ? "btn-primary" : "btn-ghost"}`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="btn btn-outline"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Publiclessons;