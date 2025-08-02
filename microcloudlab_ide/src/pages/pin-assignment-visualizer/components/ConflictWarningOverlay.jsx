import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ConflictWarningOverlay = ({ 
  conflicts, 
  onResolveConflict, 
  onDismiss,
  isVisible,
  className = "" 
}) => {
  if (!isVisible || !conflicts || conflicts.length === 0) {
    return null;
  }

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-1030 ${className}`}>
      <div className="bg-card border border-border rounded-lg shadow-modal max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-error/10 rounded-lg">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <div>
                <h3 className="text-heading-sm font-heading">Pin Assignment Conflicts</h3>
                <p className="text-body-sm text-muted-foreground">
                  {conflicts.length} conflict{conflicts.length > 1 ? 's' : ''} detected
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onDismiss}
            />
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {conflicts.map((conflict, index) => (
            <div key={index} className="p-6 border-b border-border last:border-b-0">
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-8 h-8 bg-error/10 rounded-lg flex-shrink-0">
                  <Icon name="AlertCircle" size={16} className="text-error" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-body-sm font-medium">Pin {conflict.pinName}</h4>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-error/10 text-error">
                      Conflict
                    </span>
                  </div>
                  
                  <p className="text-body-sm text-muted-foreground mb-3">
                    {conflict.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="text-caption font-medium text-foreground">Conflicting Assignments:</div>
                    {conflict.assignments.map((assignment, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded-md">
                        <div className="flex items-center space-x-2">
                          <Icon name="Zap" size={14} className="text-warning" />
                          <span className="text-body-sm">{assignment.peripheral}</span>
                          <span className="text-caption text-muted-foreground">
                            ({assignment.function})
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="xs"
                          iconName="X"
                          onClick={() => onResolveConflict(conflict.pinId, assignment.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>

                  {conflict.suggestions && conflict.suggestions.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-caption font-medium text-foreground">Suggested Solutions:</div>
                      {conflict.suggestions.map((suggestion, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-success/5 border border-success/20 rounded-md">
                          <div className="flex items-center space-x-2">
                            <Icon name="Lightbulb" size={14} className="text-success" />
                            <span className="text-body-sm">{suggestion.description}</span>
                          </div>
                          <Button
                            variant="outline"
                            size="xs"
                            iconName="ArrowRight"
                            onClick={() => onResolveConflict(conflict.pinId, null, suggestion.action)}
                          >
                            Apply
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-caption text-muted-foreground">
              Resolve conflicts to ensure proper pin functionality
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onDismiss}
              >
                Dismiss
              </Button>
              <Button
                variant="default"
                size="sm"
                iconName="CheckCircle"
                onClick={() => {
                  // Auto-resolve conflicts with first suggestion
                  conflicts.forEach(conflict => {
                    if (conflict.suggestions && conflict.suggestions.length > 0) {
                      onResolveConflict(conflict.pinId, null, conflict.suggestions[0].action);
                    }
                  });
                }}
              >
                Auto-Resolve
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConflictWarningOverlay;