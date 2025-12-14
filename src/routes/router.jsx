// src/routes/router.jsx

import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";

import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PublicLessons from "../pages/PublicLessons";
import LessonDetails from "../pages/Lessons/LessonDetails";
import Pricing from "../pages/Pricing/Pricing";
import PaymentSuccess from "../pages/Pricing/PaymentSuccess";
import PaymentCancel from "../pages/Pricing/PaymentCancel";
import NotFound from "../pages/NotFound";

// Dashboard Layout
import DashboardLayout from "../layout/DashboardLayout";

// User Dashboard Pages
import DashboardHome from "../dashboard/user/DashboardHome"; // তোমার ফাইলের নাম অনুযায়ী (যদি UserHome হয় তাহলে চেঞ্জ করো)
import AddLesson from "../dashboard/user/AddLesson";
import MyLessons from "../dashboard/user/MyLessons";
import MyFavorites from "../dashboard/user/MyFavorites";
import Profile from "../dashboard/user/MyProfile"; // বা যদি MyProfile.jsx হয়

// Admin Dashboard Pages
import AdminHome from "../dashboard/admin/AdminHome";
import ManageLessons from "../dashboard/admin/ManageLessons";
import ManageUsers from "../dashboard/admin/ManageUsers";
import ReportedLessons from "../dashboard/admin/ReportedLessons";

// Auth Loaders
import { requireAuth } from "../utils/requireAuth"; // তোমার utils ফোল্ডারে থাকলে
import { requireAdminAuth } from "../utils/requireAdminAuth"; // অ্যাডমিন চেকের জন্য

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "public-lessons", element: <PublicLessons /> },
      { path: "lessons/:id", element: <LessonDetails /> },
      { path: "pricing", element: <Pricing /> },
      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "payment-cancel", element: <PaymentCancel /> },
    ],
  },

  // ==================== User Dashboard (Protected) ====================
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    loader: requireAuth, // লগইন না থাকলে লগইন পেজে পাঠাবে
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "add-lesson", element: <AddLesson /> },
      { path: "my-lessons", element: <MyLessons /> },
      { path: "my-favorites", element: <MyFavorites /> },
      { path: "profile", element: <Profile /> },
    ],
  },

  // ==================== Admin Dashboard (Protected + Admin Role) ====================
  {
    path: "/dashboard/admin",
    element: <DashboardLayout />, // চাইলে আলাদা AdminLayout বানাতে পারো
    loader: requireAdminAuth, // শুধু admin হলে ঢুকতে দিবে
    children: [
      { index: true, element: <AdminHome /> },
      { path: "manage-lessons", element: <ManageLessons /> },
      { path: "manage-users", element: <ManageUsers /> },
      { path: "reported-lessons", element: <ReportedLessons /> },
    ],
  },

  // 404 Page
  { path: "*", element: <NotFound /> },
]);