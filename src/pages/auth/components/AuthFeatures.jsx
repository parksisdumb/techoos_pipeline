import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthFeatures = () => {
  const features = [
    {
      icon: 'TrendingUp',
      title: 'Pipeline Management',
      description: 'Track opportunities from lead to close with visual pipeline boards'
    },
    {
      icon: 'Users',
      title: 'Contact Management',
      description: 'Organize and manage all your commercial roofing contacts in one place'
    },
    {
      icon: 'Calendar',
      title: 'Activity Tracking',
      description: 'Log calls, meetings, and follow-ups with gamified performance tracking'
    },
    {
      icon: 'BarChart3',
      title: 'Sales Analytics',
      description: 'Get insights into your performance with detailed reports and metrics'
    },
    {
      icon: 'Building',
      title: 'Project Management',
      description: 'Manage commercial roofing projects from proposal to completion'
    },
    {
      icon: 'Shield',
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Why Choose TechoOS Pipeline?
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={feature.icon} size={16} color="var(--color-primary)" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground">{feature.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthFeatures;