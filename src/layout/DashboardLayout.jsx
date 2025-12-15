// src/layout/DashboardLayout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";   // তোমার Navbar পাথ
import Footer from "../components/Footer";   // তোমার Footer পাথ

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50">
      {/* Navbar – dashboard-এও দেখাবে */}
      <Navbar />

      {/* Main Dashboard Content */}
      <main className="flex-1 pt-20 pb-12 px-4">  {/* pt-20 Navbar-এর জন্য space */}
        <div className="max-w-7xl mx-auto">
          <Outlet />  {/* এখানে DashboardHome, AddLesson, MyLessons ইত্যাদি লোড হবে */}
        </div>
      </main>

      {/* Footer – dashboard-এও দেখাবে */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;