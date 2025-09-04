import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WorkflowGuide = ({ currentOpportunity, onCompleteStep, onSkipStep }) => {
  const [expandedStep, setExpandedStep] = useState(0);

  // Mock workflow based on opportunity stage
  const getWorkflowSteps = (stage) => {
    const workflows = {
      'prospecting': [
        {
          id: 1,
          title: 'Initial Research',
          description: 'Research the company and identify key decision makers',
          action: 'Research Company',
          icon: 'Search',
          estimated: '15 min',
          points: 10,
          tips: [
            'Check company website for recent news or expansions',
            'Look up facility locations and roof types',
            'Identify maintenance or construction managers'
          ]
        },
        {
          id: 2,
          title: 'First Contact',
          description: 'Make initial contact via phone or email',
          action: 'Make Contact',
          icon: 'Phone',
          estimated: '20 min',
          points: 25,
          tips: [
            'Use warm introduction if possible',
            'Focus on value proposition, not product features',
            'Ask about current roofing challenges'
          ]
        },
        {
          id: 3,
          title: 'Qualify Opportunity',
          description: 'Determine if this is a qualified opportunity',
          action: 'Qualify Lead',
          icon: 'CheckCircle',
          estimated: '10 min',
          points: 15,
          tips: [
            'Confirm budget authority and timeline',
            'Understand decision-making process',
            'Assess urgency and pain points'
          ]
        }
      ],
      'qualified': [
        {
          id: 4,
          title: 'Schedule Site Visit',
          description: 'Arrange on-site inspection and assessment',
          action: 'Schedule Visit',
          icon: 'MapPin',
          estimated: '30 min',
          points: 30,
          tips: [
            'Bring inspection tools and camera',
            'Schedule during business hours',
            'Confirm key stakeholders will be present'
          ]
        },
        {
          id: 5,
          title: 'Conduct Assessment',
          description: 'Perform thorough roof inspection and document findings',
          action: 'Complete Assessment',
          icon: 'FileText',
          estimated: '2 hours',
          points: 50,
          tips: [
            'Document all issues with photos',
            'Measure roof areas accurately',
            'Note access requirements and safety concerns'
          ]
        },
        {
          id: 6,
          title: 'Present Findings',
          description: 'Review assessment results with client',
          action: 'Present Results',
          icon: 'Presentation',
          estimated: '45 min',
          points: 40,
          tips: [
            'Use visual aids and photos',
            'Prioritize issues by urgency',
            'Discuss multiple solution options'
          ]
        }
      ],
      'proposal': [
        {
          id: 7,
          title: 'Prepare Proposal',
          description: 'Create detailed proposal with specifications and pricing',
          action: 'Create Proposal',
          icon: 'FileText',
          estimated: '3 hours',
          points: 75,
          tips: [
            'Include detailed scope of work',
            'Provide multiple options if appropriate',
            'Include timeline and warranty information'
          ]
        },
        {
          id: 8,
          title: 'Present Proposal',
          description: 'Review proposal with decision makers',
          action: 'Present Proposal',
          icon: 'Users',
          estimated: '1 hour',
          points: 60,
          tips: [
            'Walk through each section thoroughly',
            'Address questions and concerns',
            'Discuss next steps and timeline'
          ]
        },
        {
          id: 9,
          title: 'Follow Up',
          description: 'Follow up on proposal and address any questions',
          action: 'Follow Up',
          icon: 'Clock',
          estimated: '15 min',
          points: 20,
          tips: [
            'Follow up within 48 hours',
            'Be prepared to negotiate terms',
            'Offer to provide additional information'
          ]
        }
      ]
    };

    return workflows?.[stage] || workflows?.['prospecting'];
  };

  const workflowSteps = getWorkflowSteps(currentOpportunity?.stage || 'prospecting');
  const completedSteps = workflowSteps?.filter(step => step?.completed)?.length;
  const totalPoints = workflowSteps?.reduce((sum, step) => sum + (step?.completed ? step?.points : 0), 0);

  const handleCompleteStep = (step) => {
    onCompleteStep({
      stepId: step?.id,
      opportunityId: currentOpportunity?.id,
      points: step?.points,
      action: step?.action
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Route" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Guided Workflow</h2>
          <p className="text-sm text-muted-foreground">
            {currentOpportunity ? `${currentOpportunity?.account} - ${currentOpportunity?.stage}` : 'Select an opportunity to see workflow'}
          </p>
        </div>
      </div>
      {!currentOpportunity ? (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="Target" size={48} className="mx-auto mb-3 opacity-50" />
          <p>Select an opportunity from your pipeline to see guided workflow steps</p>
          <Button variant="outline" size="sm" className="mt-3">
            View Pipeline
          </Button>
        </div>
      ) : (
        <>
          {/* Progress Overview */}
          <div className="mb-6 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedSteps} of {workflowSteps?.length} steps completed
              </span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2 mb-3">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedSteps / workflowSteps?.length) * 100}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Points earned: {totalPoints} XP</span>
              <span className="text-primary font-medium">
                {workflowSteps?.length - completedSteps} steps remaining
              </span>
            </div>
          </div>

          {/* Workflow Steps */}
          <div className="space-y-3">
            {workflowSteps?.map((step, index) => {
              const isCompleted = step?.completed;
              const isCurrent = !isCompleted && index === completedSteps;
              const isExpanded = expandedStep === index;

              return (
                <div
                  key={step?.id}
                  className={`border rounded-lg transition-all ${
                    isCompleted 
                      ? 'border-accent bg-accent/5' 
                      : isCurrent 
                        ? 'border-primary bg-primary/5' :'border-border bg-background'
                  }`}
                >
                  <div
                    className="p-4 cursor-pointer"
                    onClick={() => setExpandedStep(isExpanded ? -1 : index)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isCompleted 
                          ? 'bg-accent text-white' 
                          : isCurrent 
                            ? 'bg-primary text-white' :'bg-muted text-muted-foreground'
                      }`}>
                        {isCompleted ? (
                          <Icon name="Check" size={20} />
                        ) : (
                          <Icon name={step?.icon} size={20} />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className={`font-medium ${
                            isCompleted ? 'text-accent' : isCurrent ? 'text-primary' : 'text-foreground'
                          }`}>
                            {step?.title}
                          </h3>
                          <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                            +{step?.points} XP
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{step?.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>⏱️ {step?.estimated}</span>
                          {isCompleted && <span>✅ Completed</span>}
                          {isCurrent && <span>🎯 Current Step</span>}
                        </div>
                      </div>
                      
                      <Icon 
                        name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                        size={20} 
                        color="var(--color-muted-foreground)" 
                      />
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-border/50">
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-foreground mb-2">💡 Tips for Success:</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {step?.tips?.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start space-x-2">
                              <span className="text-accent mt-1">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {!isCompleted && (
                        <div className="flex items-center space-x-3 mt-4 pt-3 border-t border-border/50">
                          <Button
                            variant="default"
                            size="sm"
                            iconName="Check"
                            iconPosition="left"
                            onClick={() => handleCompleteStep(step)}
                          >
                            {step?.action}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onSkipStep(step)}
                          >
                            Skip for Now
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Next Steps */}
          {completedSteps === workflowSteps?.length && (
            <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Trophy" size={20} color="var(--color-accent)" />
                <span className="font-medium text-accent">Workflow Complete!</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Great job! You've completed all workflow steps for this opportunity.
              </p>
              <Button variant="outline" size="sm" iconName="ArrowRight">
                Move to Next Stage
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WorkflowGuide;