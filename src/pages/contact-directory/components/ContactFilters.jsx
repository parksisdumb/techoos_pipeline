import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';

const ContactFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  onBulkAction,
  selectedContacts,
  totalContacts 
}) => {
  const companyOptions = [
    { value: '', label: 'All Companies' },
    { value: 'TechCorp Industries', label: 'TechCorp Industries' },
    { value: 'Global Manufacturing', label: 'Global Manufacturing' },
    { value: 'Metro Construction', label: 'Metro Construction' },
    { value: 'Industrial Solutions', label: 'Industrial Solutions' },
    { value: 'Commercial Properties', label: 'Commercial Properties' }
  ];

  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'Facilities Manager', label: 'Facilities Manager' },
    { value: 'Property Manager', label: 'Property Manager' },
    { value: 'Maintenance Director', label: 'Maintenance Director' },
    { value: 'Operations Manager', label: 'Operations Manager' },
    { value: 'CEO', label: 'CEO' },
    { value: 'CFO', label: 'CFO' }
  ];

  const territoryOptions = [
    { value: '', label: 'All Territories' },
    { value: 'North', label: 'North Territory' },
    { value: 'South', label: 'South Territory' },
    { value: 'East', label: 'East Territory' },
    { value: 'West', label: 'West Territory' },
    { value: 'Central', label: 'Central Territory' }
  ];

  const relationshipOptions = [
    { value: '', label: 'All Relationships' },
    { value: 'Strong', label: 'Strong' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Weak', label: 'Weak' }
  ];

  const interactionOptions = [
    { value: '', label: 'All Interactions' },
    { value: 'recent', label: 'Recent (Last 7 days)' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'overdue', label: 'Overdue Follow-up' }
  ];

  const bulkActionOptions = [
    { value: '', label: 'Bulk Actions' },
    { value: 'email', label: 'Send Email Campaign' },
    { value: 'schedule', label: 'Schedule Follow-up' },
    { value: 'tag', label: 'Add Tags' },
    { value: 'export', label: 'Export Contacts' }
  ];

  const handleBulkActionChange = (value) => {
    if (value && selectedContacts?.length > 0) {
      onBulkAction(value, selectedContacts);
    }
  };

  const activeFiltersCount = Object.values(filters)?.filter(value => value && value !== '')?.length;

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-medium text-foreground">Filter Contacts</h3>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
              {activeFiltersCount} active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {selectedContacts?.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedContacts?.length} selected
              </span>
              <Select
                options={bulkActionOptions}
                value=""
                onChange={handleBulkActionChange}
                placeholder="Bulk Actions"
                className="w-40"
              />
            </div>
          )}
          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              iconName="X"
              iconSize={14}
              onClick={onClearFilters}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <Select
          label="Company"
          options={companyOptions}
          value={filters?.company}
          onChange={(value) => onFilterChange('company', value)}
          className="w-full"
        />

        <Select
          label="Role"
          options={roleOptions}
          value={filters?.role}
          onChange={(value) => onFilterChange('role', value)}
          className="w-full"
        />

        <Select
          label="Territory"
          options={territoryOptions}
          value={filters?.territory}
          onChange={(value) => onFilterChange('territory', value)}
          className="w-full"
        />

        <Select
          label="Relationship"
          options={relationshipOptions}
          value={filters?.relationship}
          onChange={(value) => onFilterChange('relationship', value)}
          className="w-full"
        />

        <Select
          label="Last Interaction"
          options={interactionOptions}
          value={filters?.interaction}
          onChange={(value) => onFilterChange('interaction', value)}
          className="w-full"
        />
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing {totalContacts} contacts</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} />
              <span>Decision Makers: {Math.floor(totalContacts * 0.3)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} />
              <span>Strong Relationships: {Math.floor(totalContacts * 0.4)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFilters;