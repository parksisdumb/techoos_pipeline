import React from 'react';
import Icon from '../../../components/AppIcon';

const PipelineMetrics = ({ opportunities, stages }) => {
  // Calculate metrics
  const totalValue = opportunities?.reduce((sum, opp) => sum + opp?.value, 0);
  const weightedValue = opportunities?.reduce((sum, opp) => sum + (opp?.value * opp?.probability / 100), 0);
  const averageDealSize = opportunities?.length > 0 ? totalValue / opportunities?.length : 0;
  
  // Calculate conversion rates between stages
  const stageConversions = stages?.map((stage, index) => {
    const stageOpps = opportunities?.filter(opp => opp?.stageId === stage?.id);
    const nextStage = stages?.[index + 1];
    const nextStageOpps = nextStage ? opportunities?.filter(opp => opp?.stageId === nextStage?.id) : [];
    
    const conversionRate = stageOpps?.length > 0 ? 
      (nextStageOpps?.length / stageOpps?.length) * 100 : 0;
    
    return {
      stageName: stage?.name,
      count: stageOpps?.length,
      value: stageOpps?.reduce((sum, opp) => sum + opp?.value, 0),
      conversionRate: index < stages?.length - 1 ? conversionRate : null
    };
  });

  // Calculate opportunities by priority
  const priorityBreakdown = {
    high: opportunities?.filter(opp => opp?.priority === 'high')?.length,
    medium: opportunities?.filter(opp => opp?.priority === 'medium')?.length,
    low: opportunities?.filter(opp => opp?.priority === 'low')?.length
  };

  // Calculate close date distribution
  const today = new Date();
  const thisMonth = opportunities?.filter(opp => {
    const closeDate = new Date(opp.expectedCloseDate);
    return closeDate?.getMonth() === today?.getMonth() && 
           closeDate?.getFullYear() === today?.getFullYear();
  });
  
  const nextMonth = opportunities?.filter(opp => {
    const closeDate = new Date(opp.expectedCloseDate);
    const nextMonthDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    return closeDate?.getMonth() === nextMonthDate?.getMonth() && 
           closeDate?.getFullYear() === nextMonthDate?.getFullYear();
  });

  const overdue = opportunities?.filter(opp => {
    const closeDate = new Date(opp.expectedCloseDate);
    return closeDate < today;
  });

  const metrics = [
    {
      title: 'Total Pipeline Value',
      value: `$${totalValue?.toLocaleString()}`,
      icon: 'DollarSign',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      trend: '+12.5%',
      trendUp: true
    },
    {
      title: 'Weighted Forecast',
      value: `$${weightedValue?.toLocaleString()}`,
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      trend: '+8.3%',
      trendUp: true
    },
    {
      title: 'Average Deal Size',
      value: `$${averageDealSize?.toLocaleString()}`,
      icon: 'Target',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      trend: '-2.1%',
      trendUp: false
    },
    {
      title: 'Active Opportunities',
      value: opportunities?.length?.toString(),
      icon: 'Package',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      trend: '+5',
      trendUp: true
    }
  ];

  return (
    <div className="space-y-6 mb-6">
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics?.map((metric, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-10 h-10 rounded-lg ${metric?.bgColor} flex items-center justify-center`}>
                <Icon name={metric?.icon} size={20} className={metric?.color} />
              </div>
              <div className={`text-sm font-medium ${
                metric?.trendUp ? 'text-success' : 'text-error'
              }`}>
                {metric?.trendUp ? '↗' : '↘'} {metric?.trend}
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {metric?.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {metric?.title}
            </div>
          </div>
        ))}
      </div>
      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stage Performance */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-4 flex items-center">
            <Icon name="BarChart3" size={18} className="mr-2" />
            Stage Performance
          </h3>
          <div className="space-y-3">
            {stageConversions?.map((stage, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">{stage?.stageName}</span>
                    <span className="text-muted-foreground">{stage?.count} opps</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ${stage?.value?.toLocaleString()}
                  </div>
                </div>
                {stage?.conversionRate !== null && (
                  <div className="ml-4 text-sm font-medium text-accent">
                    {stage?.conversionRate?.toFixed(1)}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Flag" size={18} className="mr-2" />
            Priority Distribution
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-error rounded-full" />
                <span className="text-sm text-foreground">High Priority</span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {priorityBreakdown?.high}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded-full" />
                <span className="text-sm text-foreground">Medium Priority</span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {priorityBreakdown?.medium}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full" />
                <span className="text-sm text-foreground">Low Priority</span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {priorityBreakdown?.low}
              </span>
            </div>
          </div>
        </div>

        {/* Timeline Overview */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Calendar" size={18} className="mr-2" />
            Timeline Overview
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={14} className="text-error" />
                <span className="text-sm text-foreground">Overdue</span>
              </div>
              <span className="text-sm font-medium text-error">
                {overdue?.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} className="text-warning" />
                <span className="text-sm text-foreground">This Month</span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {thisMonth?.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={14} className="text-accent" />
                <span className="text-sm text-foreground">Next Month</span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {nextMonth?.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineMetrics;