// src/layout/RootLayout.jsx

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";   
import Footer from "../components/Footer";     
const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
     
      <Navbar />

      {/* Main content */}
      <main className="flex-1 pt-16">  
        <Outlet />
      </main>

      {/* Footer  */}
      <Footer />
    </div>
  );
};

export default RootLayout;