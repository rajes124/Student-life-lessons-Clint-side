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
  { path: "*", element: <NotFound /> },
]);
