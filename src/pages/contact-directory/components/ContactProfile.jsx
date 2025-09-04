import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import PropertyManagement from '../../../components/PropertyManagement';

const ContactProfile = ({ contact, onClose, onLogCall, onSendEmail, onScheduleMeeting }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'communication', label: 'Communication', icon: 'MessageSquare' },
    { id: 'projects', label: 'Projects', icon: 'Building' },
    { id: 'properties', label: 'Properties', icon: 'Home' },
    { id: 'network', label: 'Network', icon: 'Users' }
  ];

  const getRelationshipColor = (strength) => {
    switch (strength) {
      case 'Strong': return 'text-success bg-success/10 border-success/20';
      case 'Medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'Weak': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">Contact Information</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{contact?.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{contact?.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{contact?.location}</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Professional Details</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Building2" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{contact?.company}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Briefcase" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{contact?.role}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">Since {formatDate(contact?.startDate)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">Relationship Status</h4>
            <div className={`inline-flex items-center px-3 py-2 rounded-lg border ${getRelationshipColor(contact?.relationshipStrength)}`}>
              <span className="font-medium">{contact?.relationshipStrength} Relationship</span>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Interaction Summary</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-lg font-semibold text-foreground">{contact?.totalCalls}</div>
                <div className="text-xs text-muted-foreground">Calls</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-lg font-semibold text-foreground">{contact?.totalEmails}</div>
                <div className="text-xs text-muted-foreground">Emails</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-lg font-semibold text-foreground">{contact?.totalMeetings}</div>
                <div className="text-xs text-muted-foreground">Meetings</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h4 className="font-medium text-foreground mb-2">Notes</h4>
        <p className="text-sm text-muted-foreground">{contact?.notes}</p>
      </div>
    </div>
  );

  const renderCommunication = () => (
    <div className="space-y-4">
      {contact?.communicationHistory?.map((item, index) => (
        <div key={index} className="border border-border rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon 
                name={item?.type === 'call' ? 'Phone' : item?.type === 'email' ? 'Mail' : 'Calendar'} 
                size={16} 
                className="text-primary" 
              />
              <span className="font-medium text-foreground capitalize">{item?.type}</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{formatDate(item?.date)}</span>
            </div>
            <span className="text-xs text-muted-foreground">{item?.duration}</span>
          </div>
          <p className="text-sm text-foreground">{item?.summary}</p>
          {item?.nextAction && (
            <div className="mt-2 p-2 bg-accent/10 rounded border-l-2 border-accent">
              <p className="text-sm text-foreground"><strong>Next Action:</strong> {item?.nextAction}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-4">
      {contact?.projects?.map((project, index) => (
        <div key={index} className="border border-border rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-medium text-foreground">{project?.name}</h4>
              <p className="text-sm text-muted-foreground">{project?.description}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              project?.status === 'Active' ? 'bg-success/10 text-success' :
              project?.status === 'Pending'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
            }`}>
              {project?.status}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="DollarSign" size={14} />
              <span>{project?.value}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>{formatDate(project?.startDate)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="User" size={14} />
              <span>{project?.role}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderNetwork = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contact?.networkConnections?.map((connection, index) => (
          <div key={index} className="border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Image
                src={connection?.avatar}
                alt={connection?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{connection?.name}</h4>
                <p className="text-sm text-muted-foreground">{connection?.role}</p>
                <p className="text-xs text-muted-foreground">{connection?.relationship}</p>
              </div>
              <div className="flex items-center space-x-1">
                <Icon 
                  name={connection?.influence === 'High' ? 'TrendingUp' : 
                        connection?.influence === 'Medium' ? 'Minus' : 'TrendingDown'} 
                  size={14} 
                  className={connection?.influence === 'High' ? 'text-success' : 
                            connection?.influence === 'Medium' ? 'text-warning' : 'text-error'} 
                />
                <span className="text-xs text-muted-foreground">{connection?.influence}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const handleAddProperty = (propertyData) => {
    // This would typically update the contact in the parent component
    console.log('Adding property to contact:', contact?.name, propertyData);
  };

  const handleEditProperty = (propertyData) => {
    console.log('Editing property for contact:', contact?.name, propertyData);
  };

  const handleDeleteProperty = (propertyId) => {
    console.log('Deleting property for contact:', contact?.name, propertyId);
  };

  const handleViewProperty = (property) => {
    console.log('Viewing property details:', property);
  };

  const renderProperties = () => (
    <PropertyManagement
      properties={contact?.properties || []}
      onAddProperty={handleAddProperty}
      onEditProperty={handleEditProperty}
      onDeleteProperty={handleDeleteProperty}
      onViewProperty={handleViewProperty}
      canManage={true}
    />
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'communication': return renderCommunication();
      case 'projects': return renderProjects();
      case 'properties': return renderProperties();
      case 'network': return renderNetwork();
      default: return renderOverview();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Image
                src={contact?.avatar}
                alt={contact?.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              {contact?.isDecisionMaker && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-warning rounded-full flex items-center justify-center">
                  <Icon name="Crown" size={14} color="white" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{contact?.name}</h2>
              <p className="text-muted-foreground">{contact?.role} at {contact?.company}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRelationshipColor(contact?.relationshipStrength)}`}>
                  {contact?.relationshipStrength}
                </span>
                {contact?.isDecisionMaker && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
                    Decision Maker
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Phone"
              iconSize={16}
              onClick={() => onLogCall(contact)}
            >
              Call
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Mail"
              iconSize={16}
              onClick={() => onSendEmail(contact)}
            >
              Email
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Calendar"
              iconSize={16}
              onClick={() => onScheduleMeeting(contact)}
            >
              Schedule
            </Button>
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              iconSize={20}
              onClick={onClose}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-0">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ContactProfile;