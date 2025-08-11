import React from 'react';
import Icon from '../../../../components/AppIcon';

const QuickStatsOverview = ({ stats }) => {
  // Calculate dynamic stats if not provided
  const dynamicStats = stats || {
    total: 0,
    configured: 0,
    available: 0,
    avgCompleteness: 0
  };

  const statsData = [
    {
      id: 'configured',
      label: 'Configured',
      value: dynamicStats.configured,
      total: dynamicStats.total,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'available',
      label: 'Available',
      value: dynamicStats.available,
      total: dynamicStats.total,
      icon: 'Circle',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted'
    },
    {
      id: 'completeness',
      label: 'Avg Complete',
      value: dynamicStats.avgCompleteness,
      total: 100,
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'total',
      label: 'Total Peripherals',
      value: dynamicStats.total,
      total: dynamicStats.total,
      icon: 'Cpu',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  const getPercentage = (value, total) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  const getProgressColor = (statId, percentage) => {
    if (statId === 'configured') return 'bg-success';
    if (statId === 'available') return 'bg-muted-foreground';
    if (statId === 'completeness') {
      return percentage >= 80 ? 'bg-success' : percentage >= 40 ? 'bg-warning' : 'bg-error';
    }
    return 'bg-primary';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-heading-sm font-heading">Configuration Overview</h2>
        <Icon name="BarChart3" size={16} className="text-muted-foreground" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => {
          const percentage = getPercentage(stat.value, stat.total);
          return (
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
                  {stat.id !== 'completeness' && (
                    <span className="text-caption text-muted-foreground">/ {stat.total}</span>
                  )}
                  {stat.id === 'completeness' && (
                    <span className="text-caption text-muted-foreground">%</span>
                  )}
                </div>
                
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all ${getProgressColor(stat.id, percentage)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                
                <span className="text-caption text-muted-foreground">
                  {percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-body-sm">
          <span className="text-muted-foreground">Last updated</span>
          <span className="font-medium">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default QuickStatsOverview;