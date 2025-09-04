import React from 'react';
import { useDrop } from 'react-dnd';
import OpportunityCard from './OpportunityCard';
import Icon from '../../../components/AppIcon';

const PipelineStage = ({ 
  stage, 
  opportunities, 
  onMoveOpportunity, 
  onOpenOpportunity,
  onEditOpportunity 
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'opportunity',
    drop: (item) => {
      if (item?.stageId !== stage?.id) {
        onMoveOpportunity(item?.id, stage?.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const stageOpportunities = opportunities?.filter(opp => opp?.stageId === stage?.id);
  const totalValue = stageOpportunities?.reduce((sum, opp) => sum + opp?.value, 0);
  const weightedValue = stageOpportunities?.reduce((sum, opp) => sum + (opp?.value * opp?.probability / 100), 0);

  return (
    <div
      ref={drop}
      className={`flex-1 min-w-80 bg-card rounded-lg border border-border transition-all duration-200 ${
        isOver ? 'border-primary bg-primary/5' : ''
      }`}
    >
      {/* Stage Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: stage?.color }}
            />
            <h3 className="font-semibold text-foreground">{stage?.name}</h3>
            <span className="text-sm text-muted-foreground">
              ({stageOpportunities?.length})
            </span>
          </div>
          <button className="p-1 text-muted-foreground hover:text-foreground rounded">
            <Icon name="MoreHorizontal" size={16} />
          </button>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Value:</span>
            <span className="font-medium text-foreground">
              ${totalValue?.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Weighted:</span>
            <span className="font-medium text-accent">
              ${weightedValue?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      {/* Opportunities List */}
      <div className="p-2 space-y-2 max-h-96 overflow-y-auto">
        {stageOpportunities?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="Package" size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No opportunities</p>
          </div>
        ) : (
          stageOpportunities?.map((opportunity) => (
            <OpportunityCard
              key={opportunity?.id}
              opportunity={opportunity}
              onOpen={onOpenOpportunity}
              onEdit={onEditOpportunity}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PipelineStage;