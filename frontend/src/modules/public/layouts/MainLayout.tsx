import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/modules/public/components/common";
import { Footer } from "@/modules/public/components/common";
import { ScrollToTop } from "@/modules/public/components/common";

/**
 * Main layout wrapper for all public website pages.
 * Handles scroll restoration and renders the fixed Navbar, page outlet, and Footer.
 */
const MainLayout = (): React.JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg-light">
      {/* Scroll restoration on route transitions */}
      <ScrollToTop />

      {/* Global header */}
      <Navbar />

      {/* Page body content — top padding prevents header overlap */}
      <main className="flex-grow pt-[72px] lg:pt-[80px]" id="main-content">
        <Outlet />
      </main>

      {/* Global footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
