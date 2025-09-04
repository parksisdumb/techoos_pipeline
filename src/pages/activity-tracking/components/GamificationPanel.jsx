import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GamificationPanel = ({ userStats, achievements, onViewLeaderboard }) => {
  const progressPercentage = (userStats?.currentPoints / userStats?.nextLevelPoints) * 100;
  
  const getAchievementIcon = (type) => {
    const icons = {
      calls: 'Phone',
      emails: 'Mail',
      visits: 'MapPin',
      streak: 'Flame',
      revenue: 'DollarSign',
      conversion: 'Target'
    };
    return icons?.[type] || 'Award';
  };

  const getAchievementColor = (rarity) => {
    const colors = {
      bronze: 'text-amber-600 bg-amber-50 border-amber-200',
      silver: 'text-slate-600 bg-slate-50 border-slate-200',
      gold: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      platinum: 'text-purple-600 bg-purple-50 border-purple-200'
    };
    return colors?.[rarity] || 'text-muted-foreground bg-muted border-border';
  };

  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Trophy" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Level {userStats?.level}</h3>
            <p className="text-sm text-muted-foreground">{userStats?.title}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress to Level {userStats?.level + 1}</span>
            <span className="font-medium text-foreground">
              {userStats?.currentPoints} / {userStats?.nextLevelPoints} XP
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className="bg-accent h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{userStats?.totalActivities}</div>
            <div className="text-xs text-muted-foreground">Total Activities</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{userStats?.weeklyStreak}</div>
            <div className="text-xs text-muted-foreground">Week Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{userStats?.rank}</div>
            <div className="text-xs text-muted-foreground">Team Rank</div>
          </div>
        </div>
      </div>
      {/* Daily Goals */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Daily Goals</h3>
          <span className="text-sm text-muted-foreground">
            {userStats?.dailyGoals?.completed} / {userStats?.dailyGoals?.total} completed
          </span>
        </div>

        <div className="space-y-4">
          {userStats?.dailyGoals?.goals?.map((goal) => {
            const progress = (goal?.current / goal?.target) * 100;
            const isCompleted = goal?.current >= goal?.target;

            return (
              <div key={goal?.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getAchievementIcon(goal?.type)} 
                      size={16} 
                      color={isCompleted ? "var(--color-accent)" : "var(--color-muted-foreground)"} 
                    />
                    <span className={`text-sm font-medium ${
                      isCompleted ? 'text-accent' : 'text-foreground'
                    }`}>
                      {goal?.title}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {goal?.current} / {goal?.target}
                    </span>
                    {isCompleted && (
                      <Icon name="CheckCircle" size={16} color="var(--color-accent)" />
                    )}
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isCompleted ? 'bg-accent' : 'bg-primary'
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  +{goal?.points} XP when completed
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Recent Achievements */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Achievements</h3>
          <Button variant="ghost" size="sm" iconName="ExternalLink">
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {achievements?.slice(0, 3)?.map((achievement) => (
            <div
              key={achievement?.id}
              className={`p-3 rounded-lg border ${getAchievementColor(achievement?.rarity)}`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-current/10">
                  <Icon name={getAchievementIcon(achievement?.type)} size={16} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{achievement?.title}</div>
                  <div className="text-xs opacity-80">{achievement?.description}</div>
                </div>
                <div className="text-xs font-medium">+{achievement?.points} XP</div>
              </div>
            </div>
          ))}
        </div>

        {achievements?.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <Icon name="Award" size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Complete activities to earn achievements!</p>
          </div>
        )}
      </div>
      {/* Leaderboard Preview */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Team Leaderboard</h3>
          <Button 
            variant="outline" 
            size="sm" 
            iconName="Users"
            onClick={onViewLeaderboard}
          >
            View Full
          </Button>
        </div>

        <div className="space-y-3">
          {userStats?.leaderboard?.slice(0, 5)?.map((user, index) => (
            <div
              key={user?.id}
              className={`flex items-center space-x-3 p-2 rounded-lg ${
                user?.isCurrentUser ? 'bg-primary/5 border border-primary/20' : 'hover:bg-muted/50'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                index === 0 ? 'bg-yellow-100 text-yellow-800' :
                index === 1 ? 'bg-slate-100 text-slate-800' :
                index === 2 ? 'bg-amber-100 text-amber-800': 'bg-muted text-muted-foreground'
              }`}>
                {index + 1}
              </div>
              
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="var(--color-primary)" />
              </div>
              
              <div className="flex-1">
                <div className={`text-sm font-medium ${
                  user?.isCurrentUser ? 'text-primary' : 'text-foreground'
                }`}>
                  {user?.name} {user?.isCurrentUser && '(You)'}
                </div>
                <div className="text-xs text-muted-foreground">{user?.title}</div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-bold text-foreground">{user?.points}</div>
                <div className="text-xs text-muted-foreground">XP</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamificationPanel;