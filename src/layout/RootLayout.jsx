// src/layout/RootLayout.jsx (আপডেটেড ভার্সন)
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboard && <Navbar />}
      <main className={`flex-1 ${!isDashboard ? "pt-16" : ""}`}>
        <Outlet />
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
};

export default RootLayout;