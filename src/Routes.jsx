import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AccountManagement from './pages/account-management';
import LoginPage from './pages/login';
import OpportunityPipeline from './pages/opportunity-pipeline';
import ActivityTracking from './pages/activity-tracking';
import ContactDirectory from './pages/contact-directory';
import SalesDashboard from './pages/sales-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AccountManagement />} />
        <Route path="/account-management" element={<AccountManagement />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/opportunity-pipeline" element={<OpportunityPipeline />} />
        <Route path="/activity-tracking" element={<ActivityTracking />} />
        <Route path="/contact-directory" element={<ContactDirectory />} />
        <Route path="/sales-dashboard" element={<SalesDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
