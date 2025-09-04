import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GamificationPanel = () => {
  const currentUser = {
    name: 'Sarah Johnson',
    level: 12,
    currentPoints: 2850,
    nextLevelPoints: 3000,
    rank: 3,
    totalUsers: 24
  };

  const badges = [
    {
      id: 1,
      name: 'Pipeline Master',
      description: 'Maintained $500K+ pipeline for 3 months',
      icon: 'Trophy',
      earned: true,
      earnedDate: '2025-08-15'
    },
    {
      id: 2,
      name: 'Activity Champion',
      description: 'Completed 100+ activities this month',
      icon: 'Target',
      earned: true,
      earnedDate: '2025-08-28'
    },
    {
      id: 3,
      name: 'Deal Closer',
      description: 'Closed 5 deals in a single month',
      icon: 'Award',
      earned: true,
      earnedDate: '2025-08-20'
    },
    {
      id: 4,
      name: 'Networking Pro',
      description: 'Added 50+ new contacts',
      icon: 'Users',
      earned: false,
      progress: 38,
      total: 50
    }
  ];

  const recentAchievements = [
    {
      id: 1,
      title: 'Activity Streak!',
      description: 'Completed activities for 7 days straight',
      points: 100,
      time: '2 hours ago'
    },
    {
      id: 2,
      title: 'Big Deal Alert!',
      description: 'Closed $125K Metro Construction deal',
      points: 250,
      time: '1 day ago'
    }
  ];

  const progressPercentage = (currentUser?.currentPoints / currentUser?.nextLevelPoints) * 100;

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Your Performance</h2>
        <Button variant="ghost" size="sm" iconName="Trophy" iconPosition="left">
          Leaderboard
        </Button>
      </div>
      {/* Level Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Star" size={16} color="var(--color-primary)" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">Level {currentUser?.level}</div>
              <div className="text-xs text-muted-foreground">Sales Professional</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-foreground">{currentUser?.currentPoints} pts</div>
            <div className="text-xs text-muted-foreground">{currentUser?.nextLevelPoints - currentUser?.currentPoints} to next level</div>
          </div>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary rounded-full h-2 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      {/* Rank */}
      <div className="flex items-center justify-between mb-6 p-3 bg-accent/5 rounded-lg border border-accent/20">
        <div className="flex items-center space-x-2">
          <Icon name="Medal" size={20} color="var(--color-accent)" />
          <div>
            <div className="text-sm font-medium text-foreground">Current Rank</div>
            <div className="text-xs text-muted-foreground">Team Performance</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-accent">#{currentUser?.rank}</div>
          <div className="text-xs text-muted-foreground">of {currentUser?.totalUsers}</div>
        </div>
      </div>
      {/* Badges */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Recent Badges</h3>
        <div className="grid grid-cols-2 gap-3">
          {badges?.slice(0, 4)?.map((badge) => (
            <div 
              key={badge?.id} 
              className={`p-3 rounded-lg border transition-all ${
                badge?.earned 
                  ? 'bg-success/5 border-success/20 hover:bg-success/10' :'bg-muted/30 border-border hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Icon 
                  name={badge?.icon} 
                  size={16} 
                  color={badge?.earned ? 'var(--color-success)' : 'var(--color-muted-foreground)'} 
                />
                <span className={`text-xs font-medium ${
                  badge?.earned ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {badge?.name}
                </span>
              </div>
              
              {!badge?.earned && badge?.progress && (
                <div className="w-full bg-muted rounded-full h-1">
                  <div 
                    className="bg-primary rounded-full h-1 transition-all duration-300"
                    style={{ width: `${(badge?.progress / badge?.total) * 100}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Recent Achievements */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Recent Achievements</h3>
        <div className="space-y-3">
          {recentAchievements?.map((achievement) => (
            <div key={achievement?.id} className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Zap" size={16} color="var(--color-primary)" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground">{achievement?.title}</h4>
                  <span className="text-sm font-semibold text-primary">+{achievement?.points} pts</span>
                </div>
                <p className="text-xs text-muted-foreground">{achievement?.description}</p>
                <span className="text-xs text-muted-foreground">{achievement?.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-4 border-t border-border">
        <Button variant="outline" fullWidth iconName="Target" iconPosition="left">
          View All Achievements
        </Button>
      </div>
    </div>
  );
};

export default GamificationPanel;