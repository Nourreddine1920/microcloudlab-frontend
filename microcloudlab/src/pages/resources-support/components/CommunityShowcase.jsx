import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CommunityShowcase = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projectCategories = [
    { id: 'all', name: 'All Projects', count: 156 },
    { id: 'iot', name: 'IoT Solutions', count: 45 },
    { id: 'robotics', name: 'Robotics', count: 32 },
    { id: 'automation', name: 'Home Automation', count: 28 },
    { id: 'sensors', name: 'Sensor Networks', count: 24 },
    { id: 'educational', name: 'Educational', count: 27 }
  ];

  const communityProjects = [
    {
      id: 1,
      title: "Smart Greenhouse Monitoring System",
      author: "Sarah Chen",
      authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      description: "Complete IoT solution for monitoring temperature, humidity, soil moisture, and light levels in greenhouse environments with automated irrigation control.",
      category: "iot",
      tags: ["ESP32", "Sensors", "MQTT", "Web Dashboard"],
      likes: 234,
      views: 1520,
      forks: 45,
      thumbnail: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
      difficulty: "Intermediate",
      lastUpdated: "2024-01-15",
      isNew: true
    },
    {
      id: 2,
      title: "Autonomous Line Following Robot",
      author: "Marcus Rodriguez",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      description: "Educational robotics project featuring PID control, obstacle avoidance, and remote monitoring capabilities using Arduino and various sensors.",
      category: "robotics",
      tags: ["Arduino", "Motors", "Sensors", "PID Control"],
      likes: 189,
      views: 980,
      forks: 32,
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
      difficulty: "Beginner",
      lastUpdated: "2024-01-12"
    },
    {
      id: 3,
      title: "Voice-Controlled Home Automation Hub",
      author: "Emily Watson",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      description: "Comprehensive home automation system with voice recognition, mobile app control, and integration with popular smart home platforms.",
      category: "automation",
      tags: ["ESP32", "Voice Recognition", "WiFi", "Mobile App"],
      likes: 312,
      views: 2100,
      forks: 67,
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      difficulty: "Advanced",
      lastUpdated: "2024-01-10"
    },
    {
      id: 4,
      title: "Environmental Monitoring Network",
      author: "David Kim",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      description: "Distributed sensor network for monitoring air quality, noise levels, and weather conditions across urban environments with real-time data visualization.",
      category: "sensors",
      tags: ["LoRaWAN", "Air Quality", "Data Logging", "Visualization"],
      likes: 156,
      views: 1200,
      forks: 28,
      thumbnail: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=400",
      difficulty: "Advanced",
      lastUpdated: "2024-01-08"
    },
    {
      id: 5,
      title: "Interactive LED Matrix Display",
      author: "Alex Thompson",
      authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      description: "Educational project demonstrating matrix control, animation programming, and wireless communication for creating dynamic visual displays.",
      category: "educational",
      tags: ["Arduino", "LED Matrix", "Animations", "Bluetooth"],
      likes: 98,
      views: 750,
      forks: 19,
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
      difficulty: "Beginner",
      lastUpdated: "2024-01-06"
    },
    {
      id: 6,
      title: "Smart Water Quality Monitor",
      author: "Lisa Park",
      authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      description: "IoT device for continuous monitoring of water pH, temperature, turbidity, and dissolved oxygen with cloud data storage and alerts.",
      category: "iot",
      tags: ["ESP32", "Water Sensors", "Cloud Storage", "Alerts"],
      likes: 201,
      views: 1350,
      forks: 41,
      thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
      difficulty: "Intermediate",
      lastUpdated: "2024-01-04",
      isNew: true
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? communityProjects 
    : communityProjects.filter(project => project.category === activeFilter);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success bg-success-50';
      case 'Intermediate': return 'text-warning bg-warning-50';
      case 'Advanced': return 'text-error bg-error-50';
      default: return 'text-text-secondary bg-surface';
    }
  };

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">Community Projects</h2>
            <p className="text-text-secondary mt-1">Discover amazing projects built by our community</p>
          </div>
          <Button
            variant="primary"
            size="md"
            iconName="Plus"
            iconPosition="left"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Share Your Project
          </Button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {projectCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-smooth ${
                activeFilter === category.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary'
              }`}
            >
              <span>{category.name}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                activeFilter === category.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-text-secondary/20 text-text-secondary'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-surface/50 border border-border rounded-xl overflow-hidden hover:shadow-brand transition-smooth group">
            {/* Project Thumbnail */}
            <div className="relative overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
              />
              {project.isNew && (
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full">
                    New
                  </span>
                </div>
              )}
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(project.difficulty)}`}>
                  {project.difficulty}
                </span>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
              {/* Author Info */}
              <div className="flex items-center space-x-3 mb-3">
                <Image
                  src={project.authorAvatar}
                  alt={project.author}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-text-primary">{project.author}</p>
                  <p className="text-xs text-text-secondary">Updated {project.lastUpdated}</p>
                </div>
              </div>

              {/* Project Title & Description */}
              <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-smooth">
                {project.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-primary/10 text-primary rounded border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-2 py-1 text-xs bg-surface text-text-secondary rounded">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Project Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={14} />
                    <span>{project.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={14} />
                    <span>{project.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="GitFork" size={14} />
                    <span>{project.forks}</span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  iconPosition="right"
                  className="text-primary hover:text-primary-700"
                >
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button
          variant="outline"
          size="lg"
          iconName="ChevronDown"
          iconPosition="right"
          className="border-primary text-primary hover:bg-primary hover:text-white"
        >
          Load More Projects
        </Button>
      </div>
    </div>
  );
};

export default CommunityShowcase;