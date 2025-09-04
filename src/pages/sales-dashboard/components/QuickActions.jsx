import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      id: 1,
      title: 'Log Activity',
      description: 'Record calls, meetings, or emails',
      icon: 'Plus',
      variant: 'default',
      action: () => console.log('Log Activity clicked')
    },
    {
      id: 2,
      title: 'Add Opportunity',
      description: 'Create new sales opportunity',
      icon: 'TrendingUp',
      variant: 'outline',
      action: () => console.log('Add Opportunity clicked')
    },
    {
      id: 3,
      title: 'Schedule Follow-up',
      description: 'Set reminder for next contact',
      icon: 'Calendar',
      variant: 'outline',
      action: () => console.log('Schedule Follow-up clicked')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation-1">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickActions?.map((action) => (
          <div key={action?.id} className="text-center">
            <Button
              variant={action?.variant}
              fullWidth
              iconName={action?.icon}
              iconPosition="left"
              onClick={action?.action}
              className="mb-2 h-12"
            >
              {action?.title}
            </Button>
            <p className="text-xs text-muted-foreground">{action?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;