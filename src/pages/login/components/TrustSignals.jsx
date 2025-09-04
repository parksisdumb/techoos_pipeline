import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const certifications = [
    {
      id: 1,
      name: 'NRCA Member',
      description: 'National Roofing Contractors Association',
      icon: 'Shield',
      verified: true
    },
    {
      id: 2,
      name: 'SSL Secured',
      description: 'Bank-level encryption',
      icon: 'Lock',
      verified: true
    },
    {
      id: 3,
      name: 'SOC 2 Compliant',
      description: 'Enterprise security standards',
      icon: 'CheckCircle',
      verified: true
    }
  ];

  const partnerships = [
    'GAF Certified Partner',
    'Owens Corning Preferred',
    'CertainTeed SELECT'
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      {/* Security Certifications */}
      <div className="bg-muted/30 rounded-lg p-6 mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-4 text-center">
          Trusted by Commercial Roofing Professionals
        </h3>
        
        <div className="grid grid-cols-1 gap-3">
          {certifications?.map((cert) => (
            <div key={cert?.id} className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name={cert?.icon} size={16} color="var(--color-success)" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-foreground">{cert?.name}</p>
                  {cert?.verified && (
                    <Icon name="BadgeCheck" size={14} color="var(--color-success)" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{cert?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Industry Partnerships */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-3">
          Integrated with leading roofing manufacturers
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {partnerships?.map((partner, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 bg-primary/5 text-primary text-xs font-medium rounded-md"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
      {/* Security Notice */}
      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} color="var(--color-accent)" className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-foreground font-medium mb-1">
              Your data is protected
            </p>
            <p className="text-xs text-muted-foreground">
              We use industry-standard encryption and never share your sales data with competitors or third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;