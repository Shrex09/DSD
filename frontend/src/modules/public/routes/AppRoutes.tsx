import React from "react";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/modules/public/layouts";
import { Loader } from "@/modules/public/components/common";
import { ROUTES } from "@/constants";

// Lazily load all page components to enable code splitting per route
const Home = lazy(() => import("@/modules/public/pages/Home"));
const About = lazy(() => import("@/modules/public/pages/About"));
const Services = lazy(() => import("@/modules/public/pages/Services"));
const Team = lazy(() => import("@/modules/public/pages/Team"));
const Contact = lazy(() => import("@/modules/public/pages/Contact"));
const NotFound = lazy(() => import("@/modules/public/pages/NotFound"));
const Forbidden = lazy(() => import("@/modules/public/pages/errors/Forbidden"));
const ServerError = lazy(() => import("@/modules/public/pages/errors/ServerError"));
const Maintenance = lazy(() => import("@/modules/public/pages/errors/Maintenance"));

/**
 * Application route configuration.
 * All pages are lazy-loaded for optimal initial bundle size.
 */
const AppRoutes = (): React.JSX.Element => {
  return (
    <Suspense fallback={<Loader fullScreen size="lg" />}>
      <Routes>
        {/* Public site — nested inside MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.SERVICES} element={<Services />} />
          <Route path={ROUTES.TEAM} element={<Team />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />

          {/* Error pages (accessible via direct navigation) */}
          <Route path={ROUTES.FORBIDDEN} element={<Forbidden />} />
          <Route path={ROUTES.SERVER_ERROR} element={<ServerError />} />
          <Route path={ROUTES.MAINTENANCE} element={<Maintenance />} />

          {/* 404 fallback — must remain last */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;