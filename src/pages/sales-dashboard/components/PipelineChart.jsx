import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PipelineChart = () => {
  const pipelineData = [
    { month: 'Jan', value: 450000, deals: 12, avgDeal: 37500 },
    { month: 'Feb', value: 520000, deals: 15, avgDeal: 34667 },
    { month: 'Mar', value: 480000, deals: 13, avgDeal: 36923 },
    { month: 'Apr', value: 650000, deals: 18, avgDeal: 36111 },
    { month: 'May', value: 720000, deals: 20, avgDeal: 36000 },
    { month: 'Jun', value: 680000, deals: 19, avgDeal: 35789 },
    { month: 'Jul', value: 750000, deals: 22, avgDeal: 34091 },
    { month: 'Aug', value: 820000, deals: 24, avgDeal: 34167 },
    { month: 'Sep', value: 890000, deals: 26, avgDeal: 34231 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-3">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <p className="text-sm text-primary">
            Pipeline Value: ${data?.value?.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">
            Active Deals: {data?.deals}
          </p>
          <p className="text-sm text-muted-foreground">
            Avg Deal Size: ${data?.avgDeal?.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const currentValue = pipelineData?.[pipelineData?.length - 1]?.value;
  const previousValue = pipelineData?.[pipelineData?.length - 2]?.value;
  const growth = ((currentValue - previousValue) / previousValue * 100)?.toFixed(1);

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Pipeline Progression</h2>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-2xl font-bold text-foreground">
              ${currentValue?.toLocaleString()}
            </span>
            <span className="text-sm font-medium text-success">
              +{growth}%
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Active Deals</div>
          <div className="text-xl font-bold text-foreground">
            {pipelineData?.[pipelineData?.length - 1]?.deals}
          </div>
        </div>
      </div>
      <div className="w-full h-64" aria-label="Pipeline Progression Line Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={pipelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000)?.toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-primary/5 rounded-lg">
          <div className="text-lg font-bold text-primary">
            ${(currentValue / pipelineData?.[pipelineData?.length - 1]?.deals)?.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">Avg Deal Size</div>
        </div>
        <div className="p-3 bg-success/5 rounded-lg">
          <div className="text-lg font-bold text-success">+{growth}%</div>
          <div className="text-xs text-muted-foreground">Monthly Growth</div>
        </div>
        <div className="p-3 bg-accent/5 rounded-lg">
          <div className="text-lg font-bold text-accent">
            ${((currentValue * 0.3) / 1000)?.toFixed(0)}K
          </div>
          <div className="text-xs text-muted-foreground">Expected Close</div>
        </div>
      </div>
    </div>
  );
};

export default PipelineChart;