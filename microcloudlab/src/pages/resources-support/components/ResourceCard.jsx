import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ResourceCard = ({ 
  title, 
  description, 
  type, 
  difficulty, 
  duration, 
  author, 
  thumbnail, 
  tags = [], 
  isNew = false,
  onAccess 
}) => {
  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-success bg-success-50';
      case 'Intermediate': return 'text-warning bg-warning-50';
      case 'Advanced': return 'text-error bg-error-50';
      default: return 'text-text-secondary bg-surface';
    }
  };

  const getTypeIcon = (resourceType) => {
    switch (resourceType) {
      case 'Tutorial': return 'BookOpen';
      case 'Documentation': return 'FileText';
      case 'Video': return 'Play';
      case 'Code Sample': return 'Code';
      case 'Project': return 'Folder';
      case 'Guide': return 'Map';
      default: return 'File';
    }
  };

  return (
    <div className="bg-background border border-border rounded-xl p-6 hover:shadow-brand transition-smooth group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={getTypeIcon(type)} size={20} className="text-primary" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-text-secondary">{type}</span>
              {isNew && (
                <span className="px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full">
                  New
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(difficulty)}`}>
                {difficulty}
              </span>
              {duration && (
                <span className="text-xs text-text-secondary flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{duration}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail */}
      {thumbnail && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <Image
            src={thumbnail}
            alt={title}
            className="w-full h-32 object-cover group-hover:scale-105 transition-smooth"
          />
        </div>
      )}

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-smooth">
          {title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-surface text-text-secondary rounded-md"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 text-xs bg-surface text-text-secondary rounded-md">
              +{tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-white">
              {author?.charAt(0) || 'M'}
            </span>
          </div>
          <span className="text-sm text-text-secondary">{author || 'MicroCloudLab'}</span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => onAccess && onAccess()}
          className="text-primary hover:text-primary-700"
        >
          Access
        </Button>
      </div>
    </div>
  );
};

export default ResourceCard;