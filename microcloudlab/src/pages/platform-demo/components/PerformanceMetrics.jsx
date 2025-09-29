import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ isRunning, selectedProject }) => {
  const [metrics, setMetrics] = useState({
    compilationTime: 0,
    executionSpeed: 0,
    memoryUsage: 0,
    cpuUsage: 0,
    networkLatency: 0,
    uptime: 0
  });

  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    if (isRunning && selectedProject) {
      const interval = setInterval(() => {
        updateMetrics();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning, selectedProject]);

  const updateMetrics = () => {
    const baseMetrics = getProjectBaseMetrics(selectedProject?.id);
    
    setMetrics(prev => ({
      compilationTime: baseMetrics.compilationTime + (Math.random() * 0.2 - 0.1),
      executionSpeed: baseMetrics.executionSpeed + (Math.random() * 10 - 5),
      memoryUsage: Math.min(100, baseMetrics.memoryUsage + (Math.random() * 5 - 2.5)),
      cpuUsage: Math.min(100, baseMetrics.cpuUsage + (Math.random() * 10 - 5)),
      networkLatency: baseMetrics.networkLatency + (Math.random() * 5 - 2.5),
      uptime: prev.uptime + 1
    }));

    setHistoricalData(prev => {
      const newData = [...prev, {
        timestamp: Date.now(),
        ...metrics
      }].slice(-20); // Keep last 20 data points
      return newData;
    });
  };

  const getProjectBaseMetrics = (projectId) => {
    switch (projectId) {
      case 'led-blink':
        return {
          compilationTime: 1.2,
          executionSpeed: 95,
          memoryUsage: 15,
          cpuUsage: 8,
          networkLatency: 12
        };
      case 'sensor-reading':
        return {
          compilationTime: 2.1,
          executionSpeed: 88,
          memoryUsage: 32,
          cpuUsage: 25,
          networkLatency: 15
        };
      case 'iot-connectivity':
        return {
          compilationTime: 3.4,
          executionSpeed: 82,
          memoryUsage: 58,
          cpuUsage: 45,
          networkLatency: 28
        };
      default:
        return {
          compilationTime: 0,
          executionSpeed: 0,
          memoryUsage: 0,
          cpuUsage: 0,
          networkLatency: 0
        };
    }
  };

  const formatUptime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const getStatusColor = (value, type) => {
    switch (type) {
      case 'good':
        return value > 80 ? 'text-success-400' : value > 60 ? 'text-warning-400' : 'text-error-400';
      case 'usage':
        return value < 30 ? 'text-success-400' : value < 70 ? 'text-warning-400' : 'text-error-400';
      case 'latency':
        return value < 20 ? 'text-success-400' : value < 50 ? 'text-warning-400' : 'text-error-400';
      default:
        return 'text-gray-200';
    }
  };

  const metricCards = [
    {
      title: 'Compilation Time',
      value: `${metrics.compilationTime.toFixed(1)}s`,
      icon: 'Clock',
      description: 'Cloud compilation',
      color: metrics.compilationTime < 2 ? 'text-success-400' : metrics.compilationTime < 5 ? 'text-warning-400' : 'text-error-400',
      trend: 'stable'
    },
    {
      title: 'Execution Speed',
      value: `${metrics.executionSpeed.toFixed(0)}%`,
      icon: 'Zap',
      description: 'Performance',
      color: getStatusColor(metrics.executionSpeed, 'good'),
      trend: 'up'
    },
    {
      title: 'Memory Usage',
      value: `${metrics.memoryUsage.toFixed(0)}%`,
      icon: 'HardDrive',
      description: 'RAM utilization',
      color: getStatusColor(metrics.memoryUsage, 'usage'),
      trend: 'stable'
    },
    {
      title: 'CPU Usage',
      value: `${metrics.cpuUsage.toFixed(0)}%`,
      icon: 'Cpu',
      description: 'Processor load',
      color: getStatusColor(metrics.cpuUsage, 'usage'),
      trend: 'down'
    },
    {
      title: 'Network Latency',
      value: `${metrics.networkLatency.toFixed(0)}ms`,
      icon: 'Wifi',
      description: 'Cloud connection',
      color: getStatusColor(metrics.networkLatency, 'latency'),
      trend: 'stable'
    },
    {
      title: 'Uptime',
      value: formatUptime(metrics.uptime),
      icon: 'ShieldCheck',
      description: 'Session duration',
      color: 'text-success-400',
      trend: 'up'
    }
  ];

  return (
    <div className="bg-surface/50 rounded-lg border border-border h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="font-semibold text-text-primary">Performance Metrics</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-success animate-pulse' : 'bg-gray-500'}`}></div>
          <span className="text-xs text-text-secondary font-medium">
            {isRunning ? 'Live' : 'Standby'}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {!isRunning ? (
          <div className="text-center py-12">
            <Icon name="BarChart3" size={36} className="text-text-secondary mx-auto mb-3 opacity-40" />
            <p className="text-text-secondary font-medium">Run a project</p>
            <p className="text-text-secondary text-sm">to see performance metrics</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {metricCards.map((metric, index) => (
              <div key={index} className="bg-surface rounded-md p-3 border border-border transform transition-transform hover:scale-105 hover:shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <Icon name={metric.icon} size={18} className="text-primary" />
                  <Icon
                    name={
                      metric.trend === 'up' ? 'TrendingUp' :
                      metric.trend === 'down' ? 'TrendingDown' : 'Minus'
                    }
                    size={14}
                    className={
                      metric.trend === 'up' ? 'text-success-400' :
                      metric.trend === 'down' ? 'text-error-400' : 'text-gray-500'
                    }
                  />
                </div>

                <div className={`text-xl font-bold ${metric.color} mb-0.5`}>
                  {metric.value}
                </div>

                <div className="text-xs text-text-primary font-semibold">
                  {metric.title}
                </div>

                <div className="text-2xs text-text-secondary mt-0.5">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* System Status */}
      {isRunning && (
        <div className="p-3 border-t border-border bg-background/50">
          <div className="flex items-center justify-between text-xs text-text-secondary font-medium">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Icon name="Server" size={14} className="text-success-400" />
                <span>Cloud: OK</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={14} className="text-success-400" />
                <span>Security: OK</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1.5">
              <Icon name="RefreshCw" size={12} className="text-primary animate-spin" />
              <span>Auto-refreshing</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMetrics;