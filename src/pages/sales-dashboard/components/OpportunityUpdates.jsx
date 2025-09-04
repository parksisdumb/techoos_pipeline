import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OpportunityUpdates = () => {
  const recentUpdates = [
    {
      id: 1,
      company: 'Metro Construction LLC',
      project: 'Warehouse Roof Replacement',
      value: '$125,000',
      stage: 'Proposal Sent',
      lastActivity: '2 hours ago',
      probability: 75,
      contact: 'John Martinez',
      nextAction: 'Follow-up call scheduled'
    },
    {
      id: 2,
      company: 'Downtown Office Complex',
      project: 'Emergency Roof Repair',
      value: '$45,000',
      stage: 'Site Visit Completed',
      lastActivity: '5 hours ago',
      probability: 90,
      contact: 'Sarah Wilson',
      nextAction: 'Proposal preparation'
    },
    {
      id: 3,
      company: 'ABC Warehousing',
      project: 'New Construction Roofing',
      value: '$200,000',
      stage: 'Initial Contact',
      lastActivity: '1 day ago',
      probability: 25,
      contact: 'Mike Thompson',
      nextAction: 'Schedule site visit'
    },
    {
      id: 4,
      company: 'Regional Hospital',
      project: 'Medical Facility Roof Upgrade',
      value: '$85,000',
      stage: 'Negotiation',
      lastActivity: '2 days ago',
      probability: 60,
      contact: 'Dr. Lisa Chen',
      nextAction: 'Contract review'
    }
  ];

  const getStageColor = (stage) => {
    switch (stage) {
      case 'Initial Contact': return 'bg-muted text-muted-foreground';
      case 'Site Visit Completed': return 'bg-warning/10 text-warning';
      case 'Proposal Sent': return 'bg-primary/10 text-primary';
      case 'Negotiation': return 'bg-accent/10 text-accent';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getProbabilityColor = (probability) => {
    if (probability >= 75) return 'text-success';
    if (probability >= 50) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Recent Opportunity Updates</h2>
        <Button variant="ghost" size="sm" iconName="Plus" iconPosition="left">
          Add Opportunity
        </Button>
      </div>
      <div className="space-y-4">
        {recentUpdates?.map((opportunity) => (
          <div key={opportunity?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">{opportunity?.company}</h3>
                <p className="text-sm text-muted-foreground">{opportunity?.project}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-foreground">{opportunity?.value}</div>
                <div className={`text-sm font-medium ${getProbabilityColor(opportunity?.probability)}`}>
                  {opportunity?.probability}% probability
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(opportunity?.stage)}`}>
                {opportunity?.stage}
              </span>
              <span className="text-xs text-muted-foreground">{opportunity?.lastActivity}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="User" size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{opportunity?.contact}</span>
              </div>
              <Button variant="ghost" size="xs" iconName="ArrowRight">
                View Details
              </Button>
            </div>

            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} className="text-primary" />
                <span className="text-sm text-foreground">{opportunity?.nextAction}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="outline" fullWidth iconName="TrendingUp" iconPosition="left">
          View Pipeline
        </Button>
      </div>
    </div>
  );
};

export default OpportunityUpdates;