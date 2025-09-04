import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import PerformanceCard from './components/PerformanceCard';
import ActivityPanel from './components/ActivityPanel';
import OpportunityUpdates from './components/OpportunityUpdates';
import GamificationPanel from './components/GamificationPanel';
import QuickActions from './components/QuickActions';
import ActivityChart from './components/ActivityChart';
import PipelineChart from './components/PipelineChart';

const SalesDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const performanceData = [
    {
      title: 'Pipeline Value',
      value: '$890,000',
      subtitle: 'Active opportunities',
      icon: 'TrendingUp',
      trend: 'up',
      trendValue: '+12.5%',
      color: 'primary'
    },
    {
      title: 'Monthly Activities',
      value: '87%',
      subtitle: '135 of 155 completed',
      icon: 'Target',
      trend: 'up',
      trendValue: '+5.2%',
      color: 'success'
    },
    {
      title: 'Leaderboard Position',
      value: '#3',
      subtitle: 'of 24 team members',
      icon: 'Medal',
      trend: 'up',
      trendValue: '+1 rank',
      color: 'accent'
    },
    {
      title: 'Deals Closed',
      value: '8',
      subtitle: 'This month',
      icon: 'Award',
      trend: 'up',
      trendValue: '+2 deals',
      color: 'warning'
    }
  ];

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Welcome back, Sarah!</h1>
                <p className="text-muted-foreground mt-1">
                  {formatDate(currentTime)} • {formatTime(currentTime)}
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground">Live data updates active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {performanceData?.map((card, index) => (
              <PerformanceCard
                key={index}
                title={card?.title}
                value={card?.value}
                subtitle={card?.subtitle}
                icon={card?.icon}
                trend={card?.trend}
                trendValue={card?.trendValue}
                color={card?.color}
              />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Activities */}
            <div className="lg:col-span-1">
              <ActivityPanel />
            </div>

            {/* Right Column - Opportunities */}
            <div className="lg:col-span-2">
              <OpportunityUpdates />
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            <ActivityChart />
            <PipelineChart />
          </div>

          {/* Gamification Panel */}
          <div className="max-w-md mx-auto lg:max-w-none">
            <GamificationPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SalesDashboard;