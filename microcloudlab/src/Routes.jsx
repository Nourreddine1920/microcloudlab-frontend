import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Homepage from "pages/homepage";
import SolutionsHub from "pages/solutions-hub";
import AboutVision from "pages/about-vision";
import ResourcesSupport from "pages/resources-support";
import ContactPartnership from "pages/contact-partnership";
import PlatformDemo from "pages/platform-demo";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/solutions-hub" element={<SolutionsHub />} />
        <Route path="/about-vision" element={<AboutVision />} />
        <Route path="/resources-support" element={<ResourcesSupport />} />
        <Route path="/contact-partnership" element={<ContactPartnership />} />
        <Route path="/platform-demo" element={<PlatformDemo />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;