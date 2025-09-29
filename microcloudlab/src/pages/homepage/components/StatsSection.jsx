import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

/**
 * @module StatsSection
 */

/**
 * A section for the homepage that displays animated, live-updating statistics
 * about platform usage. It includes key metrics like active users, projects created,
 * and partner institutions, along with a mock real-time activity feed.
 *
 * @returns {JSX.Element} The rendered stats section component.
 */
const StatsSection = () => {
  const [stats, setStats] = useState({
    activeUsers: 0,
    projectsToday: 0,
    microcontrollers: 0,
    institutions: 0
  });

  const finalStats = {
    activeUsers: 2847,
    projectsToday: 156,
    microcontrollers: 24,
    institutions: 89
  };

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const intervals = Object.keys(finalStats).map(key => {
      const increment = finalStats[key] / steps;
      let currentValue = 0;
      
      return setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalStats[key]) {
          currentValue = finalStats[key];
          clearInterval(intervals.find(interval => interval === this));
        }
        setStats(prev => ({
          ...prev,
          [key]: Math.floor(currentValue)
        }));
      }, stepDuration);
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }, []);

  const statItems = [
    {
      icon: "Users",
      value: stats.activeUsers.toLocaleString(),
      label: "Active Developers",
      sublabel: "Coding right now",
      color: "accent",
      bgColor: "accent/10"
    },
    {
      icon: "Folder",
      value: stats.projectsToday.toLocaleString(),
      label: "Projects Created",
      sublabel: "In the last 24 hours",
      color: "primary",
      bgColor: "primary/10"
    },
    {
      icon: "Cpu",
      value: stats.microcontrollers.toLocaleString(),
      label: "Microcontroller Types",
      sublabel: "Available in cloud",
      color: "conversion",
      bgColor: "conversion/10"
    },
    {
      icon: "GraduationCap",
      value: stats.institutions.toLocaleString(),
      label: "Educational Partners",
      sublabel: "Universities & schools",
      color: "success",
      bgColor: "success/10"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-surface to-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-primary rounded-full pulse-glow"></div>
            <span>Live Platform Statistics</span>
          </div>
          <h2 className="text-3xl font-headline text-text-primary mb-4">
            Powering Innovation Worldwide
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Join thousands of developers, educators, and students who are revolutionizing embedded development with cloud-based hardware access.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((stat, index) => (
            <div 
              key={index}
              className="bg-background rounded-2xl p-6 shadow-brand border border-border hover:shadow-lg transition-smooth group"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`w-16 h-16 bg-${stat.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-smooth`}>
                  <Icon name={stat.icon} size={24} className={`text-${stat.color}`} />
                </div>
                
                <div className="space-y-1">
                  <div className={`text-3xl font-headline text-${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-text-primary">
                    {stat.label}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {stat.sublabel}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real-time Activity Feed */}
        <div className="mt-12 bg-background rounded-2xl p-6 shadow-brand border border-border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                <Icon name="Activity" size={16} className="text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Live Activity</h3>
                <p className="text-sm text-text-secondary">Real-time platform usage</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full pulse-glow"></div>
              <span className="text-sm text-accent font-medium">Live</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Code Compilations</span>
                <span className="text-sm font-semibold text-text-primary">1,247/hr</span>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{width: '78%'}}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Hardware Connections</span>
                <span className="text-sm font-semibold text-text-primary">892/hr</span>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{width: '65%'}}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Project Deployments</span>
                <span className="text-sm font-semibold text-text-primary">234/hr</span>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{width: '45%'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Usage Map Indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-6 bg-surface rounded-full px-6 py-3">
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={16} className="text-primary" />
              <span className="text-sm text-text-secondary">Active in</span>
              <span className="text-sm font-semibold text-primary">47 countries</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-success" />
              <span className="text-sm text-text-secondary">24/7 uptime</span>
              <span className="text-sm font-semibold text-success">99.9%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;