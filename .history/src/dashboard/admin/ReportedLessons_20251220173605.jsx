// src/dashboard/admin/ReportedLessons.jsx
import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";

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
      toast.success("Reports ignored");
      // Remove from list
      setReports(reports.filter(r => r._id !== reportId));
    } catch (error) {
      toast.error("Failed to ignore reports");
      console.error(error);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-3xl">Loading Reported Lessons...</div>;
  }

  if (reports.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-10">
        <h1 className="text-4xl font-bold text-indigo-800 mb-8">Reported Lessons</h1>
        <p className="text-xl text-gray-600">No reported lessons yet. Platform is clean! ✅</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-10">
      <h1 className="text-4xl font-bold text-red-600 mb-8">Reported Lessons ({reports.length})</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reports.map((report) => (
          <div key={report._id} className="bg-red-50 border-2 border-red-300 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-red-700 mb-4">
              {report.lesson?.title || "Deleted Lesson"}
            </h3>
            <p className="text-gray-700 mb-4">Report Count: <span className="font-bold">{report.reportCount}</span></p>
            <div className="bg-white rounded-lg p-4">
              <p className="font-medium mb-2">Reasons:</p>
              <ul className="list-disc list-inside space-y-1">
                {report.reasons.map((reason, i) => (
                  <li key={i} className="text-gray-700">{reason}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex gap-4">
              <button 
                onClick={() => handleDeleteLesson(report.lesson?._id)}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-bold transition"
              >
                Delete Lesson
              </button>
              <button 
                onClick={() => handleIgnoreReports(report._id)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-bold transition"
              >
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