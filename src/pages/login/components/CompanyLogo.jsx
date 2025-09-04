import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const CompanyLogo = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mb-8">
      <button
        onClick={() => navigate('/sales-dashboard')}
        className="inline-flex items-center space-x-3 hover:opacity-80 transition-opacity group"
      >
        {/* Logo Icon */}
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
          <Icon name="Zap" size={28} color="white" strokeWidth={2.5} />
        </div>
        
        {/* Company Name */}
        <div className="text-left">
          <h1 className="text-2xl font-bold text-foreground">
            TechoOS Pipeline
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            Commercial Roofing Sales Platform
          </p>
        </div>
      </button>

      {/* Tagline */}
      <p className="mt-4 text-muted-foreground text-sm max-w-sm mx-auto">
        Transform your sales process into a guided, intelligent command center for commercial roofing success.
      </p>
    </div>
  );
};

export default CompanyLogo;