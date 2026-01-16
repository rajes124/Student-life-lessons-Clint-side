// src/routes/router.jsx
import { createBrowserRouter } from "react-router-dom";

// Layouts
import RootLayout from "../layout/RootLayout";
import DashboardLayout from "../layout/DashboardLayout";
import AdminLayout from "../layout/AdminLayout";


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

import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

// User Dashboard Pages
import DashboardHome from "../dashboard/user/DashboardHome";
import AddLesson from "../dashboard/user/AddLesson";
import MyLessons from "../dashboard/user/MyLessons";
import MyFavorites from "../dashboard/user/MyFavorites";
import MyProfile from "../dashboard/user/MyProfile"; 

// Admin Dashboard Pages
import AdminHome from "../dashboard/admin/AdminHome";
import ManageLessons from "../dashboard/admin/ManageLessons";
import ManageUsers from "../dashboard/admin/ManageUsers";
import ReportedLessons from "../dashboard/admin/ReportedLessons";
import AdminProfile from "../dashboard/admin/AdminProfile";

// Auth Loaders (যদি থাকে)
import { requireAuth } from "../utils/requireAuth";

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
      { path: "*", element: <NotFound /> }, // 404 inside RootLayout
    ],
  },

  // User Dashboard (Protected)
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "add-lesson", element: <AddLesson /> },
      { path: "my-lessons", element: <MyLessons /> },
      { path: "my-favorites", element: <MyFavorites /> },
      { path: "profile", element: <MyProfile /> }, 
    ],
  },

  // Admin Dashboard
  {
    path: "/dashboard/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminHome /> },
      { path: "manage-users", element: <ManageUsers /> },
      { path: "manage-lessons", element: <ManageLessons /> },
      { path: "reported-lessons", element: <ReportedLessons /> },
      { path: "profile", element: <AdminProfile /> },
    ],
  },
]);