import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LearningPathCard = ({ 
  title, 
  description, 
  modules, 
  duration, 
  difficulty, 
  completedModules = 0, 
  totalModules,
  skills = [],
  onStart,
  onContinue,
  isStarted = false
}) => {
  const progressPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
  
  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-success bg-success-50 border-success/20';
      case 'Intermediate': return 'text-warning bg-warning-50 border-warning/20';
      case 'Advanced': return 'text-error bg-error-50 border-error/20';
      default: return 'text-text-secondary bg-surface border-border';
    }
  };

  return (
    <div className="bg-background border-2 border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-brand transition-smooth">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
            <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
          </div>
          <p className="text-text-secondary leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Progress Bar (if started) */}
      {isStarted && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">
              Progress: {completedModules}/{totalModules} modules
            </span>
            <span className="text-sm text-text-secondary">
              {Math.round(progressPercentage)}% complete
            </span>
          </div>
          <div className="w-full bg-surface rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Modules Preview */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">Learning Modules:</h4>
        <div className="space-y-2">
          {modules.slice(0, 4).map((module, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 bg-surface/50 rounded-lg">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                isStarted && index < completedModules 
                  ? 'bg-success text-white' 
                  : isStarted && index === completedModules
                  ? 'bg-primary text-white' :'bg-surface border border-border'
              }`}>
                {isStarted && index < completedModules ? (
                  <Icon name="Check" size={14} />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </div>
              <span className="text-sm text-text-secondary flex-1">{module}</span>
              <div className="flex items-center space-x-1 text-text-muted">
                <Icon name="Clock" size={12} />
                <span className="text-xs">15-30 min</span>
              </div>
            </div>
          ))}
          {modules.length > 4 && (
            <div className="text-center py-2">
              <span className="text-sm text-text-secondary">
                +{modules.length - 4} more modules
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Skills & Duration */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">Skills you'll learn:</span>
          </div>
          <div className="flex items-center space-x-1 text-text-secondary">
            <Icon name="Clock" size={14} />
            <span className="text-sm">{duration}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md border border-primary/20"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} />
            <span>2.4k+ learners</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-warning fill-current" />
            <span>4.8 rating</span>
          </div>
        </div>
        
        <Button
          variant={isStarted ? "outline" : "primary"}
          size="md"
          iconName={isStarted ? "Play" : "BookOpen"}
          iconPosition="left"
          onClick={isStarted ? onContinue : onStart}
          className={isStarted ? "border-primary text-primary hover:bg-primary hover:text-white" : ""}
        >
          {isStarted ? "Continue Learning" : "Start Learning Path"}
        </Button>
      </div>
    </div>
  );
};

export default LearningPathCard;