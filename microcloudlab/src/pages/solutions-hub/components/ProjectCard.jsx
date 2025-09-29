import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

/**
 * @module ProjectCard
 */

/**
 * A card component for displaying information about a single user project.
 * It shows the project's title, description, type, owner, and other metadata.
 *
 * @param {object} props - The properties for the component.
 * @param {object} props.project - The project object to display.
 * @returns {JSX.Element} The rendered project card component.
 */
const ProjectCard = ({ project }) => {
  const {
    title,
    description,
    project_type,
    owner,
    collaborators,
    microcontroller,
    code_content,
    is_public,
    is_active,
    created_at
  } = project || {};

  // Default image based on project type
  const getDefaultImage = (type) => {
    const typeImages = {
      'IOT': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop',
      'ROBOTICS': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
      'SENSOR': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
      'LED_CONTROL': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=400&fit=crop',
      'MOTOR_CONTROL': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
      'COMMUNICATION': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
      'EDUCATION': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=400&fit=crop',
      'RESEARCH': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
    };
    return typeImages[type] || 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop';
  };

  const displayImage = getDefaultImage(project_type);

  // Get project type icon
  const getProjectTypeIcon = (type) => {
    const typeIcons = {
      'IOT': 'Wifi',
      'ROBOTICS': 'Bot',
      'SENSOR': 'Activity',
      'LED_CONTROL': 'Zap',
      'MOTOR_CONTROL': 'Settings',
      'COMMUNICATION': 'MessageSquare',
      'EDUCATION': 'BookOpen',
      'RESEARCH': 'Search',
    };
    return typeIcons[type] || 'Folder';
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={displayImage} 
          alt={`${title} project`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            is_active 
              ? 'bg-success/20 text-success border border-success/30' 
              : 'bg-warning/20 text-warning border border-warning/30'
          }`}>
            {is_active ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Project Info */}
        <div className="absolute bottom-4 left-4">
          <div className="text-white">
            <div className="text-lg font-semibold">{title}</div>
            <div className="text-white/80 text-sm">{project_type.replace('_', ' ')}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-headline text-text-primary mb-4">{title}</h3>
        
        {/* Description */}
        <p className="text-sm text-text-secondary mb-6 line-clamp-3">
          {description || 'No description available'}
        </p>

        {/* Project Details */}
        <div className="space-y-4 mb-6">
          {/* Project Type */}
          <div className="flex items-center space-x-2">
            <Icon name={getProjectTypeIcon(project_type)} size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">
              {project_type.replace('_', ' ')}
            </span>
          </div>

          {/* Microcontroller */}
          {microcontroller && (
            <div className="flex items-center space-x-2">
              <Icon name="Cpu" size={16} className="text-accent" />
              <span className="text-sm text-text-secondary">
                {microcontroller.name} ({microcontroller.type})
              </span>
            </div>
          )}

          {/* Owner */}
          {owner && (
            <div className="flex items-center space-x-2">
              <Icon name="User" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">
                Created by {owner.username}
              </span>
            </div>
          )}

          {/* Collaborators */}
          {collaborators && collaborators.length > 0 && (
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">
                {collaborators.length} collaborator{collaborators.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}

          {/* Created Date */}
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              Created {formatDate(created_at)}
            </span>
          </div>
        </div>

        {/* Code Content Preview */}
        {code_content && (
          <div className="mb-6 p-4 bg-background rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Code" size={16} className="text-primary" />
              <span className="text-sm font-medium text-text-primary">Code Preview</span>
            </div>
            <pre className="text-xs text-text-secondary overflow-hidden line-clamp-2">
              {code_content.substring(0, 100)}...
            </pre>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-text-secondary">Project</span>
            {is_public && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                Public
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-colors">
              <span>View Project</span>
              <Icon name="ExternalLink" size={14} />
            </button>
            {is_active && (
              <button className="flex items-center space-x-1 text-sm text-success hover:text-success/80 transition-colors">
                <span>Run</span>
                <Icon name="Play" size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 