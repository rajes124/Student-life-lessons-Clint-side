import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import ReactPaginate from "react-paginate";
import useAuth from "../../hooks/useAuth";
import debounce from "lodash/debounce";

const PublicLessons = () => {
  const { user, isPremium, loading: authLoading } = useAuth();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  // Debounced search
  const debouncedSetSearch = useCallback(
    debounce((value) => {
      setFilters((prev) => ({ ...prev, search: value }));
      setCurrentPage(1);
    }, 400),
    []
  );

  // Reset page when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.search, filters.category, filters.tone, filters.sort]);

  // Fetch lessons
  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      setError(null);
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

        setLessons(res.data?.lessons || []);
        setTotalPages(res.data?.totalPages || 1);
      } catch (err) {
        console.error("Error fetching lessons:", err);
        setError("Failed to load lessons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [filters, currentPage]);

  if (authLoading) {
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
              className="input input-bordered input-primary w-full"
              onChange={(e) => debouncedSetSearch(e.target.value)}
            />

            <select
              className="select select-bordered select-primary w-full"
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
              className="select select-bordered select-primary w-full"
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
              className="select select-bordered select-primary w-full"
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            >
              <option value="newest">Newest First</option>
              <option value="mostSaved">Most Saved</option>
            </select>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="card bg-white shadow-xl rounded-2xl animate-pulse">
                <div className="h-56 bg-gray-300 rounded-t-2xl"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-11/12"></div>
                  <div className="h-4 bg-gray-300 rounded w-9/12"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-2xl text-red-600 mb-6">{error}</p>
            <button onClick={() => window.location.reload()} className="btn btn-primary">
              Try Again
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && lessons.length === 0 && (
          <div className="text-center py-20">
            <p className="text-3xl text-gray-500">No public lessons found</p>
          </div>
        )}

        {/* Lessons Grid */}
        {!loading && lessons.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {lessons.map((lesson) => {
                const locked = lesson.accessLevel === "Premium" && !isPremium;

                return (
                  <div
                    key={lesson._id}
                    className={`relative group card bg-white shadow-xl rounded-2xl overflow-hidden transition-all hover:scale-105 ${locked ? "opacity-90" : ""}`}
                  >
                    {locked && (
                      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-white">
                        <Lock className="w-20 h-20 mb-4" />
                        <p className="text-2xl font-bold">Premium Only</p>
                        <Link to="/pricing" className="mt-4 btn btn-warning btn-lg">
                          Upgrade Now
                        </Link>
                      </div>
                    )}

                    <div className={locked ? "blur-sm" : ""}>
                      {lesson.image ? (
                        <img src={lesson.image} alt={lesson.title} className="w-full h-56 object-cover" />
                      ) : (
                        <div className="bg-gray-200 border-2 border-dashed rounded-t-2xl w-full h-56" />
                      )}

                      <div className="p-6">
                        <h3 className="text-xl font-bold line-clamp-2 mb-3">{lesson.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                          {(lesson.description || "").substring(0, 130)}...
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="badge badge-outline badge-sm">{lesson.category}</span>
                          <span className="badge badge-ghost badge-sm">{lesson.emotionalTone}</span>
                          {lesson.accessLevel === "Premium" && (
                            <span className="badge badge-warning badge-sm">Premium</span>
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
                              <p className="font-medium text-sm">{lesson.creator?.name || "Unknown"}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(lesson.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          <Link
                            to={`/lesson/${lesson._id}`}
                            className={`btn btn-primary btn-sm ${locked ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={(e) => locked && e.preventDefault()}
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

            {/* Pagination */}
            {totalPages > 1 && (
              <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                pageCount={totalPages}
                onPageChange={({ selected }) => setCurrentPage(selected + 1)}
                forcePage={currentPage - 1}
                containerClassName="flex justify-center gap-2 mt-16 flex-wrap"
                pageClassName="btn btn-ghost"
                activeClassName="btn-primary"
                previousClassName="btn btn-outline"
                nextClassName="btn btn-outline"
                disabledClassName="btn-disabled"
                breakLabel="..."
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PublicLessons;