import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ActivityHistory = ({ activities, onEdit, onDelete }) => {
  const [filters, setFilters] = useState({
    type: '',
    account: '',
    dateRange: '',
    search: ''
  });
  const [sortBy, setSortBy] = useState('date_desc');

  const activityTypes = [
    { value: '', label: 'All Types' },
    { value: 'call', label: 'Phone Calls' },
    { value: 'email', label: 'Emails' },
    { value: 'site_visit', label: 'Site Visits' },
    { value: 'follow_up', label: 'Follow-ups' },
    { value: 'proposal', label: 'Proposals' },
    { value: 'meeting', label: 'Meetings' }
  ];

  const dateRanges = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const sortOptions = [
    { value: 'date_desc', label: 'Newest First' },
    { value: 'date_asc', label: 'Oldest First' },
    { value: 'account', label: 'Account Name' },
    { value: 'type', label: 'Activity Type' }
  ];

  const getActivityIcon = (type) => {
    const icons = {
      call: 'Phone',
      email: 'Mail',
      site_visit: 'MapPin',
      follow_up: 'Clock',
      proposal: 'FileText',
      meeting: 'Users'
    };
    return icons?.[type] || 'Calendar';
  };

  const getActivityColor = (type) => {
    const colors = {
      call: 'text-blue-600',
      email: 'text-green-600',
      site_visit: 'text-purple-600',
      follow_up: 'text-orange-600',
      proposal: 'text-indigo-600',
      meeting: 'text-pink-600'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  const getOutcomeColor = (outcome) => {
    const colors = {
      positive: 'bg-green-100 text-green-800 border-green-200',
      neutral: 'bg-blue-100 text-blue-800 border-blue-200',
      negative: 'bg-red-100 text-red-800 border-red-200',
      callback: 'bg-orange-100 text-orange-800 border-orange-200',
      proposal_sent: 'bg-purple-100 text-purple-800 border-purple-200',
      meeting_scheduled: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors?.[outcome] || 'bg-muted text-muted-foreground border-border';
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })?.format(new Date(date));
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const filterActivities = () => {
    let filtered = [...activities];

    // Apply filters
    if (filters?.type) {
      filtered = filtered?.filter(activity => activity?.type === filters?.type);
    }

    if (filters?.account) {
      filtered = filtered?.filter(activity => 
        activity?.account?.toLowerCase()?.includes(filters?.account?.toLowerCase())
      );
    }

    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(activity =>
        activity?.notes?.toLowerCase()?.includes(searchTerm) ||
        activity?.contact?.toLowerCase()?.includes(searchTerm) ||
        activity?.account?.toLowerCase()?.includes(searchTerm)
      );
    }

    if (filters?.dateRange) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      filtered = filtered?.filter(activity => {
        const activityDate = new Date(activity.date);
        
        switch (filters?.dateRange) {
          case 'today':
            return activityDate >= today;
          case 'week':
            const weekAgo = new Date(today);
            weekAgo?.setDate(today?.getDate() - 7);
            return activityDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(today);
            monthAgo?.setMonth(today?.getMonth() - 1);
            return activityDate >= monthAgo;
          case 'quarter':
            const quarterAgo = new Date(today);
            quarterAgo?.setMonth(today?.getMonth() - 3);
            return activityDate >= quarterAgo;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'date_desc':
          return new Date(b.date) - new Date(a.date);
        case 'date_asc':
          return new Date(a.date) - new Date(b.date);
        case 'account':
          return a?.account?.localeCompare(b?.account);
        case 'type':
          return a?.type?.localeCompare(b?.type);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredActivities = filterActivities();

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="History" size={20} color="var(--color-secondary)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Activity History</h2>
          <p className="text-sm text-muted-foreground">
            {filteredActivities?.length} of {activities?.length} activities
          </p>
        </div>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Select
          placeholder="Filter by type"
          options={activityTypes}
          value={filters?.type}
          onChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
        />

        <Select
          placeholder="Filter by date"
          options={dateRanges}
          value={filters?.dateRange}
          onChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}
        />

        <Input
          type="search"
          placeholder="Search activities..."
          value={filters?.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e?.target?.value }))}
        />

        <Select
          placeholder="Sort by"
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
        />
      </div>
      {/* Activity List */}
      <div className="space-y-4">
        {filteredActivities?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="Search" size={48} className="mx-auto mb-3 opacity-50" />
            <p>No activities found matching your filters</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => setFilters({ type: '', account: '', dateRange: '', search: '' })}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          filteredActivities?.map((activity) => (
            <div
              key={activity?.id}
              className="p-4 border border-border rounded-lg hover:shadow-elevation-1 transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-muted ${getActivityColor(activity?.type)}`}>
                    <Icon name={getActivityIcon(activity?.type)} size={20} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-foreground">{activity?.account}</h3>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{activity?.contact}</span>
                      {activity?.duration && (
                        <>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">
                            {formatDuration(activity?.duration)}
                          </span>
                        </>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getOutcomeColor(activity?.outcome)}`}>
                        {activity?.outcome?.replace('_', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(activity?.date)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{activity?.notes}</p>
                    
                    {activity?.nextSteps && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Icon name="ArrowRight" size={14} color="var(--color-accent)" />
                        <span className="text-accent font-medium">Next: {activity?.nextSteps}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Edit"
                    onClick={() => onEdit(activity)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    onClick={() => onDelete(activity)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Load More */}
      {filteredActivities?.length > 0 && filteredActivities?.length >= 20 && (
        <div className="text-center mt-6">
          <Button variant="outline">
            Load More Activities
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActivityHistory;