// src/layout/RootLayout.jsx

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";   // তোমার Navbar পাথ ঠিক করো
import Footer from "../components/Footer";     // তোমার Footer পাথ ঠিক করো

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar সব পেজে দেখাবে (404 ছাড়া) */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 pt-16">  {/* pt-16 দিয়ে Navbar-এর জন্য space */}
        <Outlet />
      </main>

      {/* Footer সব পেজে দেখাবে */}
      <Footer />
    </div>
  );
};

export default RootLayout;