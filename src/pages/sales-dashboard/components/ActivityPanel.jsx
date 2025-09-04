import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityPanel = () => {
  const upcomingActivities = [
    {
      id: 1,
      type: 'call',
      title: 'Follow-up call with Metro Construction',
      time: '10:30 AM',
      priority: 'high',
      contact: 'John Martinez'
    },
    {
      id: 2,
      type: 'meeting',
      title: 'Site visit - Downtown Office Complex',
      time: '2:00 PM',
      priority: 'medium',
      contact: 'Sarah Wilson'
    },
    {
      id: 3,
      type: 'email',
      title: 'Send proposal to ABC Warehousing',
      time: '4:00 PM',
      priority: 'high',
      contact: 'Mike Thompson'
    },
    {
      id: 4,
      type: 'call',
      title: 'Check-in with Regional Hospital',
      time: 'Tomorrow 9:00 AM',
      priority: 'low',
      contact: 'Dr. Lisa Chen'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'call': return 'Phone';
      case 'meeting': return 'Calendar';
      case 'email': return 'Mail';
      default: return 'Clock';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Today's Activities</h2>
        <Button variant="ghost" size="sm" iconName="Plus" iconPosition="left">
          Add Activity
        </Button>
      </div>
      <div className="space-y-4">
        {upcomingActivities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <Icon name={getActivityIcon(activity?.type)} size={16} color="var(--color-primary)" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-foreground truncate">{activity?.title}</h3>
                  <p className="text-sm text-muted-foreground">{activity?.contact}</p>
                </div>
                <div className="flex items-center space-x-2 ml-2">
                  <span className={`text-xs font-medium ${getPriorityColor(activity?.priority)}`}>
                    {activity?.priority?.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-muted-foreground">{activity?.time}</span>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="xs" iconName="Check" />
                  <Button variant="ghost" size="xs" iconName="Clock" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="outline" fullWidth iconName="Calendar" iconPosition="left">
          View All Activities
        </Button>
      </div>
    </div>
  );
};

export default ActivityPanel;