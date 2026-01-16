// src/dashboard/admin/ReportedLessons.jsx
import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import {
  AlertTriangle,
  Trash2,
  Ban,
  BookOpen,
  Flag,
  User,
  MessageSquareWarning,
  CheckCircle,
} from "lucide-react";

const ReportedLessons = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get("/admin/reported-lessons");
        setReports(res.data);
      } catch (error) {
        toast.error("Failed to load reported lessons");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm("Are you sure you want to delete this lesson? This cannot be undone.")) {
      return;
    }

    try {
      await api.delete(`/lessons/delete/${lessonId}`);
      toast.success("Lesson deleted successfully");
      // Remove from list
      setReports(reports.filter(r => r.lesson?._id !== lessonId));
    } catch (error) {
      toast.error("Failed to delete lesson");
      console.error(error);
    }
  };

  const handleIgnoreReports = async (reportId) => {
    if (!window.confirm("Are you sure you want to ignore these reports?")) {
      return;
    }

    try {
      await api.delete(`/admin/reported-lessons/${reportId}/ignore`);
      toast.success("Reports ignored successfully");
      // Remove from list
      setReports(reports.filter(r => r._id !== reportId));
    } catch (error) {
      toast.error("Failed to ignore reports");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-600 animate-pulse mx-auto mb-4" />
          <p className="text-2xl font-bold text-red-700">Loading Reported Lessons...</p>
        </div>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-10">
        <h1 className="text-4xl font-bold text-indigo-800 mb-8 flex items-center gap-3">
          <Flag className="w-10 h-10 text-indigo-600" />
          Reported Lessons
        </h1>
        <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center shadow-lg">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <p className="text-2xl font-bold text-green-700 mb-3">
            No reported lessons yet
          </p>
          <p className="text-lg text-gray-600">
            The platform is currently clean. No issues reported.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10">
      <h1 className="text-4xl font-bold text-red-700 mb-10 flex items-center gap-3">
        <AlertTriangle className="w-10 h-10 text-red-600" />
        Reported Lessons ({reports.length})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {reports.map((report) => (
          <div
            key={report._id}
            className="bg-white border-2 border-red-200 rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-red-400"
          >
            {/* Lesson Title */}
            <h3 className="text-2xl font-bold text-red-800 mb-4 flex items-start gap-3">
              <BookOpen className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              <span className="line-clamp-2">
                {report.lesson?.title || "Deleted Lesson"}
              </span>
            </h3>

            {/* Report Count */}
            <div className="flex items-center gap-2 mb-5">
              <Flag className="w-5 h-5 text-red-600" />
              <p className="text-lg font-semibold text-red-700">
                Reported {report.reportCount} time{report.reportCount > 1 ? "s" : ""}
              </p>
            </div>

            {/* Reasons List */}
            <div className="bg-red-50 rounded-xl p-5 mb-6 border border-red-100">
              <p className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                <MessageSquareWarning className="w-5 h-5" />
                Reported Reasons:
              </p>
              <ul className="space-y-2 text-gray-800">
                {report.reasons.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-red-600 font-bold mt-0.5">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Creator Info (if available) */}
            {report.lesson?.creatorName && (
              <div className="flex items-center gap-3 mb-6 text-sm text-gray-700">
                <User className="w-5 h-5 text-indigo-600" />
                <span>Created by: <strong>{report.lesson.creatorName}</strong></span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleDeleteLesson(report.lesson?._id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Trash2 className="w-5 h-5" />
                Delete Lesson
              </button>

              <button
                onClick={() => handleIgnoreReports(report._id)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <CheckCircle className="w-5 h-5" />
                Ignore Reports
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportedLessons;