import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceCard = ({ title, value, subtitle, icon, trend, trendValue, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    accent: 'bg-accent/10 text-accent border-accent/20'
  };

  const trendIcon = trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus';
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground';

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation-1 hover:card-elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${colorClasses?.[color]}`}>
              <Icon name={icon} size={20} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
              <div className="text-2xl font-bold text-foreground">{value}</div>
            </div>
          </div>
          
          {subtitle && (
            <p className="text-sm text-muted-foreground mb-2">{subtitle}</p>
          )}
          
          {trend && trendValue && (
            <div className="flex items-center space-x-1">
              <Icon name={trendIcon} size={14} className={trendColor} />
              <span className={`text-sm font-medium ${trendColor}`}>
                {trendValue}
              </span>
              <span className="text-sm text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceCard;