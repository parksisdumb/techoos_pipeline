import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import PropertyManagement from '../../../components/PropertyManagement';

const AccountOverview = ({ account, onEdit, onAddContact, onViewContacts }) => {
  if (!account) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="Building2" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No Account Selected</h3>
        <p className="text-muted-foreground">Select an account from the list to view details</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-success/10 text-success border-success/20';
      case 'Prospect': return 'bg-warning/10 text-warning border-warning/20';
      case 'Inactive': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold text-foreground">{account?.companyName}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(account?.status)}`}>
                {account?.status}
              </span>
            </div>
            <div className="flex items-center space-x-6 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} />
                <span>{account?.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Building2" size={16} />
                <span>{account?.industry}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} />
                <span>{account?.employeeCount} employees</span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => onEdit(account)}
            iconName="Edit"
            iconPosition="left"
            iconSize={16}
          >
            Edit Account
          </Button>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Key Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">{account?.totalValue}</div>
            <div className="text-sm text-muted-foreground">Total Pipeline Value</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-1">{account?.activeProjects}</div>
            <div className="text-sm text-muted-foreground">Active Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning mb-1">{account?.contacts}</div>
            <div className="text-sm text-muted-foreground">Total Contacts</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary mb-1">{account?.lastActivity}</div>
            <div className="text-sm text-muted-foreground">Days Since Contact</div>
          </div>
        </div>
      </div>
      {/* Company Information */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Company Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Website</label>
              <div className="mt-1">
                <a 
                  href={account?.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center space-x-1"
                >
                  <span>{account?.website}</span>
                  <Icon name="ExternalLink" size={14} />
                </a>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              <div className="mt-1 text-foreground">{account?.phone}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Annual Revenue</label>
              <div className="mt-1 text-foreground">{account?.annualRevenue}</div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Primary Contact</label>
              <div className="mt-1 text-foreground">{account?.primaryContact}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Territory</label>
              <div className="mt-1 text-foreground">{account?.territory}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Account Owner</label>
              <div className="mt-1 text-foreground">{account?.accountOwner}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            iconSize={14}
          >
            Log Activity
          </Button>
        </div>
        <div className="space-y-3">
          {account?.recentActivities?.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={activity?.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{activity?.title}</div>
                <div className="text-sm text-muted-foreground">{activity?.description}</div>
                <div className="text-xs text-muted-foreground mt-1">{activity?.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Properties Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <PropertyManagement
          properties={account?.properties || []}
          onAddProperty={(propertyData) => console.log('Adding property to account:', account?.companyName, propertyData)}
          onEditProperty={(propertyData) => console.log('Editing property for account:', account?.companyName, propertyData)}
          onDeleteProperty={(propertyId) => console.log('Deleting property for account:', account?.companyName, propertyId)}
          onViewProperty={(property) => console.log('Viewing property details:', property)}
          canManage={true}
        />
      </div>
      {/* Contact Summary */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Key Contacts</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewContacts(account)}
              iconName="Users"
              iconPosition="left"
              iconSize={14}
            >
              View All
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onAddContact(account)}
              iconName="UserPlus"
              iconPosition="left"
              iconSize={14}
            >
              Add Contact
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {account?.keyContacts?.map((contact, index) => (
            <div key={index} className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{contact?.name}</div>
                  <div className="text-sm text-muted-foreground">{contact?.title}</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Last contact: {contact?.lastContact}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-4 pt-6">
        <Button
          variant="outline"
          iconName="Edit"
          iconPosition="left"
          iconSize={16}
          onClick={() => onEdit?.(account)}
        >
          Edit Account
        </Button>
        <Button
          variant="outline"
          iconName="Users"
          iconPosition="left"
          iconSize={16}
          onClick={() => onViewContacts?.(account)}
        >
          View Contacts
        </Button>
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
          onClick={() => onAddContact?.(account)}
        >
          Add Contact
        </Button>
      </div>
    </div>
  );
};

export default AccountOverview;