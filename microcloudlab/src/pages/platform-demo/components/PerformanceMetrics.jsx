import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

/**
 * @module PerformanceMetrics
 */

/**
 * A component that displays real-time performance metrics for a running project.
 * It shows data such as compilation time, execution speed, memory usage, and more,
 * updating periodically when a project is active.
 *
 * @param {object} props - The properties for the component.
 * @param {boolean} props.isRunning - A flag indicating if a project is currently running.
 * @param {object|null} props.selectedProject - The currently selected project object, used to determine base metrics.
 * @returns {JSX.Element} The rendered performance metrics component.
 */
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
        return value > 80 ? 'text-success' : value > 60 ? 'text-warning' : 'text-error';
      case 'usage':
        return value < 30 ? 'text-success' : value < 70 ? 'text-warning' : 'text-error';
      case 'latency':
        return value < 20 ? 'text-success' : value < 50 ? 'text-warning' : 'text-error';
      default:
        return 'text-text-primary';
    }
  };

  const metricCards = [
    {
      title: 'Compilation Time',
      value: `${metrics.compilationTime.toFixed(1)}s`,
      icon: 'Clock',
      description: 'Cloud compilation speed',
      color: metrics.compilationTime < 2 ? 'text-success' : metrics.compilationTime < 5 ? 'text-warning' : 'text-error',
      trend: 'stable'
    },
    {
      title: 'Execution Speed',
      value: `${metrics.executionSpeed.toFixed(0)}%`,
      icon: 'Zap',
      description: 'Performance efficiency',
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
      description: 'Cloud connection speed',
      color: getStatusColor(metrics.networkLatency, 'latency'),
      trend: 'stable'
    },
    {
      title: 'Uptime',
      value: formatUptime(metrics.uptime),
      icon: 'Clock',
      description: 'Session duration',
      color: 'text-success',
      trend: 'up'
    }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={18} className="text-primary" />
          <h3 className="font-semibold text-text-primary">Performance Metrics</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-success pulse-glow' : 'bg-text-secondary'}`}></div>
          <span className="text-xs text-text-secondary">
            {isRunning ? 'Live Monitoring' : 'Standby'}
          </span>
        </div>
      </div>

      {!isRunning ? (
        <div className="text-center py-8">
          <Icon name="BarChart3" size={32} className="text-text-secondary mx-auto mb-2 opacity-50" />
          <p className="text-text-secondary">Run a project to see performance metrics</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {metricCards.map((metric, index) => (
            <div key={index} className="bg-background rounded-lg p-3 border border-border">
              <div className="flex items-center justify-between mb-2">
                <Icon name={metric.icon} size={16} className="text-primary" />
                <Icon 
                  name={
                    metric.trend === 'up' ? 'TrendingUp' : 
                    metric.trend === 'down' ? 'TrendingDown' : 'Minus'
                  } 
                  size={12} 
                  className={
                    metric.trend === 'up' ? 'text-success' : 
                    metric.trend === 'down' ? 'text-error' : 'text-text-secondary'
                  } 
                />
              </div>
              
              <div className={`text-lg font-semibold ${metric.color} mb-1`}>
                {metric.value}
              </div>
              
              <div className="text-xs text-text-secondary">
                {metric.title}
              </div>
              
              <div className="text-xs text-text-secondary mt-1 opacity-75">
                {metric.description}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* System Status */}
      {isRunning && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Server" size={12} className="text-success" />
                <span>Cloud Server: Online</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={12} className="text-success" />
                <span>Security: Active</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="RefreshCw" size={12} className="text-primary animate-spin" />
              <span>Auto-refresh: 1s</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMetrics;