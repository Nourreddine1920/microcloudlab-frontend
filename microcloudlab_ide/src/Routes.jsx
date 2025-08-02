import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ConfigurationValidationConflicts from './pages/configuration-validation-conflicts';
import ConfigurationImportExportManager from './pages/configuration-import-export-manager';
import PeripheralConfigurationEditor from './pages/peripheral-configuration-editor';
import PinAssignmentVisualizer from './pages/pin-assignment-visualizer';
import PeripheralConfigurationDashboard from './pages/peripheral-configuration-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ConfigurationImportExportManager />} />
        <Route path="/configuration-validation-conflicts" element={<ConfigurationValidationConflicts />} />
        <Route path="/configuration-import-export-manager" element={<ConfigurationImportExportManager />} />
        <Route path="/peripheral-configuration-editor" element={<PeripheralConfigurationEditor />} />
        <Route path="/pin-assignment-visualizer" element={<PinAssignmentVisualizer />} />
        <Route path="/peripheral-configuration-dashboard" element={<PeripheralConfigurationDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
