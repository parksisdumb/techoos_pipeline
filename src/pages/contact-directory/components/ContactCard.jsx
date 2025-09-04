import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ContactCard = ({ contact, onViewProfile, onLogCall, onSendEmail, onScheduleMeeting }) => {
  const getRelationshipColor = (strength) => {
    switch (strength) {
      case 'Strong': return 'text-success bg-success/10';
      case 'Medium': return 'text-warning bg-warning/10';
      case 'Weak': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getDecisionMakerIcon = (isDecisionMaker) => {
    return isDecisionMaker ? 'Crown' : 'User';
  };

  const formatLastInteraction = (date) => {
    const now = new Date();
    const interactionDate = new Date(date);
    const diffTime = Math.abs(now - interactionDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <Image
              src={contact?.avatar}
              alt={contact?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {contact?.isDecisionMaker && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-warning rounded-full flex items-center justify-center">
                <Icon name="Crown" size={12} color="white" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {contact?.name}
              </h3>
              <Icon 
                name={getDecisionMakerIcon(contact?.isDecisionMaker)} 
                size={14} 
                className={contact?.isDecisionMaker ? 'text-warning' : 'text-muted-foreground'} 
              />
            </div>
            <p className="text-sm text-muted-foreground mb-1">{contact?.role}</p>
            <div className="flex items-center space-x-2">
              <Icon name="Building2" size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{contact?.company}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRelationshipColor(contact?.relationshipStrength)}`}>
            {contact?.relationshipStrength}
          </span>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Clock" size={12} />
            <span>{formatLastInteraction(contact?.lastInteraction)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Phone" size={14} />
            <span>{contact?.totalCalls}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Mail" size={14} />
            <span>{contact?.totalEmails}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} />
            <span>{contact?.totalMeetings}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <Icon name="MapPin" size={12} />
          <span>{contact?.territory}</span>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-2">Recent Activity:</p>
        <p className="text-sm text-foreground">{contact?.recentActivity}</p>
      </div>
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewProfile(contact)}
          className="text-primary hover:text-primary hover:bg-primary/10"
        >
          View Profile
        </Button>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Phone"
            iconSize={14}
            onClick={() => onLogCall(contact)}
          >
            Call
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Mail"
            iconSize={14}
            onClick={() => onSendEmail(contact)}
          >
            Email
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Calendar"
            iconSize={14}
            onClick={() => onScheduleMeeting(contact)}
          >
            Meet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;