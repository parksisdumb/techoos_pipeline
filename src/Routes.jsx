import React, { useState } from "react";
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
  // Mock accounts data to share between pages
  const mockAccounts = [
    { id: 1, companyName: "Metro Manufacturing Corp", location: "Chicago, IL", territory: "North" },
    { id: 2, companyName: "Riverside Retail Plaza", location: "Milwaukee, WI", territory: "North" },
    { id: 3, companyName: "TechHub Innovation Center", location: "Austin, TX", territory: "South" },
    { id: 4, companyName: "Central Distribution Hub", location: "Kansas City, MO", territory: "Central" },
    { id: 5, companyName: "Westside Medical Complex", location: "Denver, CO", territory: "West" }
  ];

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
