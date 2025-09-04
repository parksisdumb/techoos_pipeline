import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PipelineFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  totalOpportunities,
  filteredCount 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const buildingTypes = [
    { value: 'all', label: 'All Buildings' },
    { value: 'warehouse', label: 'Warehouse' },
    { value: 'office', label: 'Office Building' },
    { value: 'retail', label: 'Retail' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' }
  ];

  const priorities = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const sortOptions = [
    { value: 'value-desc', label: 'Value (High to Low)' },
    { value: 'value-asc', label: 'Value (Low to High)' },
    { value: 'close-date-asc', label: 'Close Date (Nearest)' },
    { value: 'close-date-desc', label: 'Close Date (Furthest)' },
    { value: 'probability-desc', label: 'Probability (High to Low)' },
    { value: 'created-desc', label: 'Recently Added' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = filters?.search || 
    filters?.buildingType !== 'all' || 
    filters?.priority !== 'all' ||
    filters?.minValue > 0 ||
    filters?.maxValue < 1000000;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Main Filter Row */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {/* Search */}
        <div className="flex-1 min-w-64">
          <Input
            type="search"
            placeholder="Search opportunities, companies, contacts..."
            value={filters?.search}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex items-center space-x-2">
          <select
            value={filters?.buildingType}
            onChange={(e) => handleFilterChange('buildingType', e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {buildingTypes?.map(type => (
              <option key={type?.value} value={type?.value}>
                {type?.label}
              </option>
            ))}
          </select>

          <select
            value={filters?.priority}
            onChange={(e) => handleFilterChange('priority', e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {priorities?.map(priority => (
              <option key={priority?.value} value={priority?.value}>
                {priority?.label}
              </option>
            ))}
          </select>

          <select
            value={filters?.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {sortOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Advanced Filters Toggle */}
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          Advanced
        </Button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear
          </Button>
        )}
      </div>
      {/* Advanced Filters */}
      {isExpanded && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Value Range */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Min Value ($)
              </label>
              <Input
                type="number"
                placeholder="0"
                value={filters?.minValue || ''}
                onChange={(e) => handleFilterChange('minValue', parseInt(e?.target?.value) || 0)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Max Value ($)
              </label>
              <Input
                type="number"
                placeholder="1,000,000"
                value={filters?.maxValue === 1000000 ? '' : filters?.maxValue}
                onChange={(e) => handleFilterChange('maxValue', parseInt(e?.target?.value) || 1000000)}
              />
            </div>

            {/* Probability Range */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Min Probability (%)
              </label>
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="0"
                value={filters?.minProbability || ''}
                onChange={(e) => handleFilterChange('minProbability', parseInt(e?.target?.value) || 0)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Max Probability (%)
              </label>
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="100"
                value={filters?.maxProbability === 100 ? '' : filters?.maxProbability}
                onChange={(e) => handleFilterChange('maxProbability', parseInt(e?.target?.value) || 100)}
              />
            </div>
          </div>
        </div>
      )}
      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground mt-4 pt-4 border-t border-border">
        <span>
          Showing {filteredCount} of {totalOpportunities} opportunities
        </span>
        
        {hasActiveFilters && (
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={14} />
            <span>Filters active</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PipelineFilters;