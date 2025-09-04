import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ActivityChart = () => {
  const weeklyData = [
    { day: 'Mon', calls: 8, emails: 12, meetings: 3, total: 23 },
    { day: 'Tue', calls: 6, emails: 15, meetings: 2, total: 23 },
    { day: 'Wed', calls: 10, emails: 8, meetings: 4, total: 22 },
    { day: 'Thu', calls: 12, emails: 10, meetings: 5, total: 27 },
    { day: 'Fri', calls: 9, emails: 14, meetings: 3, total: 26 },
    { day: 'Sat', calls: 4, emails: 6, meetings: 1, total: 11 },
    { day: 'Sun', calls: 2, emails: 3, meetings: 0, total: 5 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-3">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.dataKey}: ${entry?.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Weekly Activity Trends</h2>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Calls</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-muted-foreground">Emails</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">Meetings</span>
          </div>
        </div>
      </div>

      <div className="w-full h-64" aria-label="Weekly Activity Trends Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="day" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="calls" 
              fill="var(--color-primary)" 
              radius={[2, 2, 0, 0]}
              name="Calls"
            />
            <Bar 
              dataKey="emails" 
              fill="var(--color-accent)" 
              radius={[2, 2, 0, 0]}
              name="Emails"
            />
            <Bar 
              dataKey="meetings" 
              fill="var(--color-warning)" 
              radius={[2, 2, 0, 0]}
              name="Meetings"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-primary/5 rounded-lg">
          <div className="text-lg font-bold text-primary">49</div>
          <div className="text-xs text-muted-foreground">Total Calls</div>
        </div>
        <div className="p-3 bg-accent/5 rounded-lg">
          <div className="text-lg font-bold text-accent">68</div>
          <div className="text-xs text-muted-foreground">Total Emails</div>
        </div>
        <div className="p-3 bg-warning/5 rounded-lg">
          <div className="text-lg font-bold text-warning">18</div>
          <div className="text-xs text-muted-foreground">Total Meetings</div>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;