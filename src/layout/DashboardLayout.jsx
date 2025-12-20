import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DashboardLayout = () => {
  const { currentUser, loading } = useAuth();

  // 🔄 Auth loading
  if (loading) {
    return (
      <div className="text-center py-20 text-3xl font-bold">
        Loading...
      </div>
    );
  }

  // ❌ User logged in না থাকলে login এ পাঠাবে
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Dashboard Content */}
      <main className="flex-1 pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Outlet />
          {/* এখানে DashboardHome, AddLesson, MyLessons ইত্যাদি লোড হবে */}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
