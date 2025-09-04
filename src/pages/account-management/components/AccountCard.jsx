import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountCard = ({ account, onViewDetails, onAddContact, onLogInteraction, onCreateOpportunity }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-success/10 text-success border-success/20';
      case 'Prospect': return 'bg-warning/10 text-warning border-warning/20';
      case 'Inactive': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-error';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-foreground">{account?.companyName}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(account?.status)}`}>
              {account?.status}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{account?.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Building2" size={14} />
              <span>{account?.industry}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>{account?.employeeCount} employees</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon 
            name="Flag" 
            size={16} 
            className={getPriorityColor(account?.priority)}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewDetails(account)}
          >
            <Icon name="MoreVertical" size={16} />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{account?.totalValue}</div>
          <div className="text-xs text-muted-foreground">Pipeline Value</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{account?.activeProjects}</div>
          <div className="text-xs text-muted-foreground">Active Projects</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">{account?.contacts}</div>
          <div className="text-xs text-muted-foreground">Contacts</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary">{account?.lastActivity}</div>
          <div className="text-xs text-muted-foreground">Days Since Contact</div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Calendar" size={14} />
          <span>Last contact: {account?.lastContactDate}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAddContact(account)}
            iconName="UserPlus"
            iconPosition="left"
            iconSize={14}
          >
            Add Contact
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLogInteraction(account)}
            iconName="MessageSquare"
            iconPosition="left"
            iconSize={14}
          >
            Log Activity
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onCreateOpportunity(account)}
            iconName="Plus"
            iconPosition="left"
            iconSize={14}
          >
            New Opportunity
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;