import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const IndustryCard = ({ industry, caseStudies, projects, microcontrollers }) => {
  const {
    name,
    icon,
    count
  } = industry || {};

  // Default image based on industry
  const getDefaultImage = (industryName) => {
    const industryImages = {
      'IoT & Smart Cities': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop',
      'Industrial Automation': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
      'Healthcare & Medical': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
      'Agriculture & Precision Farming': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=400&fit=crop',
      'Energy & Sustainability': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop',
      'Transportation & Logistics': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=400&fit=crop',
    };
    return industryImages[industryName] || 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop';
  };

  const displayImage = getDefaultImage(name);

  // Get industry icon
  const getIndustryIcon = (industryName) => {
    const industryIcons = {
      'IoT & Smart Cities': 'Wifi',
      'Industrial Automation': 'Factory',
      'Healthcare & Medical': 'Heart',
      'Agriculture & Precision Farming': 'Sprout',
      'Energy & Sustainability': 'Zap',
      'Transportation & Logistics': 'Truck',
    };
    return industryIcons[industryName] || 'Building';
  };

  // Filter data by industry
  const industryCaseStudies = caseStudies?.filter(study => study.industry === name) || [];
  const industryProjects = projects?.filter(project => {
    // You might need to add industry field to projects or use project type mapping
    const projectTypeToIndustry = {
      'IOT': 'IoT & Smart Cities',
      'ROBOTICS': 'Industrial Automation',
      'SENSOR': 'Healthcare & Medical',
      'LED_CONTROL': 'Energy & Sustainability',
      'MOTOR_CONTROL': 'Industrial Automation',
      'COMMUNICATION': 'Transportation & Logistics',
      'EDUCATION': 'Healthcare & Medical',
      'RESEARCH': 'IoT & Smart Cities',
    };
    return projectTypeToIndustry[project.project_type] === name;
  }) || [];

  // Calculate industry statistics
  const totalProjects = industryProjects.length;
  const activeProjects = industryProjects.filter(p => p.is_active).length;
  const publicProjects = industryProjects.filter(p => p.is_public).length;

  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={displayImage} 
          alt={`${name} industry`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Industry Info */}
        <div className="absolute bottom-4 left-4">
          <div className="text-white">
            <div className="text-lg font-semibold">{name}</div>
            <div className="text-white/80 text-sm">{count} case studies</div>
          </div>
        </div>

        {/* Industry Icon */}
        <div className="absolute top-4 left-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <Icon name={getIndustryIcon(name)} size={24} className="text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-headline text-text-primary mb-4">{name}</h3>
        
        {/* Industry Description */}
        <p className="text-sm text-text-secondary mb-6">
          {getIndustryDescription(name)}
        </p>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-background rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">{count}</div>
            <div className="text-xs text-text-secondary">Case Studies</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-accent">{totalProjects}</div>
            <div className="text-xs text-text-secondary">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-success">{activeProjects}</div>
            <div className="text-xs text-text-secondary">Active</div>
          </div>
        </div>

        {/* Key Technologies */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-text-primary mb-3">Key Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {getIndustryTechnologies(name).map((tech, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Recent Case Studies Preview */}
        {industryCaseStudies.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-text-primary mb-3">Recent Case Studies</h4>
            <div className="space-y-2">
              {industryCaseStudies.slice(0, 2).map((study) => (
                <div key={study.id} className="flex items-center space-x-3 p-2 bg-background rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="FileText" size={14} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-text-primary truncate">
                      {study.title}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {study.company_name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-xs text-text-secondary">Industry</span>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-colors">
              <span>View All</span>
              <Icon name="ExternalLink" size={14} />
            </button>
            <button className="flex items-center space-x-1 text-sm text-accent hover:text-accent/80 transition-colors">
              <span>Explore</span>
              <Icon name="ArrowRight" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get industry description
const getIndustryDescription = (industryName) => {
  const descriptions = {
    'IoT & Smart Cities': 'Connected devices and smart infrastructure solutions for modern urban environments.',
    'Industrial Automation': 'Automated manufacturing and industrial process control systems.',
    'Healthcare & Medical': 'Medical devices and healthcare technology solutions.',
    'Agriculture & Precision Farming': 'Smart farming and agricultural automation technologies.',
    'Energy & Sustainability': 'Renewable energy and sustainable technology solutions.',
    'Transportation & Logistics': 'Smart transportation and logistics management systems.',
  };
  return descriptions[industryName] || 'Innovative technology solutions for this industry sector.';
};

// Helper function to get industry technologies
const getIndustryTechnologies = (industryName) => {
  const technologies = {
    'IoT & Smart Cities': ['ESP32', 'MQTT', 'LoRaWAN', 'Cloud IoT'],
    'Industrial Automation': ['PLC', 'SCADA', 'Robotics', 'Sensors'],
    'Healthcare & Medical': ['Medical Sensors', 'IoT', 'Data Analytics', 'Security'],
    'Agriculture & Precision Farming': ['Soil Sensors', 'Drones', 'GPS', 'Automation'],
    'Energy & Sustainability': ['Solar Panels', 'Battery Management', 'Smart Grid', 'Monitoring'],
    'Transportation & Logistics': ['GPS Tracking', 'Fleet Management', 'IoT Sensors', 'Analytics'],
  };
  return technologies[industryName] || ['IoT', 'Sensors', 'Automation'];
};

export default IndustryCard; 