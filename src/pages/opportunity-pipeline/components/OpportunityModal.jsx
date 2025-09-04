import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';


const OpportunityModal = ({ opportunity, isOpen, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(opportunity || {});

  if (!isOpen || !opportunity) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'details', label: 'Project Details', icon: 'Building' },
    { id: 'contacts', label: 'Contacts', icon: 'Users' },
    { id: 'activities', label: 'Activities', icon: 'Clock' },
    { id: 'documents', label: 'Documents', icon: 'FileText' }
  ];

  const activities = [
    {
      id: 1,
      type: 'call',
      description: 'Initial discovery call completed',
      date: '2025-01-02',
      user: 'Sarah Johnson',
      notes: 'Discussed project timeline and budget requirements. Client is looking for TPO membrane installation.'
    },
    {
      id: 2,
      type: 'email',
      description: 'Sent proposal and timeline',
      date: '2025-01-03',
      user: 'Sarah Johnson',
      notes: 'Sent detailed proposal with material specifications and installation timeline.'
    },
    {
      id: 3,
      type: 'meeting',
      description: 'Site visit scheduled',
      date: '2025-01-05',
      user: 'Sarah Johnson',
      notes: 'Scheduled site visit for January 8th to assess roof condition and measurements.'
    }
  ];

  const documents = [
    { id: 1, name: 'Initial Proposal.pdf', type: 'proposal', size: '2.4 MB', date: '2025-01-03' },
    { id: 2, name: 'Site Photos.zip', type: 'photos', size: '15.2 MB', date: '2025-01-05' },
    { id: 3, name: 'Material Specifications.pdf', type: 'specs', size: '1.8 MB', date: '2025-01-03' }
  ];

  const handleSave = () => {
    onSave(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(opportunity);
    setIsEditing(false);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'call': return 'Phone';
      case 'email': return 'Mail';
      case 'meeting': return 'Calendar';
      case 'note': return 'FileText';
      default: return 'Clock';
    }
  };

  const getDocumentIcon = (type) => {
    switch (type) {
      case 'proposal': return 'FileText';
      case 'photos': return 'Image';
      case 'specs': return 'File';
      default: return 'FileText';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card border border-border rounded-lg shadow-elevation-4 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <Image
              src={opportunity?.company?.logo}
              alt={opportunity?.company?.name}
              className="w-12 h-12 rounded object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {opportunity?.name}
              </h2>
              <p className="text-muted-foreground">
                {opportunity?.company?.name}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                iconName="Edit"
                iconPosition="left"
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleSave}
                  iconName="Save"
                  iconPosition="left"
                >
                  Save
                </Button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 text-muted-foreground hover:text-foreground rounded-lg"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-background border border-border rounded-lg p-4">
                  <div className="text-2xl font-bold text-foreground">
                    ${opportunity?.value?.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Deal Value</div>
                </div>
                <div className="bg-background border border-border rounded-lg p-4">
                  <div className="text-2xl font-bold text-accent">
                    {opportunity?.probability}%
                  </div>
                  <div className="text-sm text-muted-foreground">Probability</div>
                </div>
                <div className="bg-background border border-border rounded-lg p-4">
                  <div className="text-2xl font-bold text-foreground">
                    {new Date(opportunity.expectedCloseDate)?.toLocaleDateString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Expected Close</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">Description</h3>
                {isEditing ? (
                  <textarea
                    value={editData?.description || opportunity?.description}
                    onChange={(e) => setEditData({...editData, description: e?.target?.value})}
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground resize-none"
                    rows={4}
                  />
                ) : (
                  <p className="text-muted-foreground">
                    {opportunity?.description}
                  </p>
                )}
              </div>

              {/* Primary Contact */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Primary Contact</h3>
                <div className="flex items-center space-x-3 p-3 bg-background border border-border rounded-lg">
                  <Image
                    src={opportunity?.primaryContact?.avatar}
                    alt={opportunity?.primaryContact?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-foreground">
                      {opportunity?.primaryContact?.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {opportunity?.primaryContact?.title}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" iconName="Phone" />
                    <Button variant="outline" size="sm" iconName="Mail" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Project Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-muted-foreground">Building Type</label>
                      <div className="text-foreground capitalize">{opportunity?.buildingType}</div>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Square Footage</label>
                      <div className="text-foreground">{opportunity?.squareFootage?.toLocaleString()} sq ft</div>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Current Roof Type</label>
                      <div className="text-foreground">{opportunity?.currentRoofType || 'Built-up roof (BUR)'}</div>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Proposed Solution</label>
                      <div className="text-foreground">{opportunity?.proposedSolution || 'TPO Membrane System'}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Timeline & Budget</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-muted-foreground">Project Start</label>
                      <div className="text-foreground">
                        {opportunity?.projectStart ? new Date(opportunity.projectStart)?.toLocaleDateString() : 'TBD'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Project Duration</label>
                      <div className="text-foreground">{opportunity?.duration || '2-3 weeks'}</div>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Budget Range</label>
                      <div className="text-foreground">
                        ${(opportunity?.value * 0.9)?.toLocaleString()} - ${(opportunity?.value * 1.1)?.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Project Contacts</h3>
                <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
                  Add Contact
                </Button>
              </div>
              
              <div className="space-y-3">
                {[opportunity?.primaryContact, ...(opportunity?.additionalContacts || [])]?.map((contact, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-background border border-border rounded-lg">
                    <Image
                      src={contact?.avatar}
                      alt={contact?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{contact?.name}</div>
                      <div className="text-sm text-muted-foreground">{contact?.title}</div>
                      <div className="text-sm text-muted-foreground">{contact?.email}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" iconName="Phone" />
                      <Button variant="outline" size="sm" iconName="Mail" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Activity Timeline</h3>
                <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
                  Log Activity
                </Button>
              </div>
              
              <div className="space-y-4">
                {activities?.map((activity) => (
                  <div key={activity?.id} className="flex space-x-3 p-4 bg-background border border-border rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name={getActivityIcon(activity?.type)} size={16} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium text-foreground">{activity?.description}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(activity.date)?.toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">by {activity?.user}</div>
                      <div className="text-sm text-foreground">{activity?.notes}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Project Documents</h3>
                <Button variant="outline" size="sm" iconName="Upload" iconPosition="left">
                  Upload Document
                </Button>
              </div>
              
              <div className="space-y-3">
                {documents?.map((doc) => (
                  <div key={doc?.id} className="flex items-center space-x-3 p-3 bg-background border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Icon name={getDocumentIcon(doc?.type)} size={20} className="text-secondary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{doc?.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {doc?.size} • {new Date(doc.date)?.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" iconName="Download" />
                      <Button variant="ghost" size="sm" iconName="Eye" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpportunityModal;