import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectTracking = ({ account, onCreateProject, onViewProject }) => {
  if (!account) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="Building" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No Account Selected</h3>
        <p className="text-muted-foreground">Select an account to view project tracking</p>
      </div>
    );
  }

  const getProjectStatusColor = (status) => {
    switch (status) {
      case 'Planning': return 'bg-warning/10 text-warning border-warning/20';
      case 'In Progress': return 'bg-primary/10 text-primary border-primary/20';
      case 'Completed': return 'bg-success/10 text-success border-success/20';
      case 'On Hold': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'High': return { name: 'AlertTriangle', color: 'text-error' };
      case 'Medium': return { name: 'AlertCircle', color: 'text-warning' };
      case 'Low': return { name: 'Minus', color: 'text-muted-foreground' };
      default: return { name: 'Minus', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Project Tracking</h2>
            <p className="text-muted-foreground mt-1">
              Commercial roofing projects for {account?.companyName}
            </p>
          </div>
          <Button
            variant="default"
            onClick={() => onCreateProject(account)}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            New Project
          </Button>
        </div>
      </div>
      {/* Project Statistics */}
      <div className="p-6 border-b border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {account?.projects?.filter(p => p?.status === 'In Progress')?.length || 0}
            </div>
            <div className="text-sm text-muted-foreground">Active Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning mb-1">
              {account?.projects?.filter(p => p?.status === 'Planning')?.length || 0}
            </div>
            <div className="text-sm text-muted-foreground">In Planning</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-1">
              {account?.projects?.filter(p => p?.status === 'Completed')?.length || 0}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-1">{account?.totalProjectValue}</div>
            <div className="text-sm text-muted-foreground">Total Value</div>
          </div>
        </div>
      </div>
      {/* Projects List */}
      <div className="p-6">
        <div className="space-y-4">
          {account?.projects && account?.projects?.length > 0 ? (
            account?.projects?.map((project, index) => {
              const priorityIcon = getPriorityIcon(project?.priority);
              return (
                <div key={index} className="border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-all duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{project?.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getProjectStatusColor(project?.status)}`}>
                          {project?.status}
                        </span>
                        <Icon 
                          name={priorityIcon?.name} 
                          size={16} 
                          className={priorityIcon?.color}
                        />
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{project?.description}</p>
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="DollarSign" size={14} />
                          <span>{project?.value}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Calendar" size={14} />
                          <span>Due: {project?.dueDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="User" size={14} />
                          <span>{project?.projectManager}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewProject(project)}
                      iconName="ExternalLink"
                      iconPosition="left"
                      iconSize={14}
                    >
                      View Details
                    </Button>
                  </div>
                  {/* Project Progress */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Progress</span>
                      <span className="text-sm text-muted-foreground">{project?.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project?.progress}%` }}
                      />
                    </div>
                  </div>
                  {/* Building Specifications */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground mb-1">Building Type</div>
                      <div className="text-sm font-medium text-foreground">{project?.buildingType}</div>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground mb-1">Roof Area</div>
                      <div className="text-sm font-medium text-foreground">{project?.roofArea}</div>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground mb-1">Material</div>
                      <div className="text-sm font-medium text-foreground">{project?.material}</div>
                    </div>
                  </div>
                  {/* Recent Updates */}
                  <div className="border-t border-border pt-3">
                    <div className="text-sm font-medium text-foreground mb-2">Recent Updates</div>
                    <div className="space-y-2">
                      {project?.recentUpdates?.map((update, updateIndex) => (
                        <div key={updateIndex} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="text-sm text-foreground">{update?.message}</div>
                            <div className="text-xs text-muted-foreground">{update?.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <Icon name="Building" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Projects Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start tracking commercial roofing projects for this account
              </p>
              <Button
                variant="default"
                onClick={() => onCreateProject(account)}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
              >
                Create First Project
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectTracking;