import { createBrowserRouter } from "react-router-dom";

// Layouts
import RootLayout from "../layout/Rootlayout";
import DashboardLayout from "../dashboard/DashboardLayout";

// Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Profile from "../components/UpdateProfile/profile";
import Publiclessons from "../pages/Public/Publiclessons";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "profile", element: <Profile /> },
      { path: "public-lessons", element: <Publiclessons /> },
    ],
  },

  // Dashboard Routes
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <div>Dashboard Overview</div> },
      { path: "profile", element: <div>User Profile</div> },
      { path: "settings", element: <div>Settings</div> },
      { path: "messages", element: <div>Messages</div> },
    ],
  },
]);
