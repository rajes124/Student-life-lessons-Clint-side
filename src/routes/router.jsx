import { createBrowserRouter } from "react-router-dom";

// Layouts
import RootLayout from "../layout/Rootlayout";

// Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,   // SAME STRUCTURE রাখলাম
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);
