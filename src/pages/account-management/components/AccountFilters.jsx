import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AccountFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  searchQuery, 
  onSearchChange 
}) => {
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'Active', label: 'Active' },
    { value: 'Prospect', label: 'Prospect' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'High', label: 'High Priority' },
    { value: 'Medium', label: 'Medium Priority' },
    { value: 'Low', label: 'Low Priority' }
  ];

  const territoryOptions = [
    { value: '', label: 'All Territories' },
    { value: 'North', label: 'North Territory' },
    { value: 'South', label: 'South Territory' },
    { value: 'East', label: 'East Territory' },
    { value: 'West', label: 'West Territory' },
    { value: 'Central', label: 'Central Territory' }
  ];

  const companySizeOptions = [
    { value: '', label: 'All Company Sizes' },
    { value: 'Small', label: 'Small (1-50 employees)' },
    { value: 'Medium', label: 'Medium (51-200 employees)' },
    { value: 'Large', label: 'Large (201-1000 employees)' },
    { value: 'Enterprise', label: 'Enterprise (1000+ employees)' }
  ];

  const industryOptions = [
    { value: '', label: 'All Industries' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Education', label: 'Education' },
    { value: 'Logistics', label: 'Logistics & Warehousing' },
    { value: 'Office', label: 'Office Buildings' },
    { value: 'Hospitality', label: 'Hospitality' }
  ];

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filter Accounts</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Clear Filters
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-4">
        <div className="xl:col-span-2">
          <Input
            type="search"
            placeholder="Search accounts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        <Select
          placeholder="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />

        <Select
          placeholder="Priority"
          options={priorityOptions}
          value={filters?.priority}
          onChange={(value) => onFilterChange('priority', value)}
        />

        <Select
          placeholder="Territory"
          options={territoryOptions}
          value={filters?.territory}
          onChange={(value) => onFilterChange('territory', value)}
        />

        <Select
          placeholder="Company Size"
          options={companySizeOptions}
          value={filters?.companySize}
          onChange={(value) => onFilterChange('companySize', value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Select
          placeholder="Industry"
          options={industryOptions}
          value={filters?.industry}
          onChange={(value) => onFilterChange('industry', value)}
        />

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Pipeline Value:</span>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters?.minValue}
              onChange={(e) => onFilterChange('minValue', e?.target?.value)}
              className="w-20"
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              placeholder="Max"
              value={filters?.maxValue}
              onChange={(e) => onFilterChange('maxValue', e?.target?.value)}
              className="w-20"
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <div className="text-sm text-muted-foreground">
            Showing filtered results
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountFilters;