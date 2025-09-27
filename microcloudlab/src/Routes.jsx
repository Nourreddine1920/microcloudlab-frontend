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
import ProtectedRoute from "components/ProtectedRoute";
import LoginPage from "pages/auth/Login";
import RegisterPage from "pages/auth/Register";
import PricingPage from "pages/pricing";
import TestPage from "pages/TestPage";

// IDE imports
import { McuProvider } from "pages/ide/context/McuContext";
import IDEHome from "pages/ide";
import IntegratedIDE from "pages/ide/components/IntegratedIDE";
import ConfigurationValidationConflicts from "pages/ide/configuration-validation-conflicts";
import ConfigurationImportExportManager from "pages/ide/configuration-import-export-manager";
import PeripheralConfigurationEditor from "pages/ide/peripheral-configuration-editor";
import PinAssignmentVisualizer from "pages/ide/pin-assignment-visualizer";
import PeripheralConfigurationDashboard from "pages/ide/peripheral-configuration-dashboard";
import PeripheralCommunicationDashboard from "pages/ide/peripheral-communication-dashboard";

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
          <Route path="/test" element={<TestPage />} />
          
          {/* Auth & Pricing */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/pricing" element={<PricingPage />} />

          {/* IDE Routes - Auth protected and wrapped with MCU Context */}
          <Route
            path="/ide"
            element={
              <ProtectedRoute requireAuth>
                <McuProvider>
                  <IDEHome />
                </McuProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ide/integrated"
            element={
              <ProtectedRoute requireAuth>
                <McuProvider>
                  <IntegratedIDE />
                </McuProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ide/configuration-validation-conflicts"
            element={
              <ProtectedRoute requireAuth>
                <McuProvider>
                  <ConfigurationValidationConflicts />
                </McuProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ide/configuration-import-export-manager"
            element={
              <ProtectedRoute requireAuth>
                <McuProvider>
                  <ConfigurationImportExportManager />
                </McuProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ide/peripheral-configuration-editor"
            element={
              <ProtectedRoute requireAuth>
                <McuProvider>
                  <PeripheralConfigurationEditor />
                </McuProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ide/pin-assignment-visualizer"
            element={
              <ProtectedRoute requireAuth>
                <McuProvider>
                  <PinAssignmentVisualizer />
                </McuProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ide/peripheral-configuration-dashboard"
            element={
              <ProtectedRoute requireAuth>
                <McuProvider>
                  <PeripheralConfigurationDashboard />
                </McuProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ide/peripheral-communication-dashboard"
            element={
              <ProtectedRoute requireAuth>
                <McuProvider>
                  <PeripheralCommunicationDashboard />
                </McuProvider>
              </ProtectedRoute>
            }
          />
          
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;