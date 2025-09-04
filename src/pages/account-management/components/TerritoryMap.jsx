import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TerritoryMap = ({ accounts, selectedTerritory, onTerritoryChange, onAccountSelect }) => {
  const territories = [
    { id: 'all', name: 'All Territories', color: 'bg-primary', count: accounts?.length },
    { id: 'North', name: 'North Territory', color: 'bg-accent', count: accounts?.filter(a => a?.territory === 'North')?.length },
    { id: 'South', name: 'South Territory', color: 'bg-warning', count: accounts?.filter(a => a?.territory === 'South')?.length },
    { id: 'East', name: 'East Territory', color: 'bg-success', count: accounts?.filter(a => a?.territory === 'East')?.length },
    { id: 'West', name: 'West Territory', color: 'bg-error', count: accounts?.filter(a => a?.territory === 'West')?.length },
    { id: 'Central', name: 'Central Territory', color: 'bg-secondary', count: accounts?.filter(a => a?.territory === 'Central')?.length }
  ];

  const filteredAccounts = selectedTerritory === 'all' 
    ? accounts 
    : accounts?.filter(account => account?.territory === selectedTerritory);

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Territory Mapping</h2>
            <p className="text-muted-foreground mt-1">
              Geographic distribution of accounts for field planning
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              iconSize={14}
            >
              Export Map
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
              iconSize={14}
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>
      {/* Territory Filter */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-wrap gap-2">
          {territories?.map((territory) => (
            <button
              key={territory?.id}
              onClick={() => onTerritoryChange(territory?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                selectedTerritory === territory?.id
                  ? 'bg-primary text-white border-primary' :'bg-card text-foreground border-border hover:bg-muted/50'
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${territory?.color}`} />
              <span className="font-medium">{territory?.name}</span>
              <span className="text-sm opacity-75">({territory?.count})</span>
            </button>
          ))}
        </div>
      </div>
      {/* Map Container */}
      <div className="p-6 border-b border-border">
        <div className="bg-muted/30 rounded-lg overflow-hidden" style={{ height: '400px' }}>
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Territory Map"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=40.7128,-74.0060&z=10&output=embed"
            className="border-0"
          />
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Interactive map showing account locations across territories
          </p>
        </div>
      </div>
      {/* Territory Statistics */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Territory Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">
              {filteredAccounts?.reduce((sum, account) => sum + parseInt(account?.totalValue?.replace(/[$,]/g, '')), 0)?.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Pipeline Value</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-accent mb-1">
              {filteredAccounts?.filter(a => a?.status === 'Active')?.length}
            </div>
            <div className="text-sm text-muted-foreground">Active Accounts</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-warning mb-1">
              {filteredAccounts?.filter(a => a?.priority === 'High')?.length}
            </div>
            <div className="text-sm text-muted-foreground">High Priority</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-success mb-1">
              {Math.round(filteredAccounts?.reduce((sum, account) => sum + account?.activeProjects, 0) / filteredAccounts?.length) || 0}
            </div>
            <div className="text-sm text-muted-foreground">Avg Projects</div>
          </div>
        </div>
      </div>
      {/* Account List for Selected Territory */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Accounts in {territories?.find(t => t?.id === selectedTerritory)?.name}
          </h3>
          <div className="text-sm text-muted-foreground">
            {filteredAccounts?.length} accounts
          </div>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredAccounts?.map((account, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onAccountSelect(account)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Building2" size={16} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{account?.companyName}</div>
                  <div className="text-sm text-muted-foreground flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{account?.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="DollarSign" size={12} />
                      <span>{account?.totalValue}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                  account?.status === 'Active' ?'bg-success/10 text-success border-success/20'
                    : account?.status === 'Prospect' ?'bg-warning/10 text-warning border-warning/20' :'bg-muted text-muted-foreground border-border'
                }`}>
                  {account?.status}
                </span>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>

        {filteredAccounts?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="MapPin" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Accounts Found</h3>
            <p className="text-muted-foreground">
              No accounts found in the selected territory
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TerritoryMap;