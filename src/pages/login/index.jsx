import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyLogo from './components/CompanyLogo';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import DemoCredentials from './components/DemoCredentials';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/sales-dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Main Login Container */}
        <div className="bg-card rounded-2xl shadow-elevation-3 border border-border p-8 md:p-10">
          {/* Company Logo and Branding */}
          <CompanyLogo />

          {/* Login Form */}
          <LoginForm />
        </div>

        {/* Demo Credentials */}
        <DemoCredentials />

        {/* Trust Signals */}
        <TrustSignals />

        {/* Footer */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-xs text-muted-foreground">
            © {new Date()?.getFullYear()} TechoOS Pipeline. All rights reserved.
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <button className="hover:text-foreground transition-colors">
              Privacy Policy
            </button>
            <span>•</span>
            <button className="hover:text-foreground transition-colors">
              Terms of Service
            </button>
            <span>•</span>
            <button className="hover:text-foreground transition-colors">
              Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;