// src/routes/router.jsx

import { createBrowserRouter } from "react-router-dom";

// Layouts
import RootLayout from "../layout/RootLayout";
import DashboardLayout from "../layout/DashboardLayout";

// Public Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PublicLessons from "../pages/PublicLessons";
import LessonDetails from "../pages/Lessons/LessonDetails";
import Pricing from "../pages/Pricing/Pricing";
import PaymentSuccess from "../pages/Pricing/PaymentSuccess";
import PaymentCancel from "../pages/Pricing/PaymentCancel";
import NotFound from "../pages/NotFound";

// User Dashboard Pages
import DashboardHome from "../dashboard/user/DashboardHome";
import AddLesson from "../dashboard/user/AddLesson";
import MyLessons from "../dashboard/user/MyLessons";
import MyFavorites from "../dashboard/user/MyFavorites";
import MyProfile from "../dashboard/user/MyProfile";

// Admin Dashboard Pages
import AdminHome from "../dashboard/admin/AdminHome";
import AdminPanel from "../dashboard/admin/AdminPanel"; // নতুন import
import ManageLessons from "../dashboard/admin/ManageLessons";
import ManageUsers from "../dashboard/admin/ManageUsers";
import ReportedLessons from "../dashboard/admin/ReportedLessons";

// Auth Loaders
import { requireAuth } from "../utils/requireAuth";
import { requireAdminAuth } from "../utils/requireAdminAuth";

export const router = createBrowserRouter([
  // Public Routes (with RootLayout - Navbar + Footer)
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

  // User Dashboard (Protected)
   // User Dashboard (Protected)
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    loader: requireAuth,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "add-lesson", element: <AddLesson /> },
      { path: "my-lessons", element: <MyLessons /> },
      { path: "my-favorites", element: <MyFavorites /> },
      { path: "profile", element: <MyProfile /> } // এটা যোগ করো
    ],
  },

  // Admin Dashboard (Protected + Admin Role)
  {
    path: "/dashboard/admin",
    element: <DashboardLayout />,
    loader: requireAdminAuth,
    children: [
      { index: true, element: <AdminHome /> }, // admin home overview
      { path: "panel", element: <AdminPanel /> }, // নতুন route – full admin panel
      { path: "manage-lessons", element: <ManageLessons /> },
      { path: "manage-users", element: <ManageUsers /> },
      { path: "reported-lessons", element: <ReportedLessons /> },
    ],
  },

  // 404 Page
  { path: "*", element: <NotFound /> },
]);