import React from 'react';
import Icon from '../../../../components/AppIcon';

const QuickStatsOverview = () => {
  const stats = [
    {
      id: 'configured',
      label: 'Configured',
      value: 12,
      total: 52,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'partial',
      label: 'Partial Config',
      value: 8,
      total: 52,
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'conflicts',
      label: 'Conflicts',
      value: 3,
      total: 52,
      icon: 'XCircle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      id: 'pins_used',
      label: 'Pins Used',
      value: 24,
      total: 144,
      icon: 'Zap',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  const getPercentage = (value, total) => {
    return Math.round((value / total) * 100);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-heading-sm font-heading">Configuration Overview</h2>
        <Icon name="BarChart3" size={16} className="text-muted-foreground" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className={`flex items-center justify-center w-6 h-6 rounded ${stat.bgColor} ${stat.color}`}>
                <Icon name={stat.icon} size={12} />
              </div>
              <span className="text-caption text-muted-foreground">{stat.label}</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-baseline space-x-1">
                <span className="text-heading-lg font-heading">{stat.value}</span>
                <span className="text-caption text-muted-foreground">/ {stat.total}</span>
              </div>
              
              <div className="w-full bg-muted rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all ${
                    stat.id === 'configured' ? 'bg-success' :
                    stat.id === 'partial' ? 'bg-warning' :
                    stat.id === 'conflicts'? 'bg-error' : 'bg-accent'
                  }`}
                  style={{ width: `${getPercentage(stat.value, stat.total)}%` }}
                />
              </div>
              
              <span className="text-caption text-muted-foreground">
                {getPercentage(stat.value, stat.total)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-body-sm">
          <span className="text-muted-foreground">Last updated</span>
          <span className="font-medium">2 minutes ago</span>
        </div>
      </div>
    </div>
  );
};

export default QuickStatsOverview;