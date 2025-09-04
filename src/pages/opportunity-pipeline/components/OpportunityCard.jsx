import React from 'react';
import { useDrag } from 'react-dnd';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OpportunityCard = ({ opportunity, onOpen, onEdit }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'opportunity',
    item: { id: opportunity?.id, stageId: opportunity?.stageId },
    collect: (monitor) => ({
      isDragging: monitor?.isDragging(),
    }),
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getBuildingTypeIcon = (type) => {
    switch (type) {
      case 'warehouse': return 'Warehouse';
      case 'office': return 'Building2';
      case 'retail': return 'Store';
      case 'industrial': return 'Factory';
      default: return 'Building';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilClose = (closeDate) => {
    const today = new Date();
    const close = new Date(closeDate);
    const diffTime = close - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilClose = getDaysUntilClose(opportunity?.expectedCloseDate);

  return (
    <div
      ref={drag}
      className={`bg-background border border-border rounded-lg p-3 cursor-move hover:shadow-elevation-2 transition-all duration-200 group ${
        isDragging ? 'opacity-50 rotate-2' : ''
      }`}
      onClick={() => onOpen(opportunity)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="font-medium text-foreground text-sm line-clamp-2 mb-1">
            {opportunity?.name}
          </h4>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name={getBuildingTypeIcon(opportunity?.buildingType)} size={12} />
            <span>{opportunity?.buildingType}</span>
            <span>•</span>
            <span>{opportunity?.squareFootage?.toLocaleString()} sq ft</span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e?.stopPropagation();
            onEdit(opportunity);
          }}
          className="p-1 text-muted-foreground hover:text-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Icon name="MoreVertical" size={14} />
        </button>
      </div>
      {/* Company Info */}
      <div className="flex items-center space-x-2 mb-3">
        <Image
          src={opportunity?.company?.logo}
          alt={opportunity?.company?.name}
          className="w-6 h-6 rounded object-cover"
        />
        <span className="text-sm text-foreground font-medium">
          {opportunity?.company?.name}
        </span>
      </div>
      {/* Value and Probability */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-semibold text-foreground">
          ${opportunity?.value?.toLocaleString()}
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">
            {opportunity?.probability}%
          </div>
          <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${opportunity?.probability}%` }}
            />
          </div>
        </div>
      </div>
      {/* Timeline and Priority */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-1 text-xs">
          <Icon name="Calendar" size={12} />
          <span className="text-muted-foreground">
            Close: {formatDate(opportunity?.expectedCloseDate)}
          </span>
        </div>
        <div className={`flex items-center space-x-1 text-xs ${getPriorityColor(opportunity?.priority)}`}>
          <Icon name="Flag" size={12} />
          <span className="capitalize">{opportunity?.priority}</span>
        </div>
      </div>
      {/* Days Until Close */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {daysUntilClose > 0 ? (
            <span>{daysUntilClose} days left</span>
          ) : daysUntilClose === 0 ? (
            <span className="text-warning">Closes today</span>
          ) : (
            <span className="text-error">{Math.abs(daysUntilClose)} days overdue</span>
          )}
        </div>
        
        {/* Contact Avatar */}
        <div className="flex items-center space-x-1">
          <Image
            src={opportunity?.primaryContact?.avatar}
            alt={opportunity?.primaryContact?.name}
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="text-xs text-muted-foreground">
            {opportunity?.primaryContact?.name?.split(' ')?.[0]}
          </span>
        </div>
      </div>
      {/* Activity Indicator */}
      {opportunity?.lastActivity && (
        <div className="mt-2 pt-2 border-t border-border">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Clock" size={10} />
            <span>
              Last activity: {formatDate(opportunity?.lastActivity?.date)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpportunityCard;