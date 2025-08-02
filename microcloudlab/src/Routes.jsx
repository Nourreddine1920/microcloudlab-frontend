import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// import Breadcrumb from "components/ui/Breadcrumb";
// Add your imports here
import Homepage from "pages/homepage";
import SolutionsHub from "pages/solutions-hub";
import AboutVision from "pages/about-vision";
import ResourcesSupport from "pages/resources-support";
import ContactPartnership from "pages/contact-partnership";
import PlatformDemo from "pages/platform-demo";
import NotFound from "pages/NotFound";
import ApiTest from "components/ApiTest";

// IDE imports
import IDEHome from "pages/ide";
import ConfigurationValidationConflicts from "pages/ide/configuration-validation-conflicts";
import ConfigurationImportExportManager from "pages/ide/configuration-import-export-manager";
import PeripheralConfigurationEditor from "pages/ide/peripheral-configuration-editor";
import PinAssignmentVisualizer from "pages/ide/pin-assignment-visualizer";
import PeripheralConfigurationDashboard from "pages/ide/peripheral-configuration-dashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      {/* <Breadcrumb /> */}
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/solutions-hub" element={<SolutionsHub />} />
        <Route path="/about-vision" element={<AboutVision />} />
        <Route path="/resources-support" element={<ResourcesSupport />} />
        <Route path="/contact-partnership" element={<ContactPartnership />} />
        <Route path="/platform-demo" element={<PlatformDemo />} />
        <Route path="/api-test" element={<ApiTest />} />
        
        {/* IDE Routes */}
        <Route path="/ide" element={<IDEHome />} />
        <Route path="/ide/configuration-validation-conflicts" element={<ConfigurationValidationConflicts />} />
        <Route path="/ide/configuration-import-export-manager" element={<ConfigurationImportExportManager />} />
        <Route path="/ide/peripheral-configuration-editor" element={<PeripheralConfigurationEditor />} />
        <Route path="/ide/pin-assignment-visualizer" element={<PinAssignmentVisualizer />} />
        <Route path="/ide/peripheral-configuration-dashboard" element={<PeripheralConfigurationDashboard />} />
        
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;