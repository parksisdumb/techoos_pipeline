import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthHeader from './components/AuthHeader';
import AuthForm from './components/AuthForm';
import AuthFeatures from './components/AuthFeatures';
import TrustSignals from '../login/components/TrustSignals';
import DemoCredentials from '../login/components/DemoCredentials';

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mode, setMode] = useState(searchParams.get('mode') || 'login');

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/sales-dashboard');
    }
  }, [navigate]);

  useEffect(() => {
    // Update URL when mode changes
    setSearchParams({ mode });
  }, [mode, setSearchParams]);

  const handleToggleMode = () => {
    setMode(prevMode => prevMode === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Main Auth Container */}
        <div className="bg-card rounded-2xl shadow-elevation-3 border border-border p-8 md:p-10">
          {/* Auth Header */}
          <AuthHeader mode={mode} />

          {/* Auth Form */}
          <AuthForm mode={mode} onToggleMode={handleToggleMode} />
        </div>

        {/* Demo Credentials (only show for login) */}
        {mode === 'login' && <DemoCredentials />}

        {/* Features (only show for signup) */}
        {mode === 'signup' && <AuthFeatures />}

        {/* Trust Signals */}
        <TrustSignals />

        {/* Footer */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} TechoOS Pipeline. All rights reserved.
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

export default AuthPage;