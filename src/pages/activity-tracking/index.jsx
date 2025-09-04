import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ActivityForm from './components/ActivityForm';
import ActivityCalendar from './components/ActivityCalendar';
import ActivityHistory from './components/ActivityHistory';
import GamificationPanel from './components/GamificationPanel';
import QuickActions from './components/QuickActions';
import WorkflowGuide from './components/WorkflowGuide';
import Icon from '../../components/AppIcon';


const ActivityTracking = () => {
  const [activeTab, setActiveTab] = useState('log');
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showAchievementToast, setShowAchievementToast] = useState(false);
  const [recentAchievement, setRecentAchievement] = useState(null);

  // Mock data
  const mockAccounts = [
    { id: 'acc1', name: 'ABC Manufacturing Corp', industry: 'Manufacturing' },
    { id: 'acc2', name: 'XYZ Logistics Center', industry: 'Logistics' },
    { id: 'acc3', name: 'Metro Shopping Plaza', industry: 'Retail' },
    { id: 'acc4', name: 'TechHub Office Complex', industry: 'Technology' },
    { id: 'acc5', name: 'Green Valley Warehouse', industry: 'Distribution' }
  ];

  const mockContacts = [
    { id: 'con1', accountId: 'acc1', name: 'John Smith', title: 'Facilities Manager' },
    { id: 'con2', accountId: 'acc1', name: 'Sarah Johnson', title: 'Operations Director' },
    { id: 'con3', accountId: 'acc2', name: 'Mike Wilson', title: 'Property Manager' },
    { id: 'con4', accountId: 'acc3', name: 'Lisa Chen', title: 'Maintenance Supervisor' },
    { id: 'con5', accountId: 'acc4', name: 'David Brown', title: 'Facility Director' }
  ];

  const [activities, setActivities] = useState([
    {
      id: 'act1',
      type: 'call',
      account: 'ABC Manufacturing Corp',
      contact: 'John Smith',
      date: new Date('2025-01-03T10:30:00'),
      duration: 45,
      outcome: 'positive',
      notes: `Discussed upcoming roof replacement project for their main facility. John mentioned they've been experiencing leaks in the northeast section and are looking for a comprehensive solution.\n\nKey points covered:\n• Current roof is 15 years old, modified bitumen\n• Budget approved for $150K-200K range\n• Timeline flexible, prefer completion before winter\n• Decision committee includes John, Sarah (Ops Director), and CFO`,
      nextSteps: 'Schedule site inspection for next week',
      points: 25
    },
    {
      id: 'act2',type: 'email',account: 'XYZ Logistics Center',contact: 'Mike Wilson',date: new Date('2025-01-03T14:15:00'),duration: 15,outcome: 'neutral',
      notes: `Sent follow-up email with preventive maintenance program details. Mike requested information about our quarterly inspection services and emergency response capabilities.\n\nEmail included:\n• Maintenance program overview\n• Service level agreements\n• Emergency response procedures\n• Pricing structure for different service tiers`,
      nextSteps: 'Follow up in 3 days if no response',
      points: 15
    },
    {
      id: 'act3',type: 'site_visit',account: 'Metro Shopping Plaza',contact: 'Lisa Chen',date: new Date('2025-01-02T09:00:00'),duration: 120,outcome: 'proposal_sent',
      notes: `Conducted comprehensive roof inspection of the shopping plaza. Identified several areas requiring immediate attention and provided preliminary recommendations.\n\nFindings:\n• Multiple membrane punctures near HVAC units\n• Ponding water in low-lying areas\n• Deteriorated flashing around perimeter\n• Overall structure in good condition\n\nRecommended immediate repairs plus 5-year maintenance plan.`,
      nextSteps: 'Send detailed proposal by Friday',
      points: 50
    },
    {
      id: 'act4',type: 'follow_up',account: 'TechHub Office Complex',contact: 'David Brown',date: new Date('2025-01-02T16:30:00'),duration: 20,outcome: 'meeting_scheduled',
      notes: `Follow-up call regarding the proposal sent last week. David appreciated the detailed breakdown and wants to schedule a meeting with the building owner to review options.\n\nDiscussion points:\n• Proposal well-received, especially energy-efficient options\n• Building owner available next Tuesday for presentation\n• Requested additional warranty information\n• Interested in financing options`,
      nextSteps: 'Prepare presentation for building owner meeting',
      points: 30
    },
    {
      id: 'act5',type: 'proposal',account: 'Green Valley Warehouse',contact: 'Tom Anderson',date: new Date('2025-01-01T11:00:00'),duration: 90,outcome: 'callback',
      notes: `Presented comprehensive roofing solution proposal for their 50,000 sq ft warehouse facility. Covered three different options ranging from basic repairs to complete system upgrade.\n\nProposal options:\n• Option 1: Critical repairs only ($45K)\n• Option 2: Partial replacement with 10-year warranty ($85K)\n• Option 3: Complete system upgrade with 20-year warranty ($125K)\n\nTom needs to discuss with ownership group and will call back by Wednesday.`,
      nextSteps: 'Wait for callback, follow up Wednesday if needed',
      points: 40
    }
  ]);

  const [scheduledActivities] = useState([
    {
      id: 'sched1',
      type: 'call',
      title: 'Follow-up call with ABC Manufacturing',
      account: 'ABC Manufacturing Corp',
      scheduledDate: new Date('2025-01-06T10:00:00'),
      notes: 'Discuss site inspection results and next steps'
    },
    {
      id: 'sched2',
      type: 'site_visit',
      title: 'Site inspection at ABC Manufacturing',
      account: 'ABC Manufacturing Corp',
      scheduledDate: new Date('2025-01-07T14:00:00'),
      notes: 'Comprehensive roof assessment'
    },
    {
      id: 'sched3',
      type: 'meeting',
      title: 'Proposal presentation at TechHub',
      account: 'TechHub Office Complex',
      scheduledDate: new Date('2025-01-08T15:00:00'),
      notes: 'Present to building owner and decision committee'
    },
    {
      id: 'sched4',
      type: 'follow_up',
      title: 'Check in with Green Valley Warehouse',
      account: 'Green Valley Warehouse',
      scheduledDate: new Date('2025-01-09T11:00:00'),
      notes: 'Follow up on proposal decision'
    }
  ]);

  const [userStats] = useState({
    level: 8,
    title: 'Senior Sales Professional',
    currentPoints: 2340,
    nextLevelPoints: 2500,
    totalActivities: 156,
    weeklyStreak: 5,
    rank: 3,
    dailyGoals: {
      completed: 2,
      total: 4,
      goals: [
        { id: 1, type: 'calls', title: 'Make 5 calls', current: 5, target: 5, points: 25 },
        { id: 2, type: 'emails', title: 'Send 3 emails', current: 3, target: 3, points: 15 },
        { id: 3, type: 'visits', title: 'Complete 1 site visit', current: 0, target: 1, points: 50 },
        { id: 4, type: 'follow_up', title: 'Log 2 follow-ups', current: 1, target: 2, points: 20 }
      ]
    },
    leaderboard: [
      { id: 1, name: 'Mike Rodriguez', title: 'Senior Sales Rep', points: 3250, isCurrentUser: false },
      { id: 2, name: 'Jennifer Walsh', title: 'Sales Manager', points: 2890, isCurrentUser: false },
      { id: 3, name: 'Sarah Johnson', title: 'Sales Rep', points: 2340, isCurrentUser: true },
      { id: 4, name: 'Tom Bradley', title: 'Business Dev Rep', points: 2180, isCurrentUser: false },
      { id: 5, name: 'Lisa Martinez', title: 'Sales Rep', points: 1950, isCurrentUser: false }
    ]
  });

  const [achievements] = useState([
    {
      id: 1,
      type: 'calls',
      title: 'Call Champion',
      description: 'Made 50 successful calls this month',
      rarity: 'gold',
      points: 100,
      unlockedAt: new Date('2025-01-03T16:00:00')
    },
    {
      id: 2,
      type: 'streak',
      title: 'Consistency King',
      description: 'Maintained 5-day activity streak',
      rarity: 'silver',
      points: 75,
      unlockedAt: new Date('2025-01-02T18:00:00')
    },
    {
      id: 3,
      type: 'revenue',
      title: 'Pipeline Builder',
      description: 'Added $100K+ to pipeline this quarter',
      rarity: 'platinum',
      points: 200,
      unlockedAt: new Date('2025-01-01T12:00:00')
    }
  ]);

  const [currentOpportunity] = useState({
    id: 'opp1',
    account: 'ABC Manufacturing Corp',
    stage: 'qualified',
    value: 175000,
    probability: 75
  });

  const tabs = [
    { id: 'log', label: 'Log Activity', icon: 'Plus' },
    { id: 'calendar', label: 'Calendar', icon: 'Calendar' },
    { id: 'history', label: 'History', icon: 'History' },
    { id: 'workflow', label: 'Workflow', icon: 'Route' }
  ];

  useEffect(() => {
    // Simulate achievement unlock
    const timer = setTimeout(() => {
      if (activities?.length > 0) {
        const newAchievement = {
          title: 'Activity Logger',
          description: 'Logged your first activity today!',
          points: 25
        };
        setRecentAchievement(newAchievement);
        setShowAchievementToast(true);
        
        setTimeout(() => setShowAchievementToast(false), 5000);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [activities?.length]);

  const handleActivitySubmit = (activityData) => {
    const newActivity = {
      id: `act${Date.now()}`,
      ...activityData,
      date: new Date(),
      points: getActivityPoints(activityData?.type)
    };

    setActivities(prev => [newActivity, ...prev]);
    
    // Show achievement toast
    const achievement = {
      title: 'Activity Logged!',
      description: `+${newActivity?.points} XP earned`,
      points: newActivity?.points
    };
    setRecentAchievement(achievement);
    setShowAchievementToast(true);
    setTimeout(() => setShowAchievementToast(false), 3000);
  };

  const getActivityPoints = (type) => {
    const points = {
      call: 25,
      email: 15,
      site_visit: 50,
      follow_up: 20,
      proposal: 40,
      meeting: 35
    };
    return points?.[type] || 10;
  };

  const handleReschedule = (activity) => {
    console.log('Rescheduling activity:', activity);
    // Implementation for rescheduling
  };

  const handleQuickAction = (action) => {
    console.log('Quick action:', action);
    // Implementation for quick actions
  };

  const handleScheduleFollowup = (data) => {
    console.log('Scheduling follow-up:', data);
    // Implementation for scheduling follow-up
  };

  const handleSendTemplate = (data) => {
    console.log('Sending template:', data);
    // Implementation for sending template
  };

  const handleSetReminder = (data) => {
    console.log('Setting reminder:', data);
    // Implementation for setting reminder
  };

  const handleCompleteStep = (data) => {
    console.log('Completing workflow step:', data);
    // Implementation for completing workflow step
  };

  const handleSkipStep = (step) => {
    console.log('Skipping workflow step:', step);
    // Implementation for skipping workflow step
  };

  const handleEditActivity = (activity) => {
    console.log('Editing activity:', activity);
    // Implementation for editing activity
  };

  const handleDeleteActivity = (activity) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      setActivities(prev => prev?.filter(a => a?.id !== activity?.id));
    }
  };

  const handleViewLeaderboard = () => {
    console.log('Viewing full leaderboard');
    // Implementation for viewing full leaderboard
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Activity" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Activity Tracking</h1>
                <p className="text-muted-foreground">Log, schedule, and monitor customer interactions</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} color="var(--color-primary)" />
                  <span className="text-sm font-medium text-foreground">Today</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-1">3</div>
                <div className="text-xs text-muted-foreground">Activities logged</div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} color="var(--color-accent)" />
                  <span className="text-sm font-medium text-foreground">This Week</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-1">12</div>
                <div className="text-xs text-muted-foreground">Activities completed</div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Target" size={16} color="var(--color-warning)" />
                  <span className="text-sm font-medium text-foreground">Goals</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-1">2/4</div>
                <div className="text-xs text-muted-foreground">Daily goals met</div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Trophy" size={16} color="var(--color-secondary)" />
                  <span className="text-sm font-medium text-foreground">Points</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-1">2,340</div>
                <div className="text-xs text-muted-foreground">Total XP earned</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tab Navigation */}
              <div className="bg-card border border-border rounded-lg p-2">
                <div className="flex space-x-1">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab?.id
                          ? 'bg-primary text-white' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span className="hidden sm:inline">{tab?.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'log' && (
                <ActivityForm
                  onSubmit={handleActivitySubmit}
                  accounts={mockAccounts}
                  contacts={mockContacts}
                />
              )}

              {activeTab === 'calendar' && (
                <ActivityCalendar
                  activities={scheduledActivities}
                  onReschedule={handleReschedule}
                  onQuickAction={handleQuickAction}
                />
              )}

              {activeTab === 'history' && (
                <ActivityHistory
                  activities={activities}
                  onEdit={handleEditActivity}
                  onDelete={handleDeleteActivity}
                />
              )}

              {activeTab === 'workflow' && (
                <WorkflowGuide
                  currentOpportunity={currentOpportunity}
                  onCompleteStep={handleCompleteStep}
                  onSkipStep={handleSkipStep}
                />
              )}

              {/* Quick Actions */}
              <QuickActions
                accounts={mockAccounts}
                onScheduleFollowup={handleScheduleFollowup}
                onSendTemplate={handleSendTemplate}
                onSetReminder={handleSetReminder}
              />
            </div>

            {/* Right Column - Gamification */}
            <div className="space-y-8">
              <GamificationPanel
                userStats={userStats}
                achievements={achievements}
                onViewLeaderboard={handleViewLeaderboard}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Achievement Toast */}
      {showAchievementToast && recentAchievement && (
        <div className="fixed top-20 right-4 z-50 achievement-toast animate-slide-in">
          <div className="bg-accent text-white p-4 rounded-lg shadow-elevation-4 max-w-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Icon name="Trophy" size={20} />
              </div>
              <div>
                <div className="font-medium">{recentAchievement?.title}</div>
                <div className="text-sm opacity-90">{recentAchievement?.description}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityTracking;